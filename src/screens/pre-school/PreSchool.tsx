import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { AppLayout } from '@components/layouts/AppLayout';
import { PATHS } from '@constants/paths';
import { BlueButton } from '@components/buttons/BlueButton';

import { styles } from '../home/Home.styles';

export const PreSchool = () => {
  const { t } = useTranslation('translation');

  return (
    <>
      <AppLayout>
        <View style={styles.menuContainer}>
          <BlueButton
            title={t('preSchool.numbers.title')}
            path={PATHS.NUMBERS}
          />
        </View>
        <StatusBar style="auto" />
      </AppLayout>
    </>
  );
};
