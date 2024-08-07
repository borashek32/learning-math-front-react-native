import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Logo } from '@components/logo/Logo';
import { SelectLang } from '@components/selectLang/SelectLang';

import { Props } from './Layout.types';

export const BaseLayout = ({ title, children }: Props) => {
  return (
    <View style={styles.container}>
      <SelectLang />
      <Logo />
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#01143d',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
