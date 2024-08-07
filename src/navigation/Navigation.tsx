import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Linking from 'expo-linking';
import { useTranslation } from 'react-i18next';
import { PATHS } from '@constants/paths';
import { Main } from '@screens/main/ui/Main';
import { Login } from '@screens/auth/ui/Login';
import { Register } from '@screens/auth/ui/Register';
import { Verify } from '@screens/auth/ui/Verify';
import { Home } from '@screens/home/ui/Home';
import { Logout } from '@screens/auth/ui/Logout';
import { MathOperations } from '@screens/math-operations/ui/MathOperations';
import { Profile } from '@screens/profile/ui/Profile';
import { Loader } from '@components/loaders/CircularLoader';
import { ForgotPassword } from '@screens/auth/ui/ForgotPassword';
import { CreateNewPassword } from '@screens/auth/ui/CreateNewPassword';
import { ChangePassword } from '@screens/auth/ui/ChangePassword';
import { ChangeEmail } from '@screens/auth/ui/ChangeEmail';
import { YourScore } from '@screens/profile/ui/YourScore';
import { ChangeAvatar } from '@screens/profile/ui/ChangeAvatar';
import { Equations } from '@screens/math-operations/ui/equations/Equations';
import { EquationsWithX } from '@screens/math-operations/ui/equations/withX/EquationsWithX';
import { useAuthentication } from '@hooks/useAuthentication';
import { MultiplicationCheck } from '@screens/math-operations/ui/multiplication-division/multiplication-table/MultiplicationCheck';
import { Multiplication } from '@screens/math-operations/ui/multiplication-division/Multiplication';
import { MultiplicationNumber } from '@screens/math-operations/ui/multiplication-division/multiplication-table/MultiplicationNumber';
import { MultiplicationNulls } from '@screens/math-operations/ui/multiplication-division/multiplication-table/MultiplicationNulls';
import { Docs } from '@screens/main/ui/docs/Docs';
import { PreSchool } from '@screens/pre-school/PreSchool';
import { Numbers } from 'screens/pre-school/ui/numbers/Numbers';
import { Sum } from '@screens/math-operations/ui/sum/Sum';
import { Difference } from '@screens/math-operations/ui/difference/Difference';
import { CatsSum } from '@screens/pre-school/ui/cats-sum/CatsSum';

const Stack = createNativeStackNavigator();
const prefix = Linking.createURL('/');
const prefixes = [prefix];

export const Navigation = () => {
  const isLoggedIn = useAuthentication();
  const { t } = useTranslation('translation');

  const linking = {
    prefixes,
    config: {
      screens: {
        [PATHS.HOME]: PATHS.HOME,
        [PATHS.INSTRUCTIONS]: PATHS.INSTRUCTIONS,

        [PATHS.MATH_OPERATIONS]: PATHS.MATH_OPERATIONS,
        [PATHS.SUM]: PATHS.SUM,
        [PATHS.DIFF]: PATHS.DIFF,
        [PATHS.MULT]: PATHS.MULT,
        [PATHS.MULT_NULLS]: PATHS.MULT_NULLS,
        [PATHS.MULT_DIGIT]: {
          path: `${PATHS.MULT_DIGIT}/:digit`,
          parse: {
            digit: (digit: string) => digit,
          },
        },
        [PATHS.MULT_CHECK]: PATHS.MULT_CHECK,
        [PATHS.EQUATIONS]: PATHS.EQUATIONS,
        [PATHS.EQUATIONS_X]: PATHS.EQUATIONS_X,
        [PATHS.EQUATIONS_XY]: PATHS.EQUATIONS_XY,

        [PATHS.PRE_SCHOOL]: PATHS.PRE_SCHOOL,
        [PATHS.NUMBERS]: PATHS.NUMBERS,
        [PATHS.SUM_CATS]: PATHS.SUM_CATS,

        [PATHS.MAIN]: PATHS.MAIN,
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
            createNewPasswordLink: (createNewPasswordLink: string) =>
              createNewPasswordLink,
            email: (email: string) => email,
          },
        },
        [PATHS.CHANGE_EMAIL]: PATHS.CHANGE_EMAIL,
        [PATHS.CHANGE_PASSWORD]: PATHS.CHANGE_PASSWORD,
        [PATHS.YOUR_SCORE]: PATHS.YOUR_SCORE,
        [PATHS.CHANGE_AVATAR]: PATHS.CHANGE_AVATAR,
      },
    },
  };

  return (
    <NavigationContainer linking={linking} fallback={<Loader />}>
      <Stack.Navigator initialRouteName={isLoggedIn ? PATHS.HOME : PATHS.MAIN}>
        {!isLoggedIn ? (
          <>
            <Stack.Screen
              name={PATHS.MAIN}
              component={Main}
              options={{ headerTitle: t('screens.main') }}
            />
            <Stack.Screen
              name={PATHS.INSTRUCTIONS}
              component={Docs}
              options={{ headerTitle: t('screens.instructions') }}
            />
            <Stack.Screen
              name={PATHS.LOGIN}
              component={Login}
              options={{ headerTitle: t('screens.login') }}
            />
            <Stack.Screen
              name={PATHS.REGISTER}
              component={Register}
              options={{ headerTitle: t('screens.register') }}
            />
            <Stack.Screen
              name={PATHS.VERIFY}
              component={Verify}
              options={{ headerTitle: t('screens.verify') }}
            />
            <Stack.Screen
              name={PATHS.FORGOT_PASSWORD}
              component={ForgotPassword}
              options={{ headerTitle: t('screens.forgotPassword') }}
            />
            <Stack.Screen
              name={PATHS.MATH_OPERATIONS}
              component={MathOperations}
              options={{ headerTitle: t('screens.math') }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name={PATHS.HOME}
              component={Home}
              options={{
                headerTitle: t('screens.home'),
                headerBackVisible: false,
              }}
            />
            <Stack.Screen
              name={PATHS.INSTRUCTIONS}
              component={Docs}
              options={{ headerTitle: t('screens.instructions') }}
            />
            <Stack.Screen
              name={PATHS.PROFILE}
              component={Profile}
              options={{ headerTitle: t('screens.profile') }}
            />
            <Stack.Screen
              name={PATHS.YOUR_SCORE}
              component={YourScore}
              options={{ headerTitle: t('screens.yourScore') }}
            />
            <Stack.Screen
              name={PATHS.LOGOUT}
              component={Logout}
              options={{ headerTitle: t('screens.logout') }}
            />

            <Stack.Screen
              name={PATHS.PRE_SCHOOL}
              component={PreSchool}
              options={{ headerTitle: t('screens.preSchool') }}
            />
            <Stack.Screen
              name={PATHS.NUMBERS}
              component={Numbers}
              options={{ headerTitle: t('preSchool.numbers.title') }}
            />
            <Stack.Screen
              name={PATHS.SUM_CATS}
              component={CatsSum}
              options={{ headerTitle: t('preSchool.cats.title') }}
            />

            <Stack.Screen
              name={PATHS.MATH_OPERATIONS}
              component={MathOperations}
              options={{ headerTitle: t('screens.math') }}
            />
            <Stack.Screen
              name={PATHS.SUM}
              component={Sum}
              options={{ headerTitle: t('mathOperations.sum') }}
            />
            <Stack.Screen
              name={PATHS.DIFF}
              component={Difference}
              options={{ headerTitle: t('mathOperations.diff') }}
            />
            <Stack.Screen
              name={PATHS.MULT_CHECK}
              component={MultiplicationCheck}
              options={{ headerTitle: t('mathOperations.multCheck') }}
            />
            <Stack.Screen
              name={PATHS.MULT}
              component={Multiplication}
              options={{ headerTitle: t('mathOperations.multiplication') }}
            />
            <Stack.Screen
              name={PATHS.MULT_DIGIT}
              component={MultiplicationNumber}
              options={{ headerTitle: t('mathOperations.multBy') }}
            />
            <Stack.Screen
              name={PATHS.MULT_NULLS}
              component={MultiplicationNulls}
              options={{ headerTitle: t('mathOperations.multNulls') }}
            />
            <Stack.Screen
              name={PATHS.EQUATIONS}
              component={Equations}
              options={{ headerTitle: t('mathOperations.equations') }}
            />
            <Stack.Screen
              name={PATHS.EQUATIONS_X}
              component={EquationsWithX}
              options={{ headerTitle: t('mathOperations.equationsWithX') }}
            />
            <Stack.Screen
              name={PATHS.CREATE_NEW_PASSWORD}
              component={CreateNewPassword}
              options={{ headerTitle: t('screens.createNewPassword') }}
            />
            <Stack.Screen
              name={PATHS.CHANGE_EMAIL}
              component={ChangeEmail}
              options={{ headerTitle: t('screens.changeEmail') }}
            />
            <Stack.Screen
              name={PATHS.CHANGE_PASSWORD}
              component={ChangePassword}
              options={{ headerTitle: t('screens.changePassword') }}
            />
            <Stack.Screen
              name={PATHS.CHANGE_AVATAR}
              component={ChangeAvatar}
              options={{ headerTitle: t('screens.changeAvatar') }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
