import React, { useState } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import { RegisterType } from "../../common/services/auth/auth.api.types"
import { useLoginMutation } from "../../common/services/auth/auth.api"
import { AlertResult } from "../../common/components/alerts/AlertResult"

export const Login = ({ navigation }) => {
  const [login, { error }] = useLoginMutation()
  const [fail, setFail] = useState(false)

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setError,
  } = useForm<RegisterType>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })

  const onSubmit: SubmitHandler<RegisterType> = (data: RegisterType) => {
    login(data)
      .unwrap()
      .then(() => {
        reset()
        navigation.navigate('home')
      })
      .catch((error) => {
        setFail(true)
        setError("email", { type: "manual", message: "Ваш текст ошибки" })
        console.error(error)
        if (error.data && error.data.errors) {
          console.log(error.data.errors)
        }
      })
  }

  return (
    <KeyboardAvoidingView behavior={"padding"} style={styles.container}>
      <Text style={styles.title}>Hello</Text>

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
          render={({ field: { ref, value, onChange } }) => (
            <>
              <TextInput
                placeholder={"Email"}
                onChangeText={onChange}
                style={styles.input}
                value={value}
                ref={ref}
              />
            </>
          )}
        />
        {errors.email && <Text>{errors.email.message}</Text>}

        <Controller
          control={control}
          name="password"
          render={({ field: { ref, value, onChange }, fieldState: { error } }) => (
            <>
              <TextInput
                placeholder={"Password"}
                onChangeText={onChange}
                style={styles.input}
                ref={ref}
                value={value}
              />
              {error && <p>{error.message}</p>}
            </>
          )}
        />
      </View>

      <View style={styles.buttonsWrapper}>
        <TouchableOpacity
          onPress={() => handleSubmit(onSubmit)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>

      <AlertResult 
        title={'Something went wrong. Please, try later'}
        wrong={fail}
      />
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  title: {
    fontSize: 30,
  },
  inputWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  input: {
    padding: 5,
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 10,
    borderStyle: "solid",
    width: 350,
    height: 40,
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