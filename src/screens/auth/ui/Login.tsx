import React, { useState } from "react";
import { styles } from "../Auth.styles";
import { Controller, Resolver, SubmitHandler, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { RegisterType } from "../../../api/auth/auth.api.types";
import { useLoginMutation } from "../../../api/auth/auth.api";
import { AuthLayout } from "../../../components/layouts/AuthLayout";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../../redux/slices/auth.slice";
import { Loader } from "../../../components/loaders/CircularLoader";
import { convertFirstLetterToLowerCase } from "../../../utils/string/convertFirstLetterToLowerCase";
import { PATHS } from "../../../constants/paths";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { DefaultButton } from "../../../components/buttons/DefaultButton";
import { Error } from "../../../components/error/Error";
import { Checkbox } from "../../../components/checkbox/Checkbox";
import { NavigationProps } from "../../../types/commonTypes.types";


export const Login = ({ navigation }: NavigationProps) => {
  const [login, { isLoading }] = useLoginMutation();
  const [serverError, setServerError] = useState("");
  const dispatch = useDispatch();

  const { t, i18n } = useTranslation("translation");
  
  const formSchema = yup.object().shape({
    email: yup.string()
      .required(i18n.t("errors.required"))
      .matches(/^[\w-]+@([\w-\.]+)+[\w-\.]{2,4}$/, i18n.t("errors.mustBeEmail")),
    password: yup.string()
      .required(i18n.t("errors.required"))
      .matches(/^[A-Za-z]+$/i, i18n.t("errors.latinLetters"))
      .min(4, i18n.t("errors.min"))
      .max(164, i18n.t("errors.max")),
    rememberMe: yup.boolean()
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    clearErrors,
    trigger,
  } = useForm<RegisterType>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false
    },
    mode: "onChange",
    resolver: yupResolver(formSchema) as Resolver<RegisterType>,
  });

  const onSubmit: SubmitHandler<RegisterType> = (data: RegisterType) => {
    data = { ...data, email: convertFirstLetterToLowerCase(data.email) };
    setServerError("");
    login(data)
      .unwrap()
      .then(response => {
        if (response.user) {
          dispatch(setUserInfo(response.user));
          navigation.navigate(PATHS.HOME);
        }
      })
      .catch((e: any) => {
        console.log(e)
        if (e.status === "FETCH_ERROR") setServerError(t("errors.serverError"));
        if (e.data.message === "User password not correct") setServerError(t("errors.error400login"));
        if (e.data.message === "User not found") setServerError(t("errors.error401login"));
      });
  };

  return (
    <>
      {isLoading && <Loader />}
      <AuthLayout title={t("screens.login")}>
        <KeyboardAvoidingView behavior={"padding"} style={styles.container}>
          {serverError && <Error error={serverError} />}
          <View style={styles.inputsWrapper}>
            <View style={styles.inputContainer}>
              <Controller
                control={control}
                name="email"
                render={({ field: { ref, value, onChange } }) => (
                  <TextInput
                    placeholderTextColor={"grey"}
                    placeholder={i18n.t("auth.login.inputs.email.placeholder")}
                    style={styles.input}
                    onChangeText={onChange}
                    value={value}
                    ref={ref}
                    onFocus={() => {
                      clearErrors("email");
                      setServerError("");
                    }}
                    onBlur={() => {
                      trigger("email");
                    }}
                  />
                )}
              />
              {errors.email && <Error error={errors.email.message} />}
            </View>

            <View style={styles.inputContainer}>
              <Controller
                control={control}
                name="password"
                render={({ field: { ref, onChange, value } }) => (
                  <>
                    <TextInput
                      placeholderTextColor={"grey"}
                      placeholder={i18n.t("auth.login.inputs.password.placeholder")}
                      style={styles.input}
                      secureTextEntry
                      onChangeText={onChange}
                      ref={ref}
                      value={value}
                      onFocus={() => {
                        clearErrors("password");
                        setServerError("");
                      }}
                      onBlur={() => {
                        trigger("password");
                      }}
                    />
                  </>
                )}
              />
              {errors.password && <Error error={errors.password.message} />}
            </View>
          </View>

          <Controller
            control={control}
            name="rememberMe"
            render={({ field: { value, onChange } }) => (
              <Checkbox
                label={t("auth.login.inputs.rememberMe")}
                isChecked={!!value}
                onChange={onChange}
              />
            )}
          />

          <View style={styles.buttonsWrapper}>
            <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.button}>
              <Text style={styles.buttonText}>{i18n.t("buttons.login")}</Text>
            </TouchableOpacity>
          </View>

          <DefaultButton 
            title={t("screens.register")} 
            text={t("auth.login.note")}
            path={PATHS.REGISTER}
          />

          <DefaultButton 
            title={t("screens.forgotPassword")} 
            text={t("auth.forgotPassword.note")}
            path={PATHS.FORGOT_PASSWORD}
          />  
          </KeyboardAvoidingView>
        </AuthLayout>
      </>
  );
};

