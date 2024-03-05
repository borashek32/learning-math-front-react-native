import React, { useCallback, useEffect, useRef } from 'react';
import { styles } from '../../styles/styles';
import { TextInput, View } from 'react-native';
import { Props } from './types';

export const ResultInput: React.FC<Props> = ({ value, onChange, type }) => {
  const autoFocusRef = useRef<TextInput>(null);

  useEffect(() => {
    if (autoFocusRef.current) {
      autoFocusRef.current.focus();
    }
  }, []);

  const handleChange = useCallback((text: string) => {
    onChange(text);
  }, [onChange]);

  return (
    <View style={styles.firstDigit}>
      <TextInput
        onChangeText={handleChange}
        value={value}
        keyboardType={type}
        style={[styles.digitsText, styles.digitInput]}
        ref={autoFocusRef}
      />
    </View>
  );
};
