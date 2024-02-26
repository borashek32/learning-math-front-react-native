import { StyleSheet, Text } from "react-native"
import { Props } from "./Error.type"

export const Error = ({ error }: Props) => {

  return (
    <Text style={styles.error}>{error}</Text>
  )
}

const styles = StyleSheet.create({
  error: {
    position: 'absolute',
    top: -20,
    color: 'red'
  },
})