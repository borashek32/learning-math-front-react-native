import { StyleSheet, View } from "react-native"

export const DevideLine = () => {

  return <View style={styles.footerDevideLine}></View>
}

const styles = StyleSheet.create({
  footerDevideLine: {
    height: 2,
    width: 200,
    backgroundColor: '#61dafb',
    marginTop: 20,
    marginBottom: 20
  },
})