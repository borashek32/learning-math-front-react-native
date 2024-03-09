import { Text } from "react-native"
import { Props } from "./Digit.types"
import { StyleSheet } from 'react-native'
import { FC } from "react"

export const Digit: FC<Props> = ({ title, italic }: Props) => {

  return <Text style={[styles.digitsText, italic && styles.italicText]}>{title}</Text>
}

export const styles = StyleSheet.create({
  digitsText: {
    fontSize: 34,
    color: '#fff'
  },
  italicText: {
    color: 'grey',
    fontStyle: 'italic'
  },
})