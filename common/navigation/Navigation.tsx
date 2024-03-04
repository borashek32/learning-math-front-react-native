import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as Linking from 'expo-linking'
import { PATHS } from '../constants/paths'
import { Summ } from '../../features/math-operations/summ/Summ'
import { Main } from '../../features/main/ui/Main'
import { Diff } from '../../features/math-operations/diff/Diff'
import { Login } from '../../features/auth/ui/Login'
import { Register } from '../../features/auth/ui/Register'
import { Verify } from '../../features/auth/ui/Verify'
import { Home } from '../../features/home/ui/Home'
import { Mult } from '../../features/math-operations/mult/Mult'
import { MultDigit } from '../../features/math-operations/mult/MultDigit'
import { MultCheck } from '../../features/math-operations/mult/MultCheck'
import { Instructions } from '../../features/home/ui/Instructions'
import { Logout } from '../../features/auth/ui/Logout'
import { MathOperations } from '../../features/math-operations/MathOperations'
import { Profile } from '../../features/profile/ui/Profile'
import { useTranslation } from 'react-i18next'
import { Loader } from '../components/loaders/CircularLoader'
import { ForgotPassword } from '../../features/auth/ui/ForgotPassword'
import { CreateNewPassword } from '../../features/auth/ui/CreateNewPassword'
import { ChangePassword } from '../../features/auth/ui/ChangePassword'
import { ChangeEmail } from '../../features/auth/ui/ChangeEmail'
import { YourScore } from '../../features/profile/ui/YourScore'
import { MultNulls } from '../../features/math-operations/mult/MultNulls'
import { ChangeAvatar } from '../../features/profile/ui/ChangeAvatar'
import { useAuthentication } from '../hooks/useAuthentication'

const Stack = createNativeStackNavigator()
const prefix = Linking.createURL('/')
const prefixes = [prefix]

export const Navigation = () => {
  const isAuthenticated = useAuthentication()
  console.log('isAunteficated navigation', isAuthenticated)

  const { t } = useTranslation('translation')

  const linking = {
    prefixes,
    config: {
      screens: {
        initialRouteName: PATHS.MAIN,
        [PATHS.HOME]: PATHS.HOME,
        [PATHS.INSTRUCTIONS]: PATHS.INSTRUCTIONS,
        [PATHS.MATH_OPERATIONS]: PATHS.MATH_OPERATIONS,
        [PATHS.SUMM]: PATHS.SUMM,
        [PATHS.DIFF]: PATHS.DIFF,
        [PATHS.MULT]: PATHS.MULT,
        [PATHS.MULT_NULLS]: PATHS.MULT_NULLS,
        [PATHS.MULT_DIGIT]: PATHS.MULT_DIGIT,
        [PATHS.MULT_CHECK]: PATHS.MULT_CHECK,
        [PATHS.LOGIN]: PATHS.LOGIN,
        [PATHS.REGISTER]: PATHS.REGISTER,
        [PATHS.VERIFY]: {
          path: `${PATHS.VERIFY}/:verificationLink`,
          parse: {
            verificationLink: (verificationLink: string) => verificationLink,
          },
        },
        [PATHS.FORGOT_PASSWORD]: PATHS.FORGOT_PASSWORD,
        [PATHS.CREATE_NEW_PASSWORD]: {
          path: `${PATHS.CREATE_NEW_PASSWORD}/:createNewPasswordLink/:email`,
          parse: {
            createNewPasswordLink: (createNewPasswordLink: string) => createNewPasswordLink,
            email: (email: string) => email,
          },
        },
        [PATHS.CHANGE_EMAIL]: PATHS.CHANGE_EMAIL,
        [PATHS.CHANGE_PASSWORD]: PATHS.CHANGE_PASSWORD,
        [PATHS.YOUR_SCORE]: PATHS.YOUR_SCORE,
        [PATHS.CHANGE_AVATAR]: PATHS.CHANGE_AVATAR
      },
    },
  }

  return (
    <NavigationContainer linking={linking} fallback={<Loader />}>
      <Stack.Navigator>
        {/* common */}
        {!isAuthenticated &&
          <>
            <Stack.Screen name={PATHS.MAIN} component={Main} options={{ headerTitle: t('screens.main')}} />
            {/* auth */}
            <Stack.Screen name={PATHS.LOGIN} component={Login} options={{ headerTitle: t('screens.login') }} />
            <Stack.Screen name={PATHS.REGISTER} component={Register} options={{ headerTitle: t('screens.register') }} />
            <Stack.Screen name={PATHS.VERIFY} component={Verify} options={{ headerTitle: t('screens.verify') }} />
            <Stack.Screen name={PATHS.FORGOT_PASSWORD} component={ForgotPassword} options={{ headerTitle: t('screens.forgotPassword') }} />
          </>
        }
        {/* private */}
        {isAuthenticated &&
          <>
            <Stack.Screen name={PATHS.HOME} component={Home} options={{ headerTitle: t('screens.home'), headerBackVisible: false }} />
            <Stack.Screen name={PATHS.PROFILE} component={Profile} options={{ headerTitle: t('screens.profile') }} />
            <Stack.Screen name={PATHS.YOUR_SCORE} component={YourScore} options={{ headerTitle: t('screens.yourScore') }} />
            <Stack.Screen name={PATHS.MATH_OPERATIONS} component={MathOperations} options={{ headerTitle: t('screens.math') }} />
            <Stack.Screen name={PATHS.SUMM} component={Summ} options={{ headerTitle: t('screens.summ') }} />
            <Stack.Screen name={PATHS.DIFF} component={Diff} options={{ headerTitle: t('screens.diff') }} />
            <Stack.Screen name={PATHS.MULT} component={Mult} options={{ headerTitle: t('screens.mult') }} />
            <Stack.Screen name={PATHS.MULT_DIGIT} component={MultDigit} options={{ headerTitle: t('screens.multDigit') }} />
            <Stack.Screen name={PATHS.MULT_CHECK} component={MultCheck} options={{ headerTitle: t('screens.multCheck') }} />
            <Stack.Screen name={PATHS.MULT_NULLS} component={MultNulls} options={{ headerTitle: t('screens.multNulls') }} />
            {/* profile */}
            <Stack.Screen name={PATHS.CREATE_NEW_PASSWORD} component={CreateNewPassword} options={{ headerTitle: t('screens.createNewPassword') }} />
            <Stack.Screen name={PATHS.CHANGE_EMAIL} component={ChangeEmail} options={{ headerTitle: t('screens.changeEmail') }} />
            <Stack.Screen name={PATHS.CHANGE_PASSWORD} component={ChangePassword} options={{ headerTitle: t('screens.changePassword') }} />
            <Stack.Screen name={PATHS.CHANGE_AVATAR} component={ChangeAvatar} options={{ headerTitle: t('screens.changeAvatar') }} />
            {/* auth */}
            <Stack.Screen name={PATHS.LOGOUT} component={Logout} options={{ headerTitle: t('screens.logout') }} />
          </>
        }
        </Stack.Navigator>
    </NavigationContainer>
  )
}
