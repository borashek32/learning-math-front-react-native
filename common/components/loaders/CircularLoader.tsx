import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native';

export const Loader = () => {
  return (
    <View style={styles.loaderWrapper}>
      <ActivityIndicator size="large" color="#0d47a1" />
    </View>
  );
};

const styles = StyleSheet.create({
  loaderWrapper: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000104b8'
  },
})