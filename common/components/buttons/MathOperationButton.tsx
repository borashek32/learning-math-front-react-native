import { Text, TouchableOpacity } from "react-native"
import { StyleSheet } from "react-native"
import { MathOperationButtonProps } from './Buttons.types'

export const MathOperationButton = ({ title, buttonCallback }: MathOperationButtonProps) => {

  return (
    <TouchableOpacity style={styles.button} onPress={buttonCallback}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  )
}

export const styles = StyleSheet.create({
  button: {
    backgroundColor: '#61dafb',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
})