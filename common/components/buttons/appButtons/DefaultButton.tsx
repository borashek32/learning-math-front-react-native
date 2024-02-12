import React from 'react'
import { styles } from '../../../styles/styles'
import { Props } from './DefaultButton.types'
import { Button, TouchableOpacity } from 'react-native'

export const DefaultButton: React.FC<Props> = ({ title, onPress }: Props) => {

  return (
    <TouchableOpacity style={[styles.generateButton, styles.buttonBorder]}>
      <Button 
        title={title}
        onPress={onPress}
        color={'#fff'}
      />
    </TouchableOpacity>
  )
}