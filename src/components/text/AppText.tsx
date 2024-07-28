import { Text } from "react-native"
import { Props } from "./AppText.types"
import { StyleSheet } from 'react-native'
import { FC } from "react"

export const AppText: FC<Props> = ({ desc, onPress,link }: Props) => {

  return <Text style={styles.digitsText} onPress={onPress}>{desc}</Text>
}

export const styles = StyleSheet.create({
  digitsText: {
    fontSize: 24,
    textDecorationColor: '#fff',
    textDecorationLine: "underline",
    color: '#fff',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 4,
  },
})