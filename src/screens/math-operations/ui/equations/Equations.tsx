import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';
import { AppLayout } from '@components/layouts/AppLayout';
import { BlueButton } from '@components/buttons/BlueButton';
import { PATHS } from '@constants/paths';
import { NavigationProps } from 'types/commonTypes.types';

export const Equations = ({ navigation }: NavigationProps) => {
  const { t } = useTranslation();

  return (
    <AppLayout title={t('mathOperations.equations')}>
      <ScrollView>
        <BlueButton
          title={t('mathOperations.equationsWithX')}
          onPress={() => navigation.navigate(PATHS.EQUATIONS_X)}
        />
        <BlueButton
          title={t('mathOperations.equationsWithXY')}
          onPress={() => navigation.navigate(PATHS.DIFF)}
        />
      </ScrollView>
    </AppLayout>
  );
};
