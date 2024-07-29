import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { DefaultButtonProps } from './Buttons.types'
import { PATHS } from '../../constants/paths'

export const NavLinkButton: React.FC<DefaultButtonProps> = ({ 
  title, 
  path,
  text,
  onPress,
}: DefaultButtonProps) => {
  const buttonStyles = path === PATHS.LOGOUT
    ? [styles.button, styles.buttonBorder, styles.buttonRed]
    : path === PATHS.MATH_OPERATIONS
    ? [styles.buttonTextSmall]
    : path === PATHS.PROFILE
    ? [styles.buttonTextSmall]
    : path === PATHS.HOME
    ? [styles.buttonTextSmall]
    : path === PATHS.MAIN
    ? [styles.buttonTextSmall]
    : path === PATHS.PRE_SCHOOL
    ? [styles.buttonTextSmall]
    : path === PATHS.YOUR_SCORE
    ? [styles.buttonTextSmall]
    : path === PATHS.INSTRUCTIONS
    ? [styles.buttonTextSmall]
    : [styles.button, styles.buttonBorder]

  return (
    <View style={styles.noteWrapper}>
      {text && <Text style={styles.note}>{text}</Text>}
      <TouchableOpacity 
        style={buttonStyles} 
        onPress={onPress}
        >
        <Text style={styles.buttonTextSmall}>{title}</Text>
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
  },
  buttonLink: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'inherit',
  },
  buttonBorder: {
    borderWidth: 1,
    borderColor: '#000',
  },
  buttonRed: {
    backgroundColor: "#fb6161",
  },
  buttonTextSmall: {
    fontSize: 14,
    color: '#fff',
  },
})