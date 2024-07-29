import { Text } from "react-native";
import { Props } from "./AppText.types";
import { StyleSheet } from "react-native";
import { FC } from "react";

export const AppText: FC<Props> = ({ desc, onPress,link }: Props) => {

  return <Text style={styles.digitsText} onPress={onPress}>{desc}</Text>;
};

export const styles = StyleSheet.create({
  digitsText: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 4,
    marginTop: 4,
    textAlign: "center",
    textDecorationColor: "#fff",
    textDecorationLine: "underline",
  },
});