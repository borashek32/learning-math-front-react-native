import React, { useRef } from 'react';
import { TextInput, View } from 'react-native';

import { styles } from '../../styles/styles';
import { Props } from './Input.types';

export const ResultInput: React.FC<Props> = ({ value, onChange }) => {
  const inputRef = useRef<TextInput>(null);

  const handleSubmit = () => {
    inputRef.current?.focus();
  };

  const handleChange = (text: string) => {
    onChange(text);
  };

  return (
    <View style={styles.firstDigit}>
      <TextInput
        blurOnSubmit={false}
        autoFocus
        onChangeText={handleChange}
        value={value}
        keyboardType="numbers-and-punctuation"
        style={[styles.digitsText, styles.digitInput]}
        onSubmitEditing={handleSubmit}
      />
    </View>
  );
};
