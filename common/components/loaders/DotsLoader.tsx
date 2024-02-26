import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { ModalLayout } from '../layouts/ModalLayout'

export const DotsLoader = () => {
  return (
    <ModalLayout>
      <View style={styles.dotsContainer}>
        <Text style={styles.dot}>.</Text>
        <Text style={styles.dot}>.</Text>
        <Text style={styles.dot}>.</Text>
      </View>
    </ModalLayout>
  )
}

const styles = StyleSheet.create({
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
