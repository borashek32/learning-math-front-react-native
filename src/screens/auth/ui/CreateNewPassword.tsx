import { Controller, Resolver, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRoute } from '@react-navigation/native';
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { useSaveNewPasswordMutation } from '../../../api/auth/auth.api';
import { Loader } from '../../../components/loaders/CircularLoader';
import { Modal } from '../../../components/modal/Modal';
import { PATHS } from '../../../constants/paths';
import { AuthLayout } from '../../../components/layouts/AuthLayout';
import { styles } from '../Auth.styles';
import { DefaultButton } from '../../../components/buttons/DefaultButton';
import { Error } from '../../../components/error/Error';
import { PasswordRecoveryType } from '../../../api/auth/auth.api.types';
import { NavigationProps } from '../../../types/commonTypes.types';
interface IFormProps {
  password: string;
  passwordConfirmation: string;
}

type Props = {
  createNewPasswordLink: string;
  email: string;
};

export const CreateNewPassword = ({ navigation }: NavigationProps) => {
  const route = useRoute();
  const { createNewPasswordLink, email } = route.params as Props;
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(true);
  const [serverError, setServerError] = useState('');
  const [saveNewPassword, { isLoading }] = useSaveNewPasswordMutation();

  const { t } = useTranslation();

  const formSchema = yup.object().shape({
    password: yup
      .string()
      .required(t('errors.required'))
      .matches(/^[A-Za-z]+$/i, t('errors.latinLetters'))
      .min(4, t('errors.min'))
      .max(64, t('errors.max')),
    passwordConfirmation: yup
      .string()
      .required(t('errors.required'))
      .min(4, t('errors.min'))
      .max(64, t('errors.max'))
      .oneOf([yup.ref('passwordConfirmation')], t('errors.notMatch')),
  });

  const {
    handleSubmit,
    formState: { errors },
    clearErrors,
    watch,
    reset,
    trigger,
    control,
  } = useForm<IFormProps>({
    mode: 'onChange',
    defaultValues: {
      password: '',
      passwordConfirmation: '',
    },
    resolver: yupResolver<any>(formSchema),
  });
  watch('password', '');

  const onSubmit: SubmitHandler<any> = (data: PasswordRecoveryType) => {
    if (!data) {
      setServerError('Some error occured');
    } else {
      data = { ...data, email };
      setServerError('');
      saveNewPassword(data)
        .unwrap()
        .then(() => {
          setSuccess(true);
          reset();
        })
        .catch(e => {
          if (e.status === 'FETCH_ERROR')
            setServerError(t('errors.serverError'));
        });
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      {success && (
        <Modal
          text={t('modal.changePasswordSuccess')}
          open={open}
          setOpen={setOpen}
          outlinedButton
          buttonName={t('auth.links.login')}
          buttonCallback={() => navigation.navigate(PATHS.LOGIN)}
          buttonBack={false}
        />
      )}
      <AuthLayout title={t('screens.createNewPassword')}>
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          {serverError && <Error error={serverError} />}
          <View style={styles.inputsWrapper}>
            <View style={styles.inputContainer}>
              <Controller
                control={control}
                name="password"
                render={({ field: { ref, onChange, value } }) => (
                  <TextInput
                    placeholderTextColor="grey"
                    placeholder={t('auth.register.inputs.password.placeholder')}
                    style={styles.input}
                    secureTextEntry
                    onChangeText={onChange}
                    ref={ref}
                    value={value}
                    onFocus={() => {
                      clearErrors('password');
                      setServerError('');
                    }}
                    onBlur={() => {
                      trigger('password');
                    }}
                  />
                )}
              />
              {errors.password && <Error error={errors.password.message} />}
            </View>

            <View style={styles.inputContainer}>
              <Controller
                control={control}
                name="passwordConfirmation"
                render={({ field: { value, ref, onChange } }) => (
                  <TextInput
                    placeholderTextColor="grey"
                    placeholder={t(
                      'auth.register.inputs.passwordConfirmation.placeholder',
                    )}
                    ref={ref}
                    style={styles.input}
                    secureTextEntry
                    onChangeText={onChange}
                    value={value}
                    onFocus={() => {
                      clearErrors('passwordConfirmation');
                      setServerError('');
                    }}
                    onBlur={() => {
                      trigger('passwordConfirmation');
                    }}
                  />
                )}
              />
              {errors.passwordConfirmation && (
                <Error error={errors.passwordConfirmation.message} />
              )}
            </View>
          </View>

          <View style={styles.buttonsWrapper}>
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              style={styles.button}>
              <Text style={styles.buttonText}>{t('buttons.submit')}</Text>
            </TouchableOpacity>
          </View>

          <DefaultButton
            title={t('auth.links.register')}
            text={t('auth.login.note')}
            path={PATHS.REGISTER}
          />
          <DefaultButton
            title={t('auth.links.login')}
            text={t('auth.register.note')}
            path={PATHS.LOGIN}
          />
        </KeyboardAvoidingView>
      </AuthLayout>
    </>
  );
};
