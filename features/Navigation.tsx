import { Summ } from './math-operations/Summ'
import { Main } from '../mail/ui/Main'
import { Diff } from './math-operations/Diff'
import { Login } from './auth/Login'
import { Register } from './auth/Register'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Verify } from './auth/Verify'
import { Home } from './home/ui/Home'
import * as Linking from 'expo-linking'
import { Mult } from './math-operations/mult/Mult'
import { MultDigit } from './math-operations/mult/MultDigit'
import { MultCheck } from './math-operations/mult/MultCheck'
import { useTranslation } from 'react-i18next'

const Stack = createNativeStackNavigator()
const prefix = Linking.createURL('/')

export const Navigation = () => {
  const { t, i18n } = useTranslation()

  const linking = {
    prefixes: [prefix],
    config: {
      initialRouteName: "main" as const,
      screens: {
        main: "Welcome",
        home: "Home",
        summ: "summ",
        diff: "diff",
        mult: "mult",
        multDigit: "multDigit",
        multCheck: "multCheck",
        login: "Login",
        register: "Register",
        verify: {
          path: "verify",
          parse: { 
            verificationLink: (verificationLink: string) => verificationLink,
          },
        },
      },
    },
  }

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator>
        <Stack.Screen name="main" component={Main} options={{ title: t('Welcome') }} />
        <Stack.Screen name="home" component={Home} options={{ title: t('Home') }} />
        <Stack.Screen name="summ" component={Summ} options={{ title: t('Summ') }} />
        <Stack.Screen name="diff" component={Diff} options={{ title: t('Difference') }} />
        <Stack.Screen name="mult" component={Mult} options={{ title: t('Multiplication') }} />
        <Stack.Screen name="multDigit" component={MultDigit} options={{ title: t('Multiplication by ') }} />
        <Stack.Screen name="multCheck" component={MultCheck} options={{ title: t('Check mutiplication knowledge') }} />
        <Stack.Screen name="login" component={Login} options={{ title: t('Login') }} />
        <Stack.Screen name="register" component={Register} options={{ title: t('Register') }} />
        <Stack.Screen name="verify" component={Verify} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}