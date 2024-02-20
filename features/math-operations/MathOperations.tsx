import React from 'react'
import { styles } from './MathOperations.styles'
import { View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { useTranslation } from 'react-i18next'
import { AppLayout } from '../../common/components/layouts/AppLayout'
import { PATHS } from '../../common/constants/paths'

export const MathOperations = ({ navigation }) => {
  const { t } = useTranslation()

  return (
    <AppLayout title={t('mathOperations.title')}>
      <View>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(PATHS.SUMM)}>
          <Text style={styles.buttonText}>{t('mathOperations.summ')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(PATHS.DIFF)}>
          <Text style={styles.buttonText}>{t('mathOperations.diff')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(PATHS.MULT)}>
          <Text style={styles.buttonText}>{t('mathOperations.multiplication')}</Text>
        </TouchableOpacity>
      </View>
    </AppLayout>
  )
}
