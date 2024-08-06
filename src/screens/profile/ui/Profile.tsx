import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { AppLayout } from '@components/layouts/AppLayout';
import { DefaultButton } from '@components/buttons/DefaultButton';
import { PATHS } from '@constants/paths';
import { DevideLine } from '@components/devideLine/DevideLine';
import { NavigationProps } from 'types/commonTypes.types';

import { styles } from '../../home/Home.styles';

export const Profile = ({ navigation }: NavigationProps) => {
  const { t } = useTranslation();

  return (
    <AppLayout title={t('screens.profile')}>
      <View style={styles.menuContainer}>
        <DefaultButton title={t('yourScore.total')} path={PATHS.YOUR_SCORE} />
        <DevideLine />
        <DefaultButton
          title={t('screens.changeAvatar')}
          onPress={() => navigation.navigate(PATHS.CHANGE_AVATAR)}
        />
        <DefaultButton
          title={t('screens.changeEmail')}
          onPress={() => navigation.navigate(PATHS.CHANGE_EMAIL)}
        />
        <DefaultButton
          title={t('screens.changePassword')}
          onPress={() => navigation.navigate(PATHS.CHANGE_PASSWORD)}
        />
        <DefaultButton title={t('buttons.logout')} path={PATHS.LOGOUT} />
      </View>
    </AppLayout>
  );
};
