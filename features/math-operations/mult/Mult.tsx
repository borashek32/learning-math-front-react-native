import React from 'react';
import { Text, View } from 'react-native';
import { GoHome } from '../../../common/components/buttons/goHomeButton/goHome';
import { styles } from '../../../common/styles/styles'
import { DefaultButton } from '../../../common/components/buttons/appButtons/DefaultButton';

export const Mult = ({ navigation }) => {
  const digits: Array<number> = [2, 3, 4, 5, 6, 7, 8, 9]

  return (
    <View style={styles.container}>
      <GoHome navigation={navigation} />

      <Text style={styles.title}>Multiplication table</Text>
      <DefaultButton
        title={'Multiplication check'}
        onPress={() => navigation.navigate('multCheck')}
      />
      <View style={styles.container}>
        {digits.map(digit => {
          return (
            <DefaultButton
              key={digit}
              title={digit.toString()}
              onPress={() => navigation.navigate('multDigit', { digit })}
            />
          )
        })}
      </View>
    </View>
  );
}