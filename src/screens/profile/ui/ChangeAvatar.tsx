import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { AppLayout } from '@components/layouts/AppLayout';
import { Loader } from '@components/loaders/CircularLoader';
import { CharacterType } from '@api/profile/rickMorty/rickMorty.types';
import { useGetAvatarsQuery } from '@api/profile/rickMorty/rickMorty.api';
import { Avatar } from '@components/avatar/Avatar';
import { useAppSelector } from '@hooks/useAppSelector';
import { selectUser } from '@redux/selectors/auth.selectors';
import { AvatarType } from '@api/profile/profile.api.types';
import { Modal } from '@components/modal/Modal';
import { Error } from '@components/error/Error';
import { useUpdateAvatarMutation } from '@api/profile/profile.api';
import { DevideLine } from '@components/devideLine/DevideLine';
import { UserAvatar } from '@components/avatar/UserAvatar';
import { PATHS } from '@constants/paths';
import { setUserInfo } from '@redux/slices/auth.slice';
import { AppText } from '@components/text/AppText';
import { NavigationProps } from 'types/commonTypes.types';

import { styles } from '../../home/Home.styles';

export const ChangeAvatar = ({ navigation }: NavigationProps) => {
  const [open, setOpen] = useState(false);
  const [serverError, setServerError] = useState('');
  const { t } = useTranslation();
  const { data, isLoading } = useGetAvatarsQuery();
  const dispatch = useDispatch();
  const [updateAvatar, { isLoading: isLoadingUpdateAvatar, isError }] =
    useUpdateAvatarMutation();

  const user = useAppSelector(selectUser);
  const { reset } = useForm<AvatarType>({
    mode: 'onChange',
    defaultValues: {
      avatarPath: '',
      avatarName: '',
      userId: '',
    },
  });

  const getAvatarData = (avatarPath: string, avatarName: string) => {
    if (user) {
      onSubmit({ userId: user._id, avatarPath, avatarName });
    }
  };

  const onSubmit: SubmitHandler<AvatarType> = (data: AvatarType) => {
    if (!data) {
      setServerError('Some error occured');
    } else {
      setServerError('');
      updateAvatar(data)
        .unwrap()
        .then(response => {
          setOpen(true);
          dispatch(setUserInfo(response));
          reset();
        })
        .catch(e => {
          if (e.status === 'FETCH_ERROR')
            setServerError(t('errors.serverError'));
        });
    }
  };

  const modalCallback = () => {
    navigation.navigate(PATHS.CHANGE_AVATAR);
    setOpen(false);
  };

  return (
    <>
      {(isLoading || isLoadingUpdateAvatar) && <Loader />}
      {open && (
        <Modal
          text={t('modal.changeAvatarSuccess')}
          open={open}
          setOpen={setOpen}
          outlinedButton
          buttonBack={false}
          buttonName={t('links.back')}
          buttonCallback={modalCallback}
        />
      )}
      <AppLayout title={t('profile.changeAvatar.title')}>
        {user?.avatarPath ? (
          <UserAvatar source={user.avatarPath} name={user.avatarName} />
        ) : (
          <AppText desc={t('profile.changeAvatar')} link={false} />
        )}
        <DevideLine />
        <ScrollView contentContainerStyle={styles.menuContainer}>
          {(serverError || isError) && <Error error={serverError} />}
          {data?.results.map((item: CharacterType) => (
            <Avatar
              key={item.id}
              source={item.image}
              name={item.name}
              status={item.status}
              species={item.species}
              onPress={getAvatarData}
            />
          ))}
        </ScrollView>
      </AppLayout>
    </>
  );
};
