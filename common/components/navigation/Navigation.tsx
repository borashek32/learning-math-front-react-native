import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as Linking from 'expo-linking'
import { PATHS } from '../../constants/paths'
import { Summ } from '../../../features/math-operations/summ/Summ'
import { Main } from '../../../features/main/ui/Main'
import { Diff } from '../../../features/math-operations/diff/Diff'
import { Login } from '../../../features/auth/ui/Login'
import { Register } from '../../../features/auth/ui/Register'
import { Verify } from '../../../features/auth/ui/Verify'
import { Home } from '../../../features/home/ui/Home'
import { Mult } from '../../../features/math-operations/mult/Mult'
import { MultDigit } from '../../../features/math-operations/mult/MultDigit'
import { MultCheck } from '../../../features/math-operations/mult/MultCheck'
import { Instructions } from '../../../features/home/ui/Instructions'
import { Logout } from '../../../features/auth/ui/Logout'
import { MathOperations } from '../../../features/math-operations/MathOperations'
import { Profile } from '../../../features/profile/ui/Profile'
import { useTranslation } from 'react-i18next'
import { Loader } from '../loaders/CircularLoader'

const Stack = createNativeStackNavigator()
const prefix = Linking.createURL('/')
const prefixes = [prefix]

export const Navigation = () => {
  const { t } = useTranslation('translation')

  const linking = {
    prefixes,
    config: {
      screens: {
        initialRouteName: PATHS.MAIN,
        home: PATHS.HOME,
        instructions: PATHS.INSTRUCTIONS,
        mathOperations: PATHS.MATH_OPERATIONS,
        summ: PATHS.SUMM,
        difference: PATHS.DIFF,
        mult: PATHS.MULT,
        multDigit: PATHS.MULT_DIGIT,
        multChech: PATHS.MULT_CHECK,
        login: PATHS.LOGIN,
        register: PATHS.REGISTER,
        verify: {
          path: PATHS.VERIFY,
          parse: {
            verificationLink: (verificationLink: string) => verificationLink,
          },
        },
      },
    },
  }

  return (
    <NavigationContainer linking={linking} fallback={<Loader />}>
      <Stack.Navigator>
        {/* common */}
        <Stack.Screen name={PATHS.MAIN} component={Main} options={{ headerTitle: t('screens.main')}} />
        <Stack.Screen name={PATHS.HOME} component={Home} options={{ headerTitle: t('screens.home') }}/>
        <Stack.Screen name={PATHS.INSTRUCTIONS} component={Instructions} options={{ headerTitle: t('screens.instructions') }} />
        {/* private */}
        <Stack.Screen name={PATHS.PROFILE} component={Profile} options={{ headerTitle: t('screens.profile') }} />
        <Stack.Screen name={PATHS.MATH_OPERATIONS} component={MathOperations} options={{ headerTitle: t('screens.math') }} />
        {/* math-operations */}
        <Stack.Screen name={PATHS.SUMM} component={Summ} options={{ headerTitle: t('screens.summ') }} />
        <Stack.Screen name={PATHS.DIFF} component={Diff} options={{ headerTitle: t('screens.diff') }} />
        <Stack.Screen name={PATHS.MULT} component={Mult} options={{ headerTitle: t('screens.mult') }} />
        <Stack.Screen name={PATHS.MULT_DIGIT} component={MultDigit} options={{ headerTitle: t('screens.multDigit') }} />
        <Stack.Screen name={PATHS.MULT_CHECK} component={MultCheck} options={{ headerTitle: t('screens.multCheck') }} />
        {/* auth  */}
        <Stack.Screen name={PATHS.LOGIN} component={Login} options={{ headerTitle: t('screens.login') }} />
        <Stack.Screen name={PATHS.REGISTER} component={Register} options={{ headerTitle: t('screens.register') }} />
        <Stack.Screen name={PATHS.VERIFY} component={Verify} options={{ headerTitle: t('screens.verify') }} />
        <Stack.Screen name={PATHS.LOGOUT} component={Logout} options={{ headerTitle: t('screens.logout') }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
