import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { AppLayout } from '@components/layouts/AppLayout';
import { PATHS } from '@constants/paths';
import { BlueButton } from '@components/buttons/BlueButton';
import { NavigationProps } from 'types/commonTypes.types';

import { styles } from '../home/Home.styles';

export const PreSchool = ({ navigation }: NavigationProps) => {
  const { t } = useTranslation('translation');

  return (
    <>
      <AppLayout title={t('screens.preSchool')}>
        <View style={styles.menuContainer}>
          <BlueButton
            title={t('preSchool.numbers.title')}
            onPress={() => navigation.navigate(PATHS.NUMBERS)}
          />
          <BlueButton
            title={t('preSchool.cats.title')}
            onPress={() => navigation.navigate(PATHS.SUM_CATS)}
          />
        </View>
        <StatusBar style="auto" />
      </AppLayout>
    </>
  );
};
