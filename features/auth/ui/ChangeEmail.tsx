import { Controller, Resolver, SubmitHandler, useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useEffect, useState } from "react"
import { useChangeEmailMutation, useChangePasswordMutation } from "../auth.api"
import { Loader } from "../../../common/components/loaders/CircularLoader"
import { Modal } from "../../../common/components/modal/Modal"
import { useTranslation } from "react-i18next"
import { useNavigation } from "@react-navigation/native"
import { PATHS } from "../../../common/constants/paths"
import { KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View } from "react-native"
import { styles } from '../Auth.styles'
import { AppLayout } from "../../../common/components/layouts/AppLayout"
import { useAppSelector } from "../../../common/hooks/useAppSelector"
import { selectUserId } from "../auth.selectors"
import { NewEmailType, NewPasswordType } from "../auth.api.types"
import { Error } from "../../../common/components/error/Error"

interface IFormProps {
  newEmail: string
}

export const ChangeEmail = () => {
  const [success, setSuccess] = useState(false)
  const [open, setOpen] = useState(true)
  const [serverError, setServerError] = useState('')
  const navigation = useNavigation()
  const [changeEmail, { isLoading } ] = useChangeEmailMutation()
  const userId = useAppSelector(selectUserId)

  const { t, i18n } = useTranslation('translation')

  const formSchema = yup.object().shape({
    newEmail: yup.string()
      .required(i18n.t('errors.required'))
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, i18n.t('errors.mustBeEmail')),
  })

  const {
    handleSubmit, 
    formState: { errors },
    clearErrors,
    reset,
    trigger,
    control,
  } = useForm<IFormProps>({
    mode: "onChange",
    defaultValues: {
      newEmail: '',
    },
    resolver: yupResolver(formSchema) as Resolver<IFormProps>,
  })

  const onSubmit: SubmitHandler<any> = (data: NewEmailType) => { 
    data = { ...data, userId }
    if (!data) {
      setServerError('Some error occured123')
    } else {
      setServerError('')
      changeEmail(data)
        .unwrap()
        .then(() => {
          setSuccess(true)
          reset()
        })
        .catch(e => {
          const serverE = t('errors.serverError')
          if (e.status === 'FETCH_ERROR') setServerError(serverE)
          const error400 = t('errors.error400')
          if (e.status === 400) setServerError(error400)
          if (e.status === 401) setServerError(error400)
        })
    }
  }
  
  return (
    <>
      {isLoading && <Loader />}
      {success && 
        <Modal
          text={t('modal.changePasswordSuccess')}
          open={open}
          setOpen={setOpen}
          outlinedButton={true}
          buttonName={t('auth.links.login')}
          buttonCallback={() => navigation.navigate(PATHS.LOGIN)}
          buttonBack={false}
        />
      }
      <AppLayout title={t('screens.changeEmail')}>
        <KeyboardAvoidingView behavior={"padding"} style={styles.container}>
          {serverError && <Error error={serverError} />}
          <View style={styles.inputsWrapper}> 
            <View style={styles.inputContainer}>
              <Controller
                control={control}
                name="newEmail"
                render={({ field: { ref, onChange, value } }) => (
                  <TextInput
                    placeholderTextColor={'grey'}
                    placeholder={t('profile.changeEmail.inputs.oldPassword.placeholder')}
                    style={styles.input}
                    onChangeText={onChange}
                    ref={ref}
                    value={value}
                    onFocus={() => {
                      clearErrors('newEmail')
                      setServerError('')
                    }}
                    onBlur={() => {
                      trigger('newEmail')
                    }}
                  />
                )}
              />
              {errors.newEmail && <Error error={errors.newEmail.message} />}
            </View>
          </View>

          <View style={styles.buttonsWrapper}>
            <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.button}>
              <Text style={styles.buttonText}>{t('buttons.submit')}</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </AppLayout>
    </>
  )
}