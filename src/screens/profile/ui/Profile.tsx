import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { AppLayout } from '@components/layouts/AppLayout';
import { DefaultButton } from '@components/buttons/DefaultButton';
import { styles } from '../../home/Home.styles';
import { PATHS } from '@constants/paths';
import { DevideLine } from '@components/devideLine/DevideLine';

export const Profile = () => {
  const { t } = useTranslation();

  return (
    <AppLayout title={t('screens.profile')}>
      <View style={styles.menuContainer}>
        <DefaultButton title={t('yourScore.total')} path={PATHS.YOUR_SCORE} />
        <DevideLine />
        <DefaultButton
          title={t('screens.changeAvatar')}
          path={PATHS.CHANGE_AVATAR}
        />
        <DefaultButton
          title={t('screens.changeEmail')}
          path={PATHS.CHANGE_EMAIL}
        />
        <DefaultButton
          title={t('screens.changePassword')}
          path={PATHS.CHANGE_PASSWORD}
        />
        <DefaultButton title={t('buttons.logout')} path={PATHS.LOGOUT} />
      </View>
    </AppLayout>
  );
};
