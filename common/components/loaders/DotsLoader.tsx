import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export const DotsLoader = () => {
  return (
    <View style={styles.loaderWrapper}>
      <View style={styles.dotsContainer}>
        <Text style={styles.dot}>.</Text>
        <Text style={styles.dot}>.</Text>
        <Text style={styles.dot}>.</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  loaderWrapper: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000104b8',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    color: '#0d47a1',
    fontWeight: 'bold',
    fontSize: 30,
    marginHorizontal: 5, 
  },
})
