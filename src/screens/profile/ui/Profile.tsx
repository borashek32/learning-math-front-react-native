import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { AppLayout } from '@components/layouts/AppLayout';
import { PATHS } from '@constants/paths';
import { DevideLine } from '@components/devideLine/DevideLine';
import { NavigationProps } from 'types/commonTypes.types';
import { BlueButton } from 'components/buttons/BlueButton';

import { styles } from '../../home/Home.styles';

export const Profile = ({ navigation }: NavigationProps) => {
  const { t } = useTranslation();

  return (
    <AppLayout title={t('screens.profile')}>
      <View style={styles.menuContainer}>
        <BlueButton
          title={t('yourScore.total')}
          onPress={() => navigation.navigate(PATHS.YOUR_SCORE)}
        />
        <DevideLine />
        <BlueButton
          title={t('screens.changeAvatar')}
          onPress={() => navigation.navigate(PATHS.CHANGE_AVATAR)}
        />
        <BlueButton
          title={t('screens.changeEmail')}
          onPress={() => navigation.navigate(PATHS.CHANGE_EMAIL)}
        />
        <BlueButton
          title={t('screens.changePassword')}
          onPress={() => navigation.navigate(PATHS.CHANGE_PASSWORD)}
        />
        <DevideLine />
        <BlueButton
          title={t('buttons.logout')}
          onPress={() => navigation.navigate(PATHS.LOGOUT)}
        />
      </View>
    </AppLayout>
  );
};
