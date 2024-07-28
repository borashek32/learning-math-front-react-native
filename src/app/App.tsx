import React from 'react'
import { Provider } from 'react-redux'
import { store } from '../providers/store-provider/store'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../i18n.config'
import {decode, encode} from 'base-64'
import { Navigation } from './../navigation/Navigation'

if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

export default function App() {

  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </I18nextProvider>
  )
}
