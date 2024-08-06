import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PATHS } from '@constants/paths';

import { DefaultButtonProps } from './Buttons.types';

export const NavLinkButton: React.FC<DefaultButtonProps> = ({
  title,
  path,
  text,
  onPress,
}: DefaultButtonProps) => {
  const buttonStyles = [
    styles.buttonTextSmall,
    path === PATHS.LOGOUT
      ? (styles.button, styles.buttonBorder, styles.buttonRed)
      : {},
  ];
  // : path === PATHS.MATH_OPERATIONS
  //   ? [styles.buttonTextSmall]
  //   : path === PATHS.PROFILE
  //     ? [styles.buttonTextSmall]
  //     : path === PATHS.HOME
  //       ? [styles.buttonTextSmall]
  //       : path === PATHS.MAIN
  //         ? [styles.buttonTextSmall]
  //         : path === PATHS.PRE_SCHOOL
  //           ? [styles.buttonTextSmall]
  //           : path === PATHS.YOUR_SCORE
  //             ? [styles.buttonTextSmall]
  //             : path === PATHS.INSTRUCTIONS
  //               ? [styles.buttonTextSmall]
  //               : [styles.button, styles.buttonBorder];

  return (
    <View style={styles.noteWrapper}>
      {text && <Text style={styles.note}>{text}</Text>}
      <TouchableOpacity style={buttonStyles} onPress={onPress}>
        <Text style={styles.buttonTextSmall}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#0D6EFD',
    borderRadius: 4,
    justifyContent: 'center',
    paddingHorizontal: 13,
    paddingVertical: 6,
  },
  buttonBorder: {
    borderColor: '#000',
    borderWidth: 1,
  },
  buttonLink: {
    alignItems: 'center',
    backgroundColor: 'inherit',
    justifyContent: 'center',
  },
  buttonRed: {
    backgroundColor: '#fb6161',
  },
  buttonTextSmall: {
    color: '#fff',
    fontSize: 14,
  },
  note: {
    color: '#dfdfdf',
    fontSize: 14,
    marginBottom: 10,
    marginTop: 30,
    textAlign: 'center',
  },
  noteWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
  },
});
