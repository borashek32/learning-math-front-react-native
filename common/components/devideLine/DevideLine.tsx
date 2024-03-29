import { StyleSheet, View } from "react-native"

export const DevideLine = () => {

  return (
    <View style={styles.footerDevideLineWrapper}>
      <View style={styles.footerDevideLine}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  footerDevideLineWrapper: {
    alignItems: 'center',
  },
  footerDevideLine: {
    height: 2,
    width: 200,
    backgroundColor: '#61dafb',
    marginTop: 20,
    marginBottom: 20
  },
})