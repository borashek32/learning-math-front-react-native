import { Controller, Resolver, SubmitHandler, useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useEffect, useState } from "react"
import { useChangePasswordMutation } from "../auth.api"
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
import { NewPasswordType } from "../auth.api.types"
import { Error } from "../../../common/components/error/Error"

interface IFormProps {
  password: string
  newPassword: string
  newPasswordConfirmation: string
}

export const ChangePassword = () => {
  const [success, setSuccess] = useState(false)
  const [open, setOpen] = useState(true)
  const [serverError, setServerError] = useState('')
  const navigation = useNavigation()
  const [changePassword, { isLoading } ] = useChangePasswordMutation()
  const userId = useAppSelector(selectUserId)

  const { t } = useTranslation()

  const formSchema = yup.object().shape({
    password: yup.string()
      .required(t('errors.required'))
      .matches(/^[A-Za-z]+$/i, t('errors.latinLetters'))
      .min(4, t('errors.min'))
      .max(64, t('errors.max')),
    newPassword: yup.string()
      .required(t('errors.required'))
      .matches(/^[A-Za-z]+$/i, t('errors.latinLetters'))
      .min(4, t('errors.min'))
      .max(64, t('errors.max')),
    newPasswordConfirmation: yup.string()
      .required(t('errors.required'))
      .min(4, t('errors.min'))
      .max(64, t('errors.max'))
      .oneOf([yup.ref("newPasswordConfirmation")], t('errors.notMatch')),
  })

  const {
    handleSubmit, 
    formState: { errors },
    clearErrors,
    getValues, 
    reset,
    trigger,
    setValue,
    control,
  } = useForm<IFormProps>({
    mode: "onChange",
    defaultValues: {
      password: '',
      newPassword: '',
      newPasswordConfirmation: '',
    },
    resolver: yupResolver(formSchema) as Resolver<IFormProps>,
  })
  
  useEffect(() => {
    if (getValues("newPassword") && getValues("newPasswordConfirmation")) {
      setValue("newPassword", "")
      setValue("newPasswordConfirmation", "")
    }
  }, [])

  const onSubmit: SubmitHandler<any> = (data: NewPasswordType) => { 
    data = { ...data, userId }
    if (!data) {
      setServerError('Some error occured123')
    } else {
      setServerError('')
      changePassword(data)
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
          buttonBack={true}
        />
      }
      <AppLayout title={t('screens.changePassword')}>
        <KeyboardAvoidingView behavior={"padding"} style={styles.container}>
          {serverError && <Error error={serverError} />}
          <View style={styles.inputsWrapper}> 
            <View style={styles.inputContainer}>
              <Controller
                control={control}
                name="password"
                render={({ field: { ref, onChange, value } }) => (
                  <TextInput
                    placeholderTextColor={'grey'}
                    placeholder={t('profile.changePassword.inputs.oldPassword.placeholder')}
                    style={styles.input}
                    secureTextEntry
                    onChangeText={onChange}
                    ref={ref}
                    value={value}
                    onFocus={() => {
                      clearErrors('password')
                      setServerError('')
                    }}
                    onBlur={() => {
                      trigger('password')
                    }}
                  />
                )}
              />
              {errors.password && <Error error={errors.password.message} />}
            </View>

            <View style={styles.inputContainer}>
              <Controller
                control={control}
                name="newPassword"
                render={({ field: { ref, onChange, value } }) => (
                  <TextInput
                    placeholderTextColor={'grey'}
                    placeholder={t('auth.register.inputs.password.placeholder')}
                    style={styles.input}
                    secureTextEntry
                    onChangeText={onChange}
                    ref={ref}
                    value={value}
                    onFocus={() => {
                      clearErrors('newPassword')
                      setServerError('')
                    }}
                    onBlur={() => {
                      trigger('newPassword')
                    }}
                  />
                )}
              />
              {errors.newPassword && <Error error={errors.newPassword.message} />}
            </View>
            
            <View style={styles.inputContainer}>
              <Controller
                control={control}
                name="newPasswordConfirmation"
                render={({ field: { value, ref, onChange } }) => (
                  <TextInput
                    placeholderTextColor={'grey'}
                    placeholder={t('auth.register.inputs.passwordConfirmation.placeholder')}
                    ref={ref}
                    style={styles.input}
                    secureTextEntry
                    onChangeText={onChange}
                    value={value}
                    onFocus={() => {
                      clearErrors('newPasswordConfirmation')
                      setServerError('')
                    }}
                    onBlur={() => {
                      trigger('newPasswordConfirmation')
                    }}
                  />
                )}
              />
              {errors.newPasswordConfirmation && <Error error={errors.newPasswordConfirmation.message} />}
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