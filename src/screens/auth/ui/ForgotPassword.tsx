import { Controller, Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingView, Text, TextInput, View } from 'react-native';
import { BlueButton } from 'components/buttons/BlueButton';

import { useEmailSentMutation } from '../../../api/auth/auth.api';
import { Modal } from '../../../components/modal/Modal';
import { AuthLayout } from '../../../components/layouts/AuthLayout';
import { styles } from '../Auth.styles';
import { Loader } from '../../../components/loaders/CircularLoader';
import { convertFirstLetterToLowerCase } from '../../../utils/string/convertFirstLetterToLowerCase';
import { Error } from '../../../components/error/Error';
import { ForgotPasswordType } from '../../../api/auth/auth.api.types';

export const ForgotPassword = () => {
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const [emailSent, { isLoading }] = useEmailSentMutation();
  const [serverError, setServerError] = useState('');
  const [open, setOpen] = useState(true);

  const { t } = useTranslation();

  const formSchema = yup.object().shape({
    email: yup
      .string()
      .required(t('errors.required'))
      .matches(/^[\w-.]+@([\w-.]+)+[\w-.]{2,4}$/, t('errors.mustBeEmail')),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    trigger,
    clearErrors,
  } = useForm<ForgotPasswordType>({
    defaultValues: {
      email: '',
    },
    mode: 'onChange',
    resolver: yupResolver(formSchema) as Resolver<ForgotPasswordType>,
  });

  const onSubmit: SubmitHandler<ForgotPasswordType> = (
    data: ForgotPasswordType,
  ) => {
    data = { ...data, email: convertFirstLetterToLowerCase(data.email) };
    emailSent(data)
      .unwrap()
      .then(() => {
        setSuccess(true);
        setEmail(data.email);
        reset();
      })
      .catch(error => {
        if (error.status === 'FETCH_ERROR')
          setServerError(t('errors.serverError'));
      });
  };

  return (
    <>
      {isLoading && <Loader />}
      {success && (
        <Modal
          text={`Please, check ${email}`}
          open={open}
          setOpen={setOpen}
          outlinedButton
          buttonBack={false}
        />
      )}
      <AuthLayout title={t('screens.forgotPassword')}>
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          {serverError && <Error error={serverError} />}
          <View style={styles.inputsWrapper}>
            <View style={styles.inputContainer}>
              <Controller
                control={control}
                name="email"
                render={({ field: { ref, value, onChange } }) => (
                  <TextInput
                    placeholderTextColor="grey"
                    placeholder={t('auth.login.inputs.email.placeholder')}
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
          </View>

          <View style={styles.buttonsWrapper}>
            <BlueButton
              onPress={handleSubmit(onSubmit)}
              title={t('buttons.submit')}
            />
          </View>
        </KeyboardAvoidingView>
      </AuthLayout>
    </>
  );
};
