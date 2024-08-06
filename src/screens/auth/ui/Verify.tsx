import React from 'react';
import { useRoute } from '@react-navigation/native';
import { KeyboardAvoidingView, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { BlueButton } from 'components/buttons/BlueButton';
import { NavigationProps } from 'types/commonTypes.types';

import { useVerifyQuery } from '../../../api/auth/auth.api';
import { AuthLayout } from '../../../components/layouts/AuthLayout';
import { Loader } from '../../../components/loaders/CircularLoader';
import { styles } from '../Auth.styles';
import { PATHS } from '../../../constants/paths';

type Props = {
  verificationLink: string;
};

export const Verify = ({ navigation }: NavigationProps) => {
  const route = useRoute();
  const { verificationLink } = route.params as Props;
  const { data: error, isLoading } = useVerifyQuery(verificationLink);

  const { t, i18n } = useTranslation('translation');

  return (
    <>
      {isLoading && <Loader />}
      <AuthLayout title={i18n.t('auth.links.verify')}>
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          {error ? (
            <>
              <Text style={styles.title}>{i18n.t('auth.verify.error')}</Text>
              <BlueButton
                title={t('auth.links.register')}
                onPress={() => navigation.navigate(PATHS.REGISTER)}
              />
            </>
          ) : (
            <>
              <Text style={styles.title}>{i18n.t('auth.verify.success')}</Text>
              <BlueButton
                title={t('auth.links.login')}
                onPress={() => navigation.navigate(PATHS.LOGIN)}
              />
            </>
          )}
        </KeyboardAvoidingView>
      </AuthLayout>
    </>
  );
};
