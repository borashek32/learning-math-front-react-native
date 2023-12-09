import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, View } from 'react-native';
import { styles } from './../common/styles/styles';

export const Home = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <Button
        title="Calculate summ"
        onPress={() => navigation.navigate('Summ')}
      />
      <Button
        title="Difference"
        onPress={() => navigation.navigate('Diff')}
      />
      <StatusBar style="auto" />
    </View>
  )
}