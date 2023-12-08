import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

export const Home = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <Button
        title="Calculate summ"
        onPress={() => navigation.navigate('Summ')}
      />
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
