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
import { Error } from "../../../common/components/error/Error"

export const ForgotPassword = () => {
  const [success, setSuccess] = useState(false)
  const [email, setEmail] = useState('')
  const [emailSent, { isLoading }] = useEmailSentMutation()
  const [serverError, setServerError] = useState('')
  const [open, setOpen] = useState(true)
  
  const { t } = useTranslation()

  const formSchema = yup.object().shape({
    email: yup.string()
      .required(t('errors.required'))
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, t('errors.mustBeEmail')),
  })

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
        if (error.status === 'FETCH_ERROR') setServerError(t('errors.serverError'))
      })
  }

  return (
    <>
      {isLoading && <Loader />}
      {success && 
        <Modal
          text={`Please, check ${email}`}
          open={open}
          setOpen={setOpen}
          outlinedButton={true}
          buttonBack={false}
        />
      }
      <AuthLayout title={t('auth.links.forgotPassword')}>
        <KeyboardAvoidingView behavior={"padding"} style={styles.container}>
          {serverError && <Error error={serverError} />}
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
          </View>

          <View style={styles.buttonsWrapper}>
            <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.button}>
              <Text style={styles.buttonText}>{t('buttons.submit')}</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </AuthLayout>
    </>
  )
}