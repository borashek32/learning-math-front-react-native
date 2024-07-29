import { StyleSheet, View } from 'react-native';

import { Props } from './Layout.types';

export const ButtonsLayout = ({ children }: Props) => {
  return <View style={styles.buttonsWrapper}>{children}</View>;
};

export const styles = StyleSheet.create({
  buttonsWrapper: {
    marginTop: 20,
  },
});
