import React, { useEffect } from "react"
import { useVerifyQuery } from "../../../api/auth/auth.api"
import { useRoute } from "@react-navigation/native"
import { KeyboardAvoidingView, Text } from "react-native"
import { AuthLayout } from "../../../components/layouts/AuthLayout"
import { Loader } from "../../../components/loaders/CircularLoader"
import { useTranslation } from 'react-i18next'
import { styles } from '../Auth.styles'
import { DefaultButton } from "../../../components/buttons/DefaultButton"
import { PATHS } from "../../../constants/paths"

type Props = {
  verificationLink: string
}

export const Verify = () => {
  const route = useRoute()
  const { verificationLink } = route.params as Props
  const { data: error, isLoading } = useVerifyQuery(verificationLink)

  const { t, i18n } = useTranslation('translation')

  return (
    <>
      {isLoading && <Loader />}
      <AuthLayout title={i18n.t('auth.links.verify')}>
        <KeyboardAvoidingView behavior={"padding"} style={styles.container}>
          {error 
          ? <>
              <Text style={styles.title}>{i18n.t('auth.verify.error')}</Text>
              <DefaultButton
                title={t('auth.links.register')}
                path={PATHS.REGISTER}
              />
            </>
          : <>
              <Text style={styles.title}>{i18n.t('auth.verify.success')}</Text>
              <DefaultButton
                title={t('auth.links.login')}
                path={PATHS.LOGIN}
              />
            </>
          }
        </KeyboardAvoidingView>
      </AuthLayout>
    </>
  )
}
