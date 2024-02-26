import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { styles } from './../MathOperations.styles'
import { DefaultButton } from '../../../common/components/buttons/DefaultButton'
import { PATHS } from '../../../common/constants/paths'
import { useTranslation } from 'react-i18next'
import { AppLayout } from '../../../common/components/layouts/AppLayout'
import { ButtonsLayout } from '../../../common/components/layouts/ButtonsLayout'
import { MathOperationButton } from '../../../common/components/buttons/MathOperationButton'

export const Mult = ({ navigation }) => {
  const { t } = useTranslation('translation')

  const digits: Array<number> = [2, 3, 4, 5, 6, 7, 8, 9]

  return (
    <AppLayout title={t('mathOperations.multTable')}>
      <ButtonsLayout>
        <MathOperationButton
          title={t('mathOperations.multCheck')}
          buttonCallback={() => navigation.navigate(PATHS.MULT_CHECK)}
        />
        <>
          {digits.map(digit => (
            <MathOperationButton
              title={digit.toString()}
              buttonCallback={() => navigation.navigate(PATHS.MULT_DIGIT, { digit: digit })}
            />
          ))}
        </>
      </ButtonsLayout>
    </AppLayout>
  )
}