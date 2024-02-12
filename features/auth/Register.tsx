import React, { useState } from "react"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import { useSignUpMutation } from "../../common/services/auth/auth.api"
import { Controller, Resolver, SubmitHandler, useForm } from "react-hook-form"
import { RegisterType } from "../../common/services/auth/auth.api.types"
import { AlertResult } from "../../common/components/alerts/AlertResult"
import { useTranslation } from "react-i18next"
import { BaseLayout } from "../../common/components/layouts/BaseLayout"
import { Loader } from "../../common/components/loaders/CircularLoader"

interface IFormProps {
  email: string
  password: string
  passwordConfirmation: string
}

export const Register = ({ navigation }) => {
  const [signUp, { error, isLoading }] = useSignUpMutation()
  const [serverError, setServerError] = useState('')
  const [open, setOpen] = useState(false)
  const [success, setSuccess] = useState(false)
  const [fail, setFail] = useState(false)

  const { t } = useTranslation()

  const formSchema = yup.object().shape({
    email: yup.string()
      .required(t('errors.required'))
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, t('errors.mustBeEmail')),
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

  const {
    handleSubmit, 
    formState: { errors },
    clearErrors,
    watch, 
    reset,
    control,
  } = useForm<IFormProps>({
    mode: "onTouched",
    defaultValues: {
      email: '',
      password: '',
      passwordConfirmation: '',
    },
    resolver: yupResolver(formSchema) as Resolver<IFormProps>,
  })
  watch('password', '')

  const onSubmit: SubmitHandler<RegisterType> = (data: RegisterType) => { 
    setOpen(true)
    setServerError('')
    signUp(data)
      .unwrap()
      .then(() => {
        setOpen(true)
        reset()
      })
      .catch(e => {
        const serverE = t('errors.serverError')
        if (e.status === 'FETCH_ERROR') setServerError(e.error)
        const error400 = t('errors.error400')
        if (e.status === 400) setServerError(error400)
        if (e.status === 401) setServerError(error400)
      })
  }

  return (
    <BaseLayout title="Register">
      <KeyboardAvoidingView behavior={"padding"} style={styles.container}>
        {isLoading && <Loader />}
        {open && <AlertResult onPress={() => console.log(123)} title={serverError} />}
        <View style={styles.inputWrapper}>
          <Controller
            control={control}
            name="email"
            rules={{
              required: {
                value: true,
                message: "Email field is required",
              },
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Email must be an email"
              }
            }}
            render={({ field: { ref, value, onChange }, fieldState: { error } }) => (
              <>
                <TextInput
                  placeholderTextColor={'grey'}
                  placeholder={"Email"}
                  style={styles.input}
                  onChangeText={onChange}
                  value={value}
                  ref={ref}
                />
              </>
            )}
          />
          {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

          <Controller
            control={control}
            name="password"
            render={({ field: { ref, onBlur, onChange, value }, fieldState: { error } }) => (
              <>
                <TextInput
                  placeholderTextColor={'grey'}
                  placeholder={"Password"}
                  style={styles.input}
                  secureTextEntry
                  onChangeText={onChange}
                  ref={ref}
                  value={value}
                  onBlur={() => {
                    clearErrors('passwordConfirmation')
                    setServerError('')
                  }}
                />
                {error && <Text style={styles.error}>{error.message}</Text>}
              </>
            )}
          />
          
          <Controller
            control={control}
            name="passwordConfirmation"
            render={({ field: { value, ref, onBlur, onChange }, fieldState: { error } }) => (
              <>
                <TextInput
                  placeholderTextColor={'grey'}
                  placeholder={"Password confirmation"}
                  ref={ref}
                  style={styles.input}
                  secureTextEntry
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
                {error && <Text style={styles.error}>{error.message}</Text>}
              </>
            )}
          />
        </View>

        <View style={styles.buttonsWrapper}>
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
        
        <AlertResult 
          title={'Registration was successfull. Please, go to your mail to verify your new account'} 
          right={success}
        />
        <AlertResult 
          title={''}
          wrong={fail}
        />
      </KeyboardAvoidingView>
    </BaseLayout>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 20,
  },
  title: {
    fontSize: 30,
  },
  inputWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    position: 'relative',
  },
  input: {
    padding: 5,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 10,
    borderStyle: "solid",
    width: 350,
    height: 40,
    color: '#fff',
  },
  error: {
    position: 'absolute',
  },
  buttonsWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  button: {
    backgroundColor: "#0D6EFD",
    borderRadius: 20,
    width: 250,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonOutlined: {
    backgroundColor: "#fff",
    color: "#0D6EFD",
    borderWidth: 1,
    borderColor: "#0D6EFD",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  buttonTextOutlined: {
    color: "#0D6EFD",
  },
})