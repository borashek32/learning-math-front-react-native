import React from 'react'
import { FlatList, ScrollView } from 'react-native'
import { PATHS } from '../../../common/constants/paths'
import { useTranslation } from 'react-i18next'
import { AppLayout } from '../../../common/components/layouts/AppLayout'
import { ButtonsLayout } from '../../../common/components/layouts/ButtonsLayout'
import { BlueButton } from '../../../common/components/buttons/BlueButton'

export const Mult = ({ navigation }) => {
  const { t } = useTranslation('translation')

  const digits: Array<number> = [2, 3, 4, 5, 6, 7, 8, 9]

  return (
    <AppLayout title={t('mathOperations.multTable')}>
      <ScrollView>
        <ButtonsLayout>
          <BlueButton
            title={t('mathOperations.multCheck')}
            path={PATHS.MULT_CHECK}
          />
          <BlueButton
            title={t('mathOperations.multNulls')}
            path={PATHS.MULT_NULLS}
          />
          <FlatList
            data={digits}
            renderItem={({ item }) => (
              <BlueButton
                title={item.toString()}
                onPress={() => navigation.navigate(PATHS.MULT_DIGIT, { digit: item })}
              />
            )}
          />
        </ButtonsLayout>
      </ScrollView>
    </AppLayout>
  )
}