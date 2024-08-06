import React from 'react';
import { useTranslation } from 'react-i18next';
import { PATHS } from '@constants/paths';
import { AppLayout } from '@components/layouts/AppLayout';
import { ButtonsLayout } from '@components/layouts/ButtonsLayout';
import { BlueButton } from '@components/buttons/BlueButton';
import { NavigationProps } from 'types/commonTypes.types';
import { styles } from '@screens/home/Home.styles';
import { ScrollView, Text } from 'react-native';
import { AppText } from 'components/appText/AppText';

export const Multiplication = ({ navigation }: NavigationProps) => {
  const { t } = useTranslation('translation');

  const digits: number[] = [2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <AppLayout title={t('mathOperations.multTable')}>
      <ButtonsLayout>
        <BlueButton
          title={t('mathOperations.multCheck')}
          onPress={() => navigation.navigate(PATHS.MULT_CHECK)}
        />
        <BlueButton
          title={t('mathOperations.multNulls')}
          onPress={() => navigation.navigate(PATHS.MULT_NULLS)}
        />
      </ButtonsLayout>
      <AppText text="Choose number to count" />
      <ScrollView contentContainerStyle={styles.menuContainer}>
        {digits.map(digit => (
          <BlueButton
            key={digit}
            title={digit.toString()}
            onPress={() =>
              navigation.navigate(PATHS.MULT_DIGIT, {
                digit: digit.toString(),
              })
            }
          />
        ))}
      </ScrollView>
    </AppLayout>
  );
};
