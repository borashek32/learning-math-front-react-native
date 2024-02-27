import { Modal } from "../../../common/components/modal/Modal"
import { useLogoutMutation } from "../auth.api"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { removeUserInfo } from "../auth.slice"
import { Loader } from "../../../common/components/loaders/CircularLoader"
import { useTranslation } from "react-i18next"
import { PATHS } from "../../../common/constants/paths"
import { AppLayout } from "../../../common/components/layouts/AppLayout"
import { View } from "react-native"
import { styles } from './../Auth.styles'
import AsyncStorage from "@react-native-async-storage/async-storage"

export const Logout = ({ navigation }) => {
  const [open, setOpen] = useState(true)
  const [modalWithErrorOpen, setModalWithErrorOpen] = useState(false)
  const [logout, { isLoading }] = useLogoutMutation()
  const [serverError, setServerError] = useState('')
  const dispatch = useDispatch()
  
  let refresh: string
  AsyncStorage.getItem('refreshToken').then((refreshToken) => {
    console.log('refreshToken', refreshToken)
    refresh = refreshToken
  })
  

  const { t } = useTranslation()

  const handleOpenModal = () => setOpen(false)
  const handleOpenModalWithError = () => setModalWithErrorOpen(false)

  const logoutHandler = () => {
    logout(refresh)
      .unwrap()
      .then(() => {
        navigation.navigate(PATHS.MAIN)
        setOpen(false)
        dispatch(removeUserInfo())
        console.log('logout')
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
              open={modalWithErrorOpen}
              setOpen={handleOpenModalWithError}
              text={serverError}
              error={true}
              buttonBack={true}
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