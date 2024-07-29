import { StyleSheet, View } from 'react-native';

export const DevideLine = () => {
  return (
    <View style={styles.footerDevideLineWrapper}>
      <View style={styles.footerDevideLine} />
    </View>
  );
};

const styles = StyleSheet.create({
  footerDevideLine: {
    backgroundColor: '#61dafb',
    height: 2,
    marginBottom: 20,
    marginTop: 20,
    width: 200,
  },
  footerDevideLineWrapper: {
    alignItems: 'center',
  },
});
