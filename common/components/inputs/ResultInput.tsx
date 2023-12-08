import React from 'react'
import { styles } from '../../styles/styles'
import { TextInput, View } from 'react-native'
import { Props } from './types'

export const ResultInput: React.FC<Props> = ({ value, onChange, type }) => {

  return (
    <View style={styles.firstDigit}>
      <TextInput 
        onChangeText={(value) => onChange(value)}
        value={value}
        keyboardType={type}
        style={[styles.digitsText, styles.digitInput]}
      />
    </View>
  )
}