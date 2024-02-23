import React, { useState } from "react"
import { styles } from './../Auth.styles'
import { Controller, Resolver, SubmitHandler, useForm } from "react-hook-form"
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import { RegisterType } from "../auth.api.types"
import { useLoginMutation } from "../auth.api"
import { AuthLayout } from "../../../common/components/layouts/AuthLayout"
import { useTranslation } from 'react-i18next'
import { useDispatch } from "react-redux"
import { setUserInfo } from "../auth.slice"
import { Loader } from "../../../common/components/loaders/CircularLoader"
import { convertFirstLetterToLowerCase } from "../../../common/utils/convertFirstLetterToLowerCase"
import { PATHS } from "../../../common/constants/paths"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { DefaultButton } from "../../../common/components/buttons/DefaultButton"
import { AlertResult } from "../../../common/components/alerts/AlertResult"

type RouteParams = {
  isVerified: boolean
}

export const Login = ({ navigation, route }) => {
  const [login, { isLoading }] = useLoginMutation()
  const [serverError, setServerError] = useState('')
  const dispatch = useDispatch()

  const { t, i18n } = useTranslation('translation')
  
  const formSchema = yup.object().shape({
    email: yup.string()
      .required(i18n.t('errors.required'))
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, i18n.t('errors.mustBeEmail')),
    password: yup.string()
      .required(i18n.t('errors.required'))
      // .matches(/^[A-Za-z]+$/i, i18n.t('errors.latinLetters'))
      .min(4, i18n.t('errors.min'))
      .max(164, i18n.t('errors.max')),
  })

  const {
    handleSubmit,
    control,
    formState: { errors },
    clearErrors,
    trigger,
  } = useForm<RegisterType>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
    resolver: yupResolver(formSchema) as Resolver<RegisterType>,
  })

  const onSubmit: SubmitHandler<RegisterType> = (data: RegisterType) => {
    data = { ...data, email: convertFirstLetterToLowerCase(data.email) }
    setServerError('')
    login(data)
      .unwrap()
      .then(response => {
        if (response.user) {
          dispatch(setUserInfo(response.user))
          navigation.navigate(PATHS.HOME)
        }
      })
      .catch((e: any) => {
        console.log(e)
        setServerError('Ошибку смотри в консоли')
        // const serverE = t('errors.serverError')
        // const error400 = t('errors.error400')
        // const error401 = t('errors.error401')

        // if (e.status === 'FETCH_ERROR') setServerError(serverE)
        // if (e.status === 400) setServerError(error400)
        // if (e.status === 401) setServerError(error401)
      })
  }

  return (
    <>
      {isLoading && <Loader />}
      <AuthLayout>
        <KeyboardAvoidingView behavior={"padding"} style={styles.container}>
          <Text style={styles.title}>{t('auth.links.login')}</Text>
          {serverError && <Text style={styles.error}>{serverError}</Text>}
          <View style={styles.inputsWrapper}>
            <View style={styles.inputContainer}>
              <Controller
                control={control}
                name="email"
                render={({ field: { ref, value, onChange } }) => (
                  <TextInput
                    placeholderTextColor={'grey'}
                    placeholder={i18n.t('auth.login.inputs.email.placeholder')}
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

            <View style={styles.inputContainer}>
              <Controller
                control={control}
                name="password"
                render={({ field: { ref, onChange, value } }) => (
                  <>
                    <TextInput
                      placeholderTextColor={'grey'}
                      placeholder={i18n.t('auth.login.inputs.password.placeholder')}
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
                  </>
                )}
              />
              {errors.password && 
                <Text style={styles.error}>{errors.password.message}</Text>
              }
            </View>
          </View>

          <View style={styles.buttonsWrapper}>
            <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.button}>
              <Text style={styles.buttonText}>{i18n.t('buttons.login')}</Text>
            </TouchableOpacity>
          </View>

          <DefaultButton 
            title={t('auth.links.register')} 
            text={t('auth.login.note')}
            path={PATHS.REGISTER}
          />

          <DefaultButton 
            title={t('auth.links.forgotPassword')} 
            text={t('auth.forgotPassword.note')}
            path={PATHS.FORGOT_PASSWORD}
          />          
          

          {/* {isVerified &&
            <AlertResult 
            title={'Play more)'} 
            right={isVerified}
            onPress={() => {}} 
          />
          } */}
          </KeyboardAvoidingView>
        </AuthLayout>
      </>
  )
}

