import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Props } from './Layout.types'
import { Logo } from '../logo/Logo';
import { SelectLang } from '../selectLang/SelectLang'

export const BaseLayout = ({ title, children }: Props) => {

  return (
    <View style={styles.container}>
      <SelectLang />
      <Logo />
      <Text style={styles.title}>{title}</Text>
      { children }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#01143d'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center'
  },
})
