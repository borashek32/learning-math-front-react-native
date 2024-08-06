import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';

import { DefaultButtonProps } from './Buttons.types';

export const BlueButton: FC<DefaultButtonProps> = ({
  title,
  disabled,
  onPress,
  source,
  avatarName,
}: DefaultButtonProps) => {
  const buttonStyles = [
    styles.button,
    disabled && styles.buttonDisabled,
  ] as ViewStyle[];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={disabled ? undefined : onPress}
      disabled={disabled}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#61dafb',
    borderRadius: 5,
    justifyContent: 'center',
    marginBottom: 10,
    padding: 10,
  },
  buttonDisabled: {
    backgroundColor: 'grey',
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
