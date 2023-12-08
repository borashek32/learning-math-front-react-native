import React from 'react'
import { styles } from '../../../styles/styles'
import { Props } from './types'
import { Button, TouchableOpacity } from 'react-native'

export const DefaultButton: React.FC<Props> = ({ title, onPress }) => {

  return (
    <TouchableOpacity style={[styles.generateButton, styles.buttonBorder]}>
      <Button 
        title={title}
        onPress={onPress} 
      />
    </TouchableOpacity>
  )
}