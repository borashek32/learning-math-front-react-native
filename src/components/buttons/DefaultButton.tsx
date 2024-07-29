import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { DefaultButtonProps } from './Buttons.types';
import { PATHS } from '@constants/paths';

export const DefaultButton: React.FC<DefaultButtonProps> = ({
  title,
  path,
  text,
  onPress,
}: DefaultButtonProps) => {
  const navigation = useNavigation();

  const buttonStyles =
    path === PATHS.LOGOUT
      ? [styles.button, styles.buttonBorder, styles.buttonRed]
      : path === PATHS.MATH_OPERATIONS
        ? [styles.buttonLink]
        : path === PATHS.PRE_SCHOOL
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
                          : [styles.button, styles.buttonBorder];

  return (
    <View style={styles.noteWrapper}>
      {text && <Text style={styles.note}>{text}</Text>}
      <TouchableOpacity
        style={buttonStyles}
        onPress={path ? () => navigation.navigate(path as never) : onPress}>
        <Text style={text ? styles.buttonTextSmall : styles.buttonText}>
          {title}
        </Text>
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
  buttonText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
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
