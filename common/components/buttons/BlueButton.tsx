import { useTranslation } from "react-i18next"
import { StyleSheet, Text, TouchableOpacity } from "react-native"
import { DefaultButtonProps } from "./Buttons.types"
import { useNavigation } from "@react-navigation/native"

export const BlueButton: React.FC<DefaultButtonProps> = ({ 
  title, 
  path,
  text,
  onPress,
}: DefaultButtonProps) => {
  const navigation = useNavigation()
  const { t } = useTranslation('translation')

  return (
    <TouchableOpacity 
      style={styles.button} 
      onPress={path ? () => navigation.navigate(path) : onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#61dafb',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
})