import React, { useCallback, useEffect, useRef } from 'react';
import { styles } from '../../styles/styles';
import { TextInput, View } from 'react-native';
import { Props } from './Input.types';

export const ResultInput: React.FC<Props> = ({ value, onChange, type }) => {
  const inputRef = useRef<TextInput>(null)

  const handleSubmit = () => {
    inputRef.current?.focus();
  }

  const handleChange = (text: string) => {
    onChange(text)
  }

  return (
    <View style={styles.firstDigit}>
      <TextInput
        blurOnSubmit={false}
        autoFocus={true}
        onChangeText={handleChange}
        value={value}
        keyboardType={'numbers-and-punctuation'}
        style={[styles.digitsText, styles.digitInput]}
        onSubmitEditing={handleSubmit}
      />
    </View>
  );
};
