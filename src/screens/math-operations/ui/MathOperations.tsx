import React from 'react';
import { ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';

import { AppLayout } from '@components/layouts/AppLayout';
import { PATHS } from '@constants/paths';
import { BlueButton } from '@components/buttons/BlueButton';

export const MathOperations = () => {
  const { t } = useTranslation();

  return (
    <AppLayout title={t('screens.math')}>
      <ScrollView>
        <BlueButton title={t('mathOperations.sum')} path={PATHS.SUM} />
        <BlueButton title={t('mathOperations.diff')} path={PATHS.DIFF} />
        <BlueButton
          title={t('mathOperations.multiplication')}
          path={PATHS.MULT}
        />
        <BlueButton
          title={t('mathOperations.equations')}
          path={PATHS.EQUATIONS}
        />
      </ScrollView>
    </AppLayout>
  );
};
