import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ModalLayout } from '@components/layouts/ModalLayout';

export const DotsLoader = () => {
  return (
    <ModalLayout>
      <View style={styles.dotsContainer}>
        <Text style={styles.dot}>.</Text>
        <Text style={styles.dot}>.</Text>
        <Text style={styles.dot}>.</Text>
      </View>
    </ModalLayout>
  );
};

const styles = StyleSheet.create({
  dot: {
    color: '#0d47a1',
    fontSize: 30,
    fontWeight: 'bold',
    marginHorizontal: 5,
  },
  dotsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
