import React, { useEffect } from "react"
import { Text } from "react-native"
import { useVerifyQuery } from "../../common/services/auth/auth.api"
import { useRoute } from "@react-navigation/native"

type Props = {
  verificationLink: string
}

export const Verify = ({ navigation }) => {
  const route = useRoute()
  const { verificationLink } = route.params as Props

  const { data: error } = useVerifyQuery(verificationLink)

  useEffect(() => {
    if (verificationLink) {
      navigation.navigate('login')
    } else if (error) {
      console.log(error)
    }
  }, [verificationLink])

  return (
    <Text>Ваш аккаунт успешно верифицирован {verificationLink}</Text>
  )
}
