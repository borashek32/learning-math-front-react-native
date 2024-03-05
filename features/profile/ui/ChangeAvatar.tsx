import React, { useState } from 'react'
import { ScrollView, Text } from 'react-native'
import { useTranslation } from 'react-i18next'
import { AppLayout } from '../../../common/components/layouts/AppLayout'
import { styles } from '../../home/Home.styles'
import { Loader } from '../../../common/components/loaders/CircularLoader'
import { CharacterType } from '../rickMorty/rickMorty.types'
import { useGetAvatarsQuery } from '../rickMorty/rickMorty.api'
import { Avatar } from '../../../common/components/avatar/Avatar'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import { selectUser } from '../../auth/auth.selectors'
import { AvatarType } from '../profile.api.types'
import { Modal } from '../../../common/components/modal/Modal'
import { Error } from '../../../common/components/error/Error'
import { useUpdateAvatarMutation } from '../profile.api'
import { DevideLine } from '../../../common/components/devideLine/DevideLine'
import { UserAvatar } from '../../../common/components/avatar/UserAvatar'
import { PATHS } from '../../../common/constants/paths'
import { useDispatch } from 'react-redux'
import { setUserInfo } from '../../auth/auth.slice'

export const ChangeAvatar = ({ navigation }) => {
  const [open, setOpen] = useState(false)
  const [serverError, setServerError] = useState('')
  const { t } = useTranslation()
  const { data, isLoading } = useGetAvatarsQuery()
  const dispatch = useDispatch()
  const [updateAvatar, { isLoading: isLoadingUpdateAvatar, isError }] = useUpdateAvatarMutation()

  const user = useAppSelector(selectUser)
  const {
    reset,
  } = useForm<AvatarType>({
    mode: "onChange",
    defaultValues: {
      avatarPath: '',
      avatarName: '',
      userId: '',
    }
  })

  const getAvatarData = (avatarPath: string, avatarName: string) => {
    onSubmit({ userId: user._id, avatarPath, avatarName })
  }

  const onSubmit: SubmitHandler<AvatarType> = (data: AvatarType) => { 
    if (!data) {
      setServerError('Some error occured')
    } else {
      setServerError('')
      updateAvatar(data)
        .unwrap()
        .then(response => {
          setOpen(true)
          dispatch(setUserInfo(response))
          reset()
        })
        .catch(e => {
          if (e.status === 'FETCH_ERROR') setServerError(t('errors.serverError'))
        })
    }
  }

  const modalCallback = () => {
    navigation.navigate(PATHS.CHANGE_AVATAR)
    setOpen(false)
  }
  
  return (
    <>
      {(isLoading || isLoadingUpdateAvatar) && <Loader />}
      {open && 
        <Modal
          text={t('modal.changeAvatarSuccess')}
          open={open}
          setOpen={setOpen}
          outlinedButton={true}
          buttonBack={false}
          buttonName={t('links.back')}
          buttonCallback={modalCallback}
        />
      }
      <AppLayout title={t('profile.changeAvatar.title')}>
        {user?.avatarPath
          ? <UserAvatar 
              source={user.avatarPath} 
              name={user.avatarName}
            />
          : <Text>{t('profile.change')}</Text>
        }
        <DevideLine />
        <ScrollView contentContainerStyle={styles.menuContainer}>
          {(serverError || isError) && <Error error={serverError} />}
          {data && data.results.map((item: CharacterType) => (
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
  )
}
