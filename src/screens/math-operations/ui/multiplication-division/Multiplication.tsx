import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';

import { styles } from '../../MathOperations.styles';
import { PATHS } from '@constants/paths';
import { AppLayout } from '@components/layouts/AppLayout';
import { ButtonsLayout } from '@components/layouts/ButtonsLayout';
import { BlueButton } from '@components/buttons/BlueButton';
import { NavigationProps } from 'types/commonTypes.types';

export const Multiplication = ({ navigation }: NavigationProps) => {
  const { t } = useTranslation('translation');

  const digits: number[] = [2, 3, 4, 5, 6, 7, 8, 9];

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
              onPress={() =>
                navigation.navigate(PATHS.MULT_DIGIT, {
                  digit: digit.toString(),
                })
              }>
              <Text style={styles.digit}>{digit}</Text>
            </TouchableOpacity>
          ))}
        </>
      </ButtonsLayout>
    </AppLayout>
  );
};
