import { StyleSheet, Text } from 'react-native';

import { Props } from './AppText.types';

export const AppText = ({ text }: Props) => {
  return <Text style={styles.text}>{text}</Text>;
};

const styles = StyleSheet.create({
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
  },
});
