import { StyleSheet } from 'react-native';
import { View } from 'react-native-animatable';
import { ReactNode } from 'react';

export const ModalLayout = ({ children }: { children: ReactNode }) => {
  return <View style={styles.wrapper}>{children}</View>;
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    backgroundColor: '#000104b8',
    height: '100%',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    zIndex: 100,
  },
});
