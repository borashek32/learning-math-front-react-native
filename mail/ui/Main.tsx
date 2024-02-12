import React from 'react'
import { Button, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useTranslation } from 'react-i18next'
import { BaseLayout } from './../../common/components/layouts/BaseLayout'

export const Main = ({ navigation }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'auth.links' })

  return (
    <BaseLayout>
      <View>
        <Button
          title={t('Login')}
          onPress={() => navigation.push('login')}
        />
        <Button
          title={t('Register')}
          onPress={() => navigation.push('register')}
        />
        <StatusBar style="auto" />
      </View>
    </BaseLayout>
  )
}
