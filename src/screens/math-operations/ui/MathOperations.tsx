import React from 'react';
import { ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { AppLayout } from '@components/layouts/AppLayout';
import { PATHS } from '@constants/paths';
import { BlueButton } from '@components/buttons/BlueButton';
import { NavigationProps } from 'types/commonTypes.types';

export const MathOperations = ({ navigation }: NavigationProps) => {
  const { t } = useTranslation();

  return (
    <AppLayout title={t('screens.math')}>
      <ScrollView>
        <BlueButton
          title={t('mathOperations.sum')}
          onPress={() => navigation.navigate(PATHS.SUM)}
        />
        <BlueButton
          title={t('mathOperations.diff')}
          onPress={() => navigation.navigate(PATHS.DIFF)}
        />
        <BlueButton
          title={t('mathOperations.multiplication')}
          onPress={() => navigation.navigate(PATHS.MULT)}
        />
        <BlueButton
          title={t('mathOperations.equations')}
          onPress={() => navigation.navigate(PATHS.EQUATIONS)}
        />
      </ScrollView>
    </AppLayout>
  );
};
