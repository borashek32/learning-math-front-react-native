import React, { FC } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';

import { DefaultButtonProps } from './Buttons.types';

export const BlueButton: FC<DefaultButtonProps> = ({
  title,
  path,
  disabled,
  onPress,
  onPressWithValue,
  source,
  avatarName,
}: DefaultButtonProps) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (path) {
      navigation.navigate(path as never);
    } else if (onPressWithValue) {
      if (source && avatarName) {
        onPressWithValue(source, avatarName);
      }
    } else if (onPress) {
      onPress();
    }
  };

  const buttonStyles = [
    styles.button,
    disabled && styles.buttonDisabled,
  ] as ViewStyle[];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={disabled ? undefined : handlePress}
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
