import { StyleSheet, Text } from "react-native";
import { Props } from "./Error.types";
import { FC } from "react";

export const Error: FC<Props> = ({ error }: Props) => {

  return (
    <Text style={styles.error}>{error}</Text>
  );
};

const styles = StyleSheet.create({
  error: {
    color: "red",
    position: "absolute",
    top: -20
  },
});