import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, View } from 'react-native';
import { styles } from '../../../common/styles/styles';

export const Home = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <Button
        title="Summ"
        onPress={() => navigation.navigate('summ')}
      />
      <Button
        title="Difference"
        onPress={() => navigation.navigate('diff')}
      />
      <Button
        title="Multiplication table"
        onPress={() => navigation.navigate('mult')}
      />
      <StatusBar style="auto" />
    </View>
  )
}