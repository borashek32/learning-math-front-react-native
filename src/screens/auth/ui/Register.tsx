import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Controller, Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useSignUpMutation } from '../../../api/auth/auth.api';
import { RegisterType } from '../../../api/auth/auth.api.types';
import { Loader } from '../../../components/loaders/CircularLoader';
import { AuthLayout } from '../../../components/layouts/AuthLayout';
import { convertFirstLetterToLowerCase } from '../../../utils/string/convertFirstLetterToLowerCase';
import { PATHS } from '../../../constants/paths';
import { DefaultButton } from '../../../components/buttons/DefaultButton';
import { styles } from '../Auth.styles';
import { Modal } from '../../../components/modal/Modal';
import { NavigationProps } from '../../../types/commonTypes.types';

interface IFormProps {
  email: string;
  password: string;
  passwordConfirmation: string;
}

export const Register = ({ navigation }: NavigationProps) => {
  const [signUp, { isLoading }] = useSignUpMutation();
  const [serverError, setServerError] = useState('');
  const [open, setOpen] = useState(false);

  const { t, i18n } = useTranslation('translation');

  const formSchema = yup.object().shape({
    email: yup
      .string()
      .required(i18n.t('errors.required'))
      .matches(/^[\w-]+@([\w-]+)+[\w-]{2,4}$/, i18n.t('errors.mustBeEmail')),
    password: yup
      .string()
      .required(i18n.t('errors.required'))
      .min(4, i18n.t('errors.min'))
      .max(164, i18n.t('errors.max')),
    passwordConfirmation: yup
      .string()
      .required(i18n.t('errors.required'))
      .min(4, i18n.t('errors.min'))
      .max(164, i18n.t('errors.max'))
      .oneOf([yup.ref('password'), ''], i18n.t('errors.notMatch')),
  });

  const {
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
    control,
    trigger,
    setValue,
    getValues,
  } = useForm<IFormProps>({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
      passwordConfirmation: '',
    },
    resolver: yupResolver(formSchema) as Resolver<IFormProps>,
  });

  useEffect(() => {
    if (getValues('password') && getValues('passwordConfirmation')) {
      setValue('password', '');
      setValue('passwordConfirmation', '');
    }
  }, [getValues, setValue]);

  const onSubmit: SubmitHandler<RegisterType> = (data: RegisterType) => {
    clearErrors();
    data = { ...data, email: convertFirstLetterToLowerCase(data.email) };
    setServerError('');
    signUp(data)
      .unwrap()
      .then(() => {
        reset();
        setOpen(true);
      })
      .catch(e => {
        if (e.status === 'FETCH_ERROR')
          setServerError(i18n.t('errors.serverError'));
        if (e.status === 400) setServerError(i18n.t('errors.error400register'));
      });
  };

  return (
    <>
      {isLoading && <Loader />}
      {open && (
        <Modal
          text={t('modal.registrationSuccess')}
          open={open}
          setOpen={setOpen}
          outlinedButton
          buttonName={t('auth.links.login')}
          buttonCallback={() => navigation.navigate(PATHS.LOGIN)}
          buttonBack
        />
      )}
      <AuthLayout title={i18n.t('screens.register')}>
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          {serverError && <Text style={styles.error}>{serverError}</Text>}
          <View style={styles.inputsWrapper}>
            <View style={styles.inputContainer}>
              <Controller
                control={control}
                name="email"
                render={({ field: { ref, value, onChange } }) => (
                  <TextInput
                    placeholderTextColor="grey"
                    placeholder={i18n.t('auth.login.inputs.email.placeholder')}
                    style={styles.input}
                    onChangeText={onChange}
                    value={value}
                    ref={ref}
                    onFocus={() => {
                      clearErrors('email');
                      setServerError('');
                    }}
                    onBlur={() => {
                      trigger('email');
                    }}
                  />
                )}
              />
              {errors.email && (
                <Text style={styles.error}>{errors.email.message}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Controller
                control={control}
                name="password"
                render={({ field: { ref, onChange, value } }) => (
                  <TextInput
                    placeholderTextColor="grey"
                    placeholder={i18n.t(
                      'auth.login.inputs.password.placeholder',
                    )}
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
              {errors.password && (
                <Text style={styles.error}>{errors.password.message}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Controller
                control={control}
                name="passwordConfirmation"
                render={({ field: { value, ref, onChange } }) => (
                  <TextInput
                    placeholderTextColor="grey"
                    placeholder={i18n.t(
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
                <Text style={styles.error}>
                  {errors.passwordConfirmation.message}
                </Text>
              )}
            </View>
          </View>

          <View style={styles.buttonsWrapper}>
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              style={styles.button}>
              <Text style={styles.buttonText}>
                {i18n.t('buttons.register')}
              </Text>
            </TouchableOpacity>
          </View>

          <DefaultButton
            title={t('screens.login')}
            text={t('auth.register.note')}
            path={PATHS.LOGIN}
          />
        </KeyboardAvoidingView>
      </AuthLayout>
    </>
  );
};
