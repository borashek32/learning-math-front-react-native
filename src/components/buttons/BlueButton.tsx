import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { DefaultButtonProps } from "./Buttons.types";
import { useNavigation } from "@react-navigation/native";
import { FC } from "react";

export const BlueButton: FC<DefaultButtonProps> = ({ 
  title, 
  path,
  text,
  onPress,
  onPressWithValue,
  source,
  avatarName,
}: DefaultButtonProps) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (path) {
      navigation.navigate(path as never);
    } else if (onPressWithValue) {
      onPressWithValue(source, avatarName);
    } else if (onPress) {
      onPress();
    }
  };

  return (
    <TouchableOpacity
      style={styles.button} 
      onPress={handlePress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#61dafb",
    borderRadius: 5,
    justifyContent: "center",
    marginBottom: 10,
    padding: 10,
  },
  buttonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
