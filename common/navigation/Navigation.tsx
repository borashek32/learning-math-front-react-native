import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as Linking from 'expo-linking'
import { PATHS } from '../constants/paths'
import { SummDifference } from '../../features/math-operations/ui/summ-difference/SummDifference'
import { Main } from '../../features/main/ui/Main'
import { Login } from '../../features/auth/ui/Login'
import { Register } from '../../features/auth/ui/Register'
import { Verify } from '../../features/auth/ui/Verify'
import { Home } from '../../features/home/ui/Home'
import { Instructions } from '../../features/home/ui/Instructions'
import { Logout } from '../../features/auth/ui/Logout'
import { MathOperations } from '../../features/math-operations/ui/MathOperations'
import { Profile } from '../../features/profile/ui/Profile'
import { useTranslation } from 'react-i18next'
import { Loader } from '../components/loaders/CircularLoader'
import { ForgotPassword } from '../../features/auth/ui/ForgotPassword'
import { CreateNewPassword } from '../../features/auth/ui/CreateNewPassword'
import { ChangePassword } from '../../features/auth/ui/ChangePassword'
import { ChangeEmail } from '../../features/auth/ui/ChangeEmail'
import { YourScore } from '../../features/profile/ui/YourScore'
import { ChangeAvatar } from '../../features/profile/ui/ChangeAvatar'
import { Equations } from '../../features/math-operations/ui/equations/Equations'
import { EquationsWithX } from '../../features/math-operations/ui/equations/withX/EquationsWithX'
import { MathOperationsConstants } from '../constants/MathConstants'
import { useAuthentication } from '../hooks/useAuthentication'
import { MultiplicationCheck } from '../../features/math-operations/ui/multiplication-division/multiplication-table/MultiplicationCheck'
import { Multiplication } from '../../features/math-operations/ui/multiplication-division/Multiplication'
import { MultiplicationNumber } from '../../features/math-operations/ui/multiplication-division/multiplication-table/MultiplicationNumber'
import { MultiplicationNulls } from '../../features/math-operations/ui/multiplication-division/multiplication-table/MultiplicationNulls'
import { Docs } from '../../features/main/ui/docs/Docs'

const Stack = createNativeStackNavigator()
const prefix = Linking.createURL('/')
const prefixes = [prefix]

export const Navigation = () => {
  const isLoggedIn = useAuthentication()
  
  const { t } = useTranslation('translation')

  const linking = {
    prefixes,
    config: {
      screens: {
        [PATHS.HOME]: PATHS.HOME,
        [PATHS.INSTRUCTIONS]: PATHS.INSTRUCTIONS,
        [PATHS.MATH_OPERATIONS]: PATHS.MATH_OPERATIONS,
        [PATHS.SUMM]: PATHS.SUMM,
        [PATHS.DIFF]: PATHS.DIFF,
        [PATHS.MULT]: PATHS.MULT,
        [PATHS.MULT_NULLS]: PATHS.MULT_NULLS,
        [PATHS.MULT_DIGIT]: PATHS.MULT_DIGIT,
        [PATHS.MULT_CHECK]: PATHS.MULT_CHECK,
        [PATHS.EQUATIONS]: PATHS.EQUATIONS,
        [PATHS.EQUATIONS_X]: PATHS.EQUATIONS_X,
        [PATHS.EQUATIONS_XY]: PATHS.EQUATIONS_XY,

        [PATHS.MAIN]: PATHS.MAIN,
        // [PATHS.LOGIN]: PATHS.LOGIN,
        // [PATHS.REGISTER]: PATHS.REGISTER,
        // [PATHS.VERIFY]: {
        //   path: `${PATHS.VERIFY}/:verificationLink`,
        //   parse: {
        //     verificationLink: (verificationLink: string) => verificationLink,
        //   },
        // },
        // [PATHS.FORGOT_PASSWORD]: PATHS.FORGOT_PASSWORD,
        // [PATHS.CREATE_NEW_PASSWORD]: {
        //   path: `${PATHS.CREATE_NEW_PASSWORD}/:createNewPasswordLink/:email`,
        //   parse: {
        //     createNewPasswordLink: (createNewPasswordLink: string) => createNewPasswordLink,
        //     email: (email: string) => email,
        //   },
        // },
        // [PATHS.CHANGE_EMAIL]: PATHS.CHANGE_EMAIL,
        // [PATHS.CHANGE_PASSWORD]: PATHS.CHANGE_PASSWORD,
        // [PATHS.YOUR_SCORE]: PATHS.YOUR_SCORE,
        // [PATHS.CHANGE_AVATAR]: PATHS.CHANGE_AVATAR,
      },
    },
  }
  
  return (
    <NavigationContainer linking={linking} fallback={<Loader />}>
      <Stack.Navigator initialRouteName={isLoggedIn ? PATHS.HOME : PATHS.MAIN}>
        {/* {!isLoggedIn ?
          ( */}
            <>
              <Stack.Screen name={PATHS.MAIN} component={Main} options={{ headerTitle: t('screens.main')}} />
              <Stack.Screen name={PATHS.INSTRUCTIONS} component={Docs} options={{ headerTitle: t('screens.instructions')}} />
              {/* <Stack.Screen name={PATHS.LOGIN} component={Login} options={{ headerTitle: t('screens.login') }} />
              <Stack.Screen name={PATHS.REGISTER} component={Register} options={{ headerTitle: t('screens.register') }} />
              <Stack.Screen name={PATHS.VERIFY} component={Verify} options={{ headerTitle: t('screens.verify') }} />
              <Stack.Screen name={PATHS.FORGOT_PASSWORD} component={ForgotPassword} options={{ headerTitle: t('screens.forgotPassword') }} />          */}
            </>
          {/* ) : ( */}
            <>
              <Stack.Screen name={PATHS.HOME} component={Home} options={{ headerTitle: t('screens.home'), headerBackVisible: false }} />
              <Stack.Screen name={PATHS.PROFILE} component={Profile} options={{ headerTitle: t('screens.profile') }} />
              <Stack.Screen name={PATHS.YOUR_SCORE} component={YourScore} options={{ headerTitle: t('screens.yourScore') }} />
              <Stack.Screen name={PATHS.MATH_OPERATIONS} component={MathOperations} options={{ headerTitle: t('screens.math') }} />
              <Stack.Screen name={PATHS.LOGOUT} component={Logout} options={{ headerTitle: t('screens.logout') }} />
              <Stack.Screen
                name={PATHS.SUMM}
                component={SummDifference}
                options={{ headerTitle: t('screens.summ') }}
                initialParams={{ mathOperation: MathOperationsConstants.SUMM }}
              />
              <Stack.Screen
                name={PATHS.DIFF}
                component={SummDifference}
                options={{ headerTitle: t('screens.diff') }}
                initialParams={{ mathOperation: MathOperationsConstants.DIFF }}
              />
              <Stack.Screen
                name={PATHS.MULT_CHECK}
                component={MultiplicationCheck}
                options={{ headerTitle: t('screens.multCheck') }}
                // initialParams={{ mathOperation: MathOperationsConstants.DIVIDE }}
              />
              <Stack.Screen name={PATHS.MULT} 
                component={Multiplication} 
                options={{ headerTitle: t('screens.mult') }} 
              />
              <Stack.Screen name={PATHS.MULT_DIGIT} 
                component={MultiplicationNumber} 
                options={{ headerTitle: t('screens.multDigit') }} 
              />
              <Stack.Screen name={PATHS.MULT_NULLS} 
                component={MultiplicationNulls} 
                options={{ headerTitle: t('screens.multNulls') }} 
              />
              <Stack.Screen name={PATHS.EQUATIONS} 
                component={Equations} 
                options={{ headerTitle: t('mathOperations.equations') }} 
              />
              <Stack.Screen name={PATHS.EQUATIONS_X} 
                component={EquationsWithX} 
                options={{ headerTitle: t('mathOperations.equationsWithX') }} 
              />
              {/* <Stack.Screen name={PATHS.CREATE_NEW_PASSWORD} component={CreateNewPassword} options={{ headerTitle: t('screens.createNewPassword') }} />
              <Stack.Screen name={PATHS.CHANGE_EMAIL} component={ChangeEmail} options={{ headerTitle: t('screens.changeEmail') }} />
              <Stack.Screen name={PATHS.CHANGE_PASSWORD} component={ChangePassword} options={{ headerTitle: t('screens.changePassword') }} />
              <Stack.Screen name={PATHS.CHANGE_AVATAR} component={ChangeAvatar} options={{ headerTitle: t('screens.changeAvatar') }} /> */}
            </>
          {/* )
        } */}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

