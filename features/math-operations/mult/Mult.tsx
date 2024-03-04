import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { styles } from './../MathOperations.styles'
import { DefaultButton } from '../../../common/components/buttons/DefaultButton'
import { PATHS } from '../../../common/constants/paths'
import { useTranslation } from 'react-i18next'
import { AppLayout } from '../../../common/components/layouts/AppLayout'
import { ButtonsLayout } from '../../../common/components/layouts/ButtonsLayout'
import { MathOperationButton } from '../../../common/components/buttons/MathOperationButton'
import { BlueButton } from '../../../common/components/buttons/BlueButton'

export const Mult = ({ navigation }) => {
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