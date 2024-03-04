import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { DefaultButtonProps } from './Buttons.types'
import { PATHS } from '../../constants/paths'
import { useNavigation } from '@react-navigation/native'

export const DefaultButton: React.FC<DefaultButtonProps> = ({ 
  title, 
  path,
  text,
  onPress,
}: DefaultButtonProps) => {
  const navigation = useNavigation()

  const buttonStyles = path === PATHS.LOGOUT
    ? [styles.button, styles.buttonBorder, styles.buttonRed]
    : path === PATHS.MATH_OPERATIONS
    ? [styles.buttonLink]
    : path === PATHS.PROFILE
    ? [styles.buttonLink]
    : path === PATHS.HOME
    ? [styles.buttonLink]
    : path === PATHS.YOUR_SCORE
    ? [styles.buttonLink]
    : path === PATHS.INSTRUCTIONS
    ? [styles.buttonLink]
    : path === PATHS.FORGOT_PASSWORD
    ? [styles.buttonLink]
    : path === PATHS.CHANGE_EMAIL
    ? [styles.buttonLink]
    : path === PATHS.CHANGE_PASSWORD
    ? [styles.buttonLink]
    : path === PATHS.CHANGE_AVATAR
    ? [styles.buttonLink]
    : [styles.button, styles.buttonBorder]

  return (
    <View style={styles.noteWrapper}>
      {text && <Text style={styles.note}>{text}</Text>}
      <TouchableOpacity style={buttonStyles} onPress={
        path 
          ? () => navigation.navigate(path)
          : onPress
        }>
        <Text style={text ? styles.buttonTextSmall : styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  )
}

export const styles = StyleSheet.create({
  noteWrapper: {
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  note: {
    color: '#dfdfdf',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 10
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 13,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: '#0D6EFD',
    border: 'none',
  },
  buttonLink: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'inherit',
    border: 'none',
  },
  buttonBorder: {
    borderWidth: 1,
    borderColor: '#000',
  },
  buttonRed: {
    backgroundColor: "#fb6161",
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center'
  },
  buttonTextSmall: {
    fontSize: 14,
    color: '#fff',
  },
})