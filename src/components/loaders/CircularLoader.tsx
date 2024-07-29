import React from 'react';
import { ActivityIndicator } from 'react-native';

import { ModalLayout } from '@components/layouts/ModalLayout';

export const Loader = () => {
  return (
    <ModalLayout>
      <ActivityIndicator size="large" color="#0d47a1" />
    </ModalLayout>
  );
};
