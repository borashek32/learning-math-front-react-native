import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Props } from "./Layout.types";
import { Logo } from "../logo/Logo";
import { SelectLang } from "../selectLang/SelectLang";

export const BaseLayout = ({ title, children }: Props) => {

  return (
    <View style={styles.container}>
      <SelectLang />
      <Logo />
      <Text style={styles.title}>{title}</Text>
      { children }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#01143d",
    flex: 1,
    justifyContent: "center"
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center"
  },
});
