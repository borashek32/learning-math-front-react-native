import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Props } from "./Layout.types";
import { LogoSmall } from "../logo/LogoSmall";
import { selectUserEmail } from "../../redux/selectors/auth.selectors";
import { useAppSelector } from "../../hooks/useAppSelector";
import { PATHS } from "../../constants/paths";

export const AuthLayout = ({ title, children }: Props) => {
  const userEmail = useAppSelector(selectUserEmail);

  return (
    <>
      <View style={styles.logoSmallWrapper}>
        <LogoSmall path={userEmail ? PATHS.HOME : PATHS.MAIN}  />
      </View>
      <View style={styles.container}>
        {/* <View style={styles.contentWrapper}> */}
          <Text style={styles.title}>{title}</Text>
          { children }
        {/* </View> */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#01143d",
    flex: 1,
    justifyContent: "flex-start",
  },
  contentWrapper: {
    marginTop: 40,
  },
  logoSmallWrapper: {
    alignItems: "flex-start",
    backgroundColor: "#01143d",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingLeft: 10,
    paddingTop: 10
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center"
  },
});
