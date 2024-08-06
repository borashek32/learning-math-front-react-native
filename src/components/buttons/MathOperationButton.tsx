import { Text, TouchableOpacity, StyleSheet } from 'react-native';

import { MathOperationButtonProps } from './Buttons.types';

export const MathOperationButton = ({
  title,
  buttonCallback,
  disabled,
}: MathOperationButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled ? styles.disabledStyle : {}]}
      onPress={buttonCallback}
      disabled={disabled}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#61dafb',
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  disabledStyle: {
    backgroundColor: 'grey',
  },
});
