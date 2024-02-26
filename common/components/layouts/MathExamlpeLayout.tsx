import { StyleSheet, View } from "react-native"
import { Props } from './Layout.types'

export const MathExampleLayout = ({ children }: Props) => {

  return (
    <View style={styles.containerMathOperation}>{children}</View>
  )
}

export const styles = StyleSheet.create({
  containerMathOperation: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: "center",
    gap: 10,
  },
})