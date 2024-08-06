import React from 'react';
import { useTranslation } from 'react-i18next';

import { BaseLayout } from '../../../components/layouts/BaseLayout';
import { PATHS } from '../../../constants/paths';
import { BlueButton } from '../../../components/buttons/BlueButton';
import { NavigationProps } from '../../../types/commonTypes.types';

export const Main = ({ navigation }: NavigationProps) => {
  const { t } = useTranslation('translation');

  return (
    <>
      <BaseLayout>
        <BlueButton
          title={t('screens.math')}
          onPress={() => navigation.navigate(PATHS.MATH_OPERATIONS)}
        />
        <BlueButton
          title={t('screens.instructions')}
          onPress={() => navigation.navigate(PATHS.INSTRUCTIONS)}
        />
        <BlueButton
          title={t('screens.register')}
          onPress={() => navigation.navigate(PATHS.REGISTER)}
        />
        <BlueButton
          title={t('screens.login')}
          onPress={() => navigation.navigate(PATHS.LOGIN)}
        />
      </BaseLayout>
    </>
  );
};
