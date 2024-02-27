import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Props } from './Checkbox.types'

export const Checkbox = ({ label, isChecked, onChange }: Props) => {
  const toggleCheckbox = () => {
    onChange(!isChecked)
  }

  return (
    <TouchableOpacity onPress={toggleCheckbox} style={styles.container}>
      <View style={styles.checkbox}>
        {isChecked && <View style={styles.checkmark} />}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: 'blue',
  },
  checkmark: {
    width: 10,
    height: 10,
    backgroundColor: '#fff',
    borderRadius: 2,
  },
  label: {
    color: '#fff'
  }
})