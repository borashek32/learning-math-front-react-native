import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Props } from './BaseLayout.types'
import { Nav } from '../nav/Nav'

export const AppLayout = ({ title, children }: Props) => {

  return (
    <View style={styles.container}>
      <Nav />
      <View style={styles.contentWrapper}>
        <Text style={styles.title}>{title}</Text>
        { children }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#01143d',
  },
  contentWrapper: {
    marginTop: 40
  },
  title: {
    marginBottom: 30,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center'
  },
})
