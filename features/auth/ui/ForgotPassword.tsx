import { Controller, Resolver, SubmitHandler, useForm } from "react-hook-form"
import { ForgotPasswordType } from "../auth.types"
import { useState } from "react"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useEmailSentMutation } from "../auth.api"
import { Modal } from "../../../common/components/modal/Modal"
import { useTranslation } from "react-i18next"
import { AuthLayout } from "../../../common/components/layouts/AuthLayout"
import { KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View } from "react-native"
import { styles } from './../Auth.styles'
import { Loader } from "../../../common/components/loaders/CircularLoader"
import { convertFirstLetterToLowerCase } from "../../../common/utils/convertFirstLetterToLowerCase"
import { DefaultButton } from "../../../common/components/buttons/DefaultButton"
import { PATHS } from "../../../common/constants/paths"

const formSchema = yup.object().shape({
  email: yup.string()
    .required("Email is required")
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Email must be an email"),
})

export const ForgotPassword = () => {
  const [success, setSuccess] = useState(false)
  const [email, setEmail] = useState('')
  const [emailSent, { isLoading }] = useEmailSentMutation()
  const [serverError, setServerError] = useState('')
  const [open, setOpen] = useState(true)
  
  const { t } = useTranslation()

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    trigger,
    clearErrors,
  } = useForm<ForgotPasswordType>({
    defaultValues: {
      email: '',
    },
    mode: 'onChange',
    resolver: yupResolver(formSchema) as Resolver<ForgotPasswordType>
  })

  const onSubmit: SubmitHandler<ForgotPasswordType> = (data: ForgotPasswordType) => {
    data = { ...data, email: convertFirstLetterToLowerCase(data.email) }
    emailSent(data)
      .unwrap()
      .then(res => {
        setSuccess(true)
        setEmail(data.email)
        reset()
      })
      .catch(error => {
        const serverE = t('errors.serverError')
        if (error.status === 'FETCH_ERROR') setServerError(serverE)
      })
  }

  return (
    <>
      {isLoading && <Loader />}
      <AuthLayout>
        <KeyboardAvoidingView behavior={"padding"} style={styles.container}>
          <Text style={styles.title}>{t('auth.links.forgotPassword')}</Text>
          {serverError && <Text style={styles.error}>{serverError}</Text>}
          <View style={styles.inputsWrapper}> 
            <View style={styles.inputContainer}>
            <Controller
                control={control}
                name="email"
                render={({ field: { ref, value, onChange } }) => (
                  <TextInput
                    placeholderTextColor={'grey'}
                    placeholder={t('auth.login.inputs.email.placeholder')}
                    style={styles.input}
                    onChangeText={onChange}
                    value={value}
                    ref={ref}
                    onFocus={() => {
                      clearErrors('email')
                      setServerError('')
                    }}
                    onBlur={() => {
                      trigger('email')
                    }}
                  />
                )}
              />
              {errors.email && 
                <Text style={styles.error}>{errors.email.message}</Text>
              }
            </View>
 
            <View style={styles.buttonsWrapper}>
              <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.button}>
                <Text style={styles.buttonText}>{t('buttons.submit')}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {success && 
            <Modal
              text={`Please, check ${email}`}
              open={open}
              setOpen={setOpen}
              outlinedButton={true}
              buttonBack={true}
            />
          }
        </KeyboardAvoidingView>
      </AuthLayout>
    </>
  )
}