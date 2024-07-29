import React from "react";
import { Text, StyleSheet, ScrollView, View } from "react-native";
import { Props } from "./Layout.types";
import { Nav } from "../nav/Nav";

export const AppLayout = ({ title, children }: Props) => {

  return (
    <ScrollView 
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps={"handled"}
    >
      <Nav />
      <View style={styles.contentWrapper}>
        <Text style={styles.title}>{title}</Text>
        { children }
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#01143d",
    flexGrow: 1,
    flex: 1,
    justifyContent: "flex-start",
    paddingBottom: 40,
    width: "100%",
  },
  contentWrapper: {
    flex: 1,
    marginTop: 20,
    width: 260
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center"
  },
});
