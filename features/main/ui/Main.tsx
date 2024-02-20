import React from 'react'
import { Button, View } from 'react-native'
import { BaseLayout } from '../../../common/components/layouts/BaseLayout'
import { useTranslation } from 'react-i18next'
import { PATHS } from '../../../common/constants/paths'

export const Main = ({ navigation }) => {
  const { t } = useTranslation('translation')

  return (
    <BaseLayout>
      <View>
        <Button
          title={t('auth.links.register')}
          onPress={() => navigation.push(PATHS.REGISTER)}
        />
        <Button
          title={t('auth.links.login')}
          onPress={() => navigation.push(PATHS.LOGIN)}
        />
      </View>
    </BaseLayout>
  )
}
