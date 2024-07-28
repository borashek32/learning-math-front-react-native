import { Modal } from "../../../components/modal/Modal"
import { useLogoutMutation } from "../../../api/auth/auth.api"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { removeUserInfo } from "../../../redux/slices/auth.slice"
import { Loader } from "../../../components/loaders/CircularLoader"
import { useTranslation } from "react-i18next"
import { PATHS } from "../../../constants/paths"
import { AppLayout } from "../../../components/layouts/AppLayout"
import { View } from "react-native"
import { styles } from '../Auth.styles'
import AsyncStorage from "@react-native-async-storage/async-storage"

export const Logout = ({ navigation }) => {
  const [open, setOpen] = useState(true)
  const [modalWithErrorOpen, setModalWithErrorOpen] = useState(false)
  const [logout, { isLoading }] = useLogoutMutation()
  const [serverError, setServerError] = useState('')
  const dispatch = useDispatch()

  const { t } = useTranslation()

  const handleOpenModal = () => setOpen(false)
  const handleOpenModalWithError = () => setModalWithErrorOpen(false)

  const logoutHandler = async () => {
    const refreshToken = await AsyncStorage.getItem('refreshToken')
    const accessToken = await AsyncStorage.getItem('accessToken')

    logout({ refreshToken, accessToken })
      .unwrap()
      .then(response => {
        dispatch(removeUserInfo())
        navigation.navigate(PATHS.MAIN)
        setOpen(false)
      })
      .catch(e => {
        if (e) {
          setOpen(false)
          setModalWithErrorOpen(true)
          if (e.status === 401 || e.name === 'Error') {
            setServerError(t('errors.logout'))
          }
        }
      })
  }

  return (
    <>
      {isLoading && <Loader />}
      <AppLayout>
        <View style={styles.logoutWrapper}>
          {serverError && 
            <Modal
              text={t('errors.serverError')}
              open={modalWithErrorOpen}
              setOpen={handleOpenModalWithError}
              outlinedButton={true}
              buttonName={t('auth.links.login')}
              buttonCallback={() => navigation.navigate(PATHS.LOGIN)}
              error={true}
            />
          }
          {open &&
            <Modal
              open={open}
              setOpen={handleOpenModal}
              text={t('auth.logout.sure')}
              buttonName='Ok'
              buttonCallback={logoutHandler}
              outlinedButton={true}
              buttonBack={true}
            />
          }
        </View>
      </AppLayout>
    </>
  )
}