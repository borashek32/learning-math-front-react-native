import { Controller, Resolver, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useChangeEmailMutation } from "../../../api/auth/auth.api";
import { Loader } from "../../../components/loaders/CircularLoader";
import { Modal } from "../../../components/modal/Modal";
import { useTranslation } from "react-i18next";
import { PATHS } from "../../../constants/paths";
import { KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "../Auth.styles";
import { AppLayout } from "../../../components/layouts/AppLayout";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { selectUserId } from "../../../redux/selectors/auth.selectors";
import { NewEmailType } from "../../../api/auth/auth.api.types";
import { Error } from "../../../components/error/Error";
import { convertFirstLetterToLowerCase } from "../../../utils/string/convertFirstLetterToLowerCase";
import { NavigationProps } from "../../../types/commonTypes.types";

interface IFormProps {
  newEmail: string
}

export const ChangeEmail = ({ navigation }: NavigationProps) => {
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(true);
  const [serverError, setServerError] = useState("");
  const [changeEmail, { isLoading } ] = useChangeEmailMutation();
  const userId = useAppSelector(selectUserId);

  const { t, i18n } = useTranslation("translation");

  const formSchema = yup.object().shape({
    newEmail: yup.string()
      .required(i18n.t("errors.required"))
      .matches(/^[\w-\.]+@([\w-\.]+)+[\w-]{2,4}$/, i18n.t("errors.mustBeEmail")),
  });

  const {
    handleSubmit, 
    formState: { errors },
    clearErrors,
    reset,
    trigger,
    control,
  } = useForm<IFormProps>({
    mode: "onChange",
    defaultValues: {
      newEmail: "",
    },
    resolver: yupResolver(formSchema) as Resolver<IFormProps>,
  });

  const onSubmit: SubmitHandler<any> = (data: NewEmailType) => { 
    data = { ...data, userId, newEmail: convertFirstLetterToLowerCase(data.newEmail) };
    if (!data) {
      setServerError("Some error occured123");
    } else {
      setServerError("");
      changeEmail(data)
        .unwrap()
        .then(() => {
          setSuccess(true);
          reset();
        })
        .catch(e => {
          if (e.status === "FETCH_ERROR") setServerError(t("errors.serverError"));
        });
    }
  };
  
  return (
    <>
      {isLoading && <Loader />}
      {success && 
        <Modal
          text={t("modal.changePasswordSuccess")}
          open={open}
          setOpen={setOpen}
          outlinedButton={true}
          buttonName={t("auth.links.login")}
          buttonCallback={() => navigation.navigate(PATHS.LOGIN)}
          buttonBack={false}
        />
      }
      <AppLayout title={t("screens.changeEmail")}>
        <KeyboardAvoidingView behavior={"padding"} style={styles.container}>
          {serverError && <Error error={serverError} />}
          <View style={styles.inputsWrapper}> 
            <View style={styles.inputContainer}>
              <Controller
                control={control}
                name="newEmail"
                render={({ field: { ref, onChange, value } }) => (
                  <TextInput
                    placeholderTextColor={"grey"}
                    placeholder={t("profile.changeEmail.inputs.oldPassword.placeholder")}
                    style={styles.input}
                    onChangeText={onChange}
                    ref={ref}
                    value={value}
                    onFocus={() => {
                      clearErrors("newEmail");
                      setServerError("");
                    }}
                    onBlur={() => {
                      trigger("newEmail");
                    }}
                  />
                )}
              />
              {errors.newEmail && <Error error={errors.newEmail.message} />}
            </View>
          </View>

          <View style={styles.buttonsWrapper}>
            <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.button}>
              <Text style={styles.buttonText}>{t("buttons.submit")}</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </AppLayout>
    </>
  );
};