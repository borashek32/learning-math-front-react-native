import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { useTranslation } from 'react-i18next';

import { DefaultButtonProps } from './Buttons.types';

export const BlueButton: FC<DefaultButtonProps> = ({
  title,
  disabled,
  onPress,
  source,
  avatarName,
}: DefaultButtonProps) => {
  const { t } = useTranslation();

  const buttonStyles = [
    styles.button,
    disabled && styles.buttonDisabled,
    title === t('buttons.logout') && styles.buttonLogout,
    (title === t('profile.changeAvatar.button') ||
      title === t('links.back') ||
      title === t('modal.button')) &&
      styles.buttonSmall,
  ] as ViewStyle[];

  const buttonTextStyle = [
    styles.buttonText,
    title === t('buttons.logout') && styles.buttonTextWhite,
  ] as ViewStyle[];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={disabled ? undefined : onPress}
      disabled={disabled}>
      <Text style={buttonTextStyle}>{title}</Text>
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
    width: 260,
  },
  buttonDisabled: {
    backgroundColor: 'grey',
  },
  buttonLogout: {
    backgroundColor: '#fb6161',
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonTextWhite: {
    color: '#fff',
  },
  buttonSmall: {
    width: 100,
  },
});
