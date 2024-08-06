import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Modal } from '../../../components/modal/Modal';
import { useLogoutMutation } from '../../../api/auth/auth.api';
import { removeUserInfo } from '../../../redux/slices/auth.slice';
import { Loader } from '../../../components/loaders/CircularLoader';
import { PATHS } from '../../../constants/paths';
import { AppLayout } from '../../../components/layouts/AppLayout';
import { NavigationProps } from '../../../types/commonTypes.types';

export const Logout = ({ navigation }: NavigationProps) => {
  const [open, setOpen] = useState(true);
  const [modalWithErrorOpen, setModalWithErrorOpen] = useState(false);
  const [logout, { isLoading }] = useLogoutMutation();
  const [serverError, setServerError] = useState('');
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const handleOpenModal = () => setOpen(false);
  const handleOpenModalWithError = () => setModalWithErrorOpen(false);

  const logoutHandler = async () => {
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    const accessToken = await AsyncStorage.getItem('accessToken');

    if (refreshToken && accessToken) {
      logout({ refreshToken, accessToken })
        .unwrap()
        .then(() => {
          dispatch(removeUserInfo());
          navigation.navigate(PATHS.MAIN);
          setOpen(false);
        })
        .catch(e => {
          if (e) {
            setOpen(false);
            setModalWithErrorOpen(true);
            if (e.status === 401 || e.name === 'Error') {
              setServerError(t('errors.logout'));
            }
          }
        });
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      {serverError && (
        <Modal
          color="red"
          text={t('errors.serverError')}
          open={modalWithErrorOpen}
          setOpen={handleOpenModalWithError}
          buttonName={t('screens.login')}
          buttonCallback={() => navigation.navigate(PATHS.LOGIN)}
          error
        />
      )}
      {open && (
        <Modal
          color="blue"
          open={open}
          setOpen={handleOpenModal}
          text={t('auth.logout.sure')}
          buttonName="Ok"
          buttonCallback={logoutHandler}
          buttonBack
        />
      )}
      <AppLayout>
        <></>
      </AppLayout>
    </>
  );
};
