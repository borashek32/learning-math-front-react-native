import { View, Text } from "react-native"
import { styles } from "../../styles/styles"
import { Props } from "./types"

export const Digit = (props: Props) => {

  return (
    // <View style={styles.firstDigit}>
      <Text style={styles.digitsText}>{props.title}</Text>
    // </View>
  )
}