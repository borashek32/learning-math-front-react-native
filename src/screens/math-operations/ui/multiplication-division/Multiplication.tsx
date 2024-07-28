import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { styles } from '../../MathOperations.styles'
import { PATHS } from '../../../../constants/paths'
import { useTranslation } from 'react-i18next'
import { AppLayout } from '../../../../components/layouts/AppLayout'
import { ButtonsLayout } from '../../../../components/layouts/ButtonsLayout'
import { BlueButton } from '../../../../components/buttons/BlueButton'

export const Multiplication = ({ navigation }) => {
  const { t } = useTranslation('translation')

  const digits: Array<number> = [2, 3, 4, 5, 6, 7, 8, 9]

  return (
    <AppLayout title={t('mathOperations.multTable')}>
      <ButtonsLayout>
        <BlueButton
          title={t('mathOperations.multCheck')}
          path={PATHS.MULT_CHECK}
        />
        <BlueButton
          title={t('mathOperations.multNulls')}
          path={PATHS.MULT_NULLS}
        />
        <>
          {digits.map(digit => (
            <TouchableOpacity
              key={digit}
              style={styles.button} 
              onPress={() => navigation.navigate(PATHS.MULT_DIGIT, { digit: digit })}
            >
              <Text style={styles.digit}>{digit}</Text>
            </TouchableOpacity>
          ))}
        </>
      </ButtonsLayout>
    </AppLayout>
  )
}