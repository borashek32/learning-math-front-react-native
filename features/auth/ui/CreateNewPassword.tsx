import { Controller, Resolver, SubmitHandler, useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useEffect, useState } from "react"
import { useSaveNewPasswordMutation } from "../auth.api"
import { PasswordRecoveryType, RegisterType } from "../auth.types"
import { Loader } from "../../../common/components/loaders/CircularLoader"
import { Modal } from "../../../common/components/modal/Modal"
import { useTranslation } from "react-i18next"
import { useNavigation, useRoute } from "@react-navigation/native"
import { PATHS } from "../../../common/constants/paths"
import { AuthLayout } from "../../../common/components/layouts/AuthLayout"
import { KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View } from "react-native"
import { styles } from './../Auth.styles'
import { DefaultButton } from "../../../common/components/buttons/DefaultButton"

interface IFormProps {
  password: string
  passwordConfirmation: string
}

type Props = {
  createNewPasswordLink: string
  email: string
}

export const CreateNewPassword = () => {
  const route = useRoute()
  const { createNewPasswordLink, email } = route.params as Props
  const [success, setSuccess] = useState(false)
  const [open, setOpen] = useState(true)
  // const [recoveryCode, setRecoveryCode] = useState('')
  const [serverError, setServerError] = useState('')
  const [saveNewPassword, { isLoading }] = useSaveNewPasswordMutation()
  const navigation = useNavigation()

  const { t } = useTranslation()

  const formSchema = yup.object().shape({
    password: yup.string()
      .required(t('errors.required'))
      .matches(/^[A-Za-z]+$/i, t('errors.latinLetters'))
      .min(4, t('errors.min'))
      .max(64, t('errors.max')),
    passwordConfirmation: yup.string()
      .required(t('errors.required'))
      .min(4, t('errors.min'))
      .max(64, t('errors.max'))
      .oneOf([yup.ref("passwordConfirmation")], t('errors.notMatch')),
  })

  // useEffect(() => {
  //   if (passwordRecoveryCode) setRecoveryCode(recoveryCode as string)
  // }, [passwordRecoveryCode])

  const {
    handleSubmit, 
    formState: { errors },
    clearErrors,
    watch, 
    reset,
    trigger,
    control,
  } = useForm<IFormProps>({
    mode: "onChange",
    defaultValues: {
      password: '',
      passwordConfirmation: '',
    },
    resolver: yupResolver<any>(formSchema),
  })
  watch('password', '')

  const onSubmit: SubmitHandler<any> = (data: PasswordRecoveryType) => { 
    if (!data) {
      setServerError('Some error occured123')
    } else {
      data = { ...data, email }
      setServerError('')
      saveNewPassword(data)
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
      <AuthLayout>
        <KeyboardAvoidingView behavior={"padding"} style={styles.container}>
          <Text style={styles.title}>{t('screens.createNewPassword')}</Text>
          {serverError && <Text style={styles.error}>{serverError}</Text>}
          <View style={styles.inputsWrapper}> 
            <View style={styles.inputContainer}>
              <Controller
                control={control}
                name="password"
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
                      clearErrors('password')
                      setServerError('')
                    }}
                    onBlur={() => {
                      trigger('password')
                    }}
                  />
                )}
              />
              {errors.password && 
                <Text style={styles.error}>{errors.password.message}</Text>
              }
            </View>
            
            <View style={styles.inputContainer}>
              <Controller
                control={control}
                name="passwordConfirmation"
                render={({ field: { value, ref, onBlur, onChange } }) => (
                  <TextInput
                    placeholderTextColor={'grey'}
                    placeholder={t('auth.register.inputs.passwordConfirmation.placeholder')}
                    ref={ref}
                    style={styles.input}
                    secureTextEntry
                    onChangeText={onChange}
                    value={value}
                    onFocus={() => {
                      clearErrors('passwordConfirmation')
                      setServerError('')
                    }}
                    onBlur={() => {
                      trigger('passwordConfirmation')
                    }}
                  />
                )}
              />
              {errors.passwordConfirmation && 
                <Text style={styles.error}>{errors.passwordConfirmation.message}</Text>
              }
            </View>
          </View>

          <View style={styles.buttonsWrapper}>
            <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.button}>
              <Text style={styles.buttonText}>{t('buttons.submit')}</Text>
            </TouchableOpacity>
          </View>

          <DefaultButton
            title={t('auth.links.register')} 
            text={t('auth.login.note')}
            path={PATHS.REGISTER}
          />
          <DefaultButton
            title={t('auth.links.login')} 
            text={t('auth.register.note')}
            path={PATHS.LOGIN}
          />

          {success && 
            <Modal
              text={t('modal.success')}
              open={open}
              setOpen={setOpen}
              outlinedButton={true}
              buttonName={t('auth.links.login')}
              buttonCallback={() => navigation.navigate(PATHS.LOGIN)}
              buttonBack={true}
            />
          }
        </KeyboardAvoidingView>
      </AuthLayout>
    </>
  )
}