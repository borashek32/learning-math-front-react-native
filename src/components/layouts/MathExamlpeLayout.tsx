import { StyleSheet, TouchableOpacity } from "react-native";
import { Props } from "./Layout.types";

export const MathExampleLayout = ({ title, onPress, children }: Props) => {

  return (
    <TouchableOpacity onPress={onPress} style={styles.containerMathOperation}>
      {children}
    </TouchableOpacity>
  );
};

export const styles = StyleSheet.create({
  containerMathOperation: {
    alignItems: "center",
    flexDirection: "row",
    gap: 4,
    justifyContent: "center",
  },
});