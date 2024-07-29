import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';

import { AppLayout } from '@components/layouts/AppLayout';
import { BlueButton } from '@components/buttons/BlueButton';
import { PATHS } from '@constants/paths';

export const Equations = () => {
  const { t } = useTranslation();

  return (
    <AppLayout title={t('mathOperations.equations')}>
      <ScrollView>
        <BlueButton
          title={t('mathOperations.equationsWithX')}
          path={PATHS.EQUATIONS_X}
        />
        <BlueButton
          title={t('mathOperations.equationsWithXY')}
          path={PATHS.DIFF}
        />
      </ScrollView>
    </AppLayout>
  );
};
