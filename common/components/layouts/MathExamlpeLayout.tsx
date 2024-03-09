import { StyleSheet, TouchableOpacity, View } from "react-native"
import { Props } from './Layout.types'

export const MathExampleLayout = ({ title, onPress, children }: Props) => {

  return (
    <TouchableOpacity onPress={onPress} style={styles.containerMathOperation}>
      {children}
    </TouchableOpacity>
  )
}

export const styles = StyleSheet.create({
  containerMathOperation: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: "center",
    gap: 4,
  },
})