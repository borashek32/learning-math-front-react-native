import { StyleSheet } from "react-native"
import { View } from "react-native-animatable"
import { ReactElement } from "react"

export const ModalLayout = ({ children }: { children: ReactElement }) => {

  return (
    <View style={styles.wrapper}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000104b8'
  },
})