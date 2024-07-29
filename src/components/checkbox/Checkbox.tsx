import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { Props } from './Checkbox.types';

export const Checkbox = ({ label, isChecked, onChange }: Props) => {
  const toggleCheckbox = () => {
    onChange(!isChecked);
  };

  return (
    <TouchableOpacity onPress={toggleCheckbox} style={styles.container}>
      <View style={styles.checkbox}>
        {isChecked && <View style={styles.checkmark} />}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    alignItems: 'center',
    borderColor: '#fff',
    borderRadius: 3,
    borderWidth: 1,
    height: 20,
    justifyContent: 'center',
    width: 20,
  },
  checked: {
    backgroundColor: 'blue',
  },
  checkmark: {
    backgroundColor: '#fff',
    borderRadius: 2,
    height: 10,
    width: 10,
  },
  container: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'flex-start',
  },
  label: {
    color: '#fff',
  },
});
