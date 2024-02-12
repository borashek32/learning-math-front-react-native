import React from 'react';
import { Navigation } from './features/Navigation';
import { Provider } from 'react-redux';
import { store } from './common/providers/model/store';
import i18n from './i18n'
import { useTranslation } from 'react-i18next';

const initI18n = i18n

export default function App() {

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
