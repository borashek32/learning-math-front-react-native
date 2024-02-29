import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { PATHS } from '../../constants/paths'
import { Props } from './Logo.type'

export const LogoSmall = ({ path }: Props) => {
  const navigation = useNavigation()

  return (
    <TouchableOpacity 
      onPress={() => navigation.navigate(path === PATHS.MAIN ? PATHS.MAIN : PATHS.HOME)}
      >
      <View style={styles.logoWrapperSmall}>
        <View style={styles.learnMathComWrapperSmall}>
          <Text style={styles.learnSmall}>Learn</Text>
          <Text style={styles.mathComSmall}>-math</Text>
          <Text style={styles.mathComSmall}>.com</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  logoWrapperSmall: {
    width: 60,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  learnMathComWrapperSmall: {
    flexDirection: 'column',
  },
  learnSmall: {
    textAlign: 'left',
    fontSize: 18,
    fontWeight: '900',
    lineHeight: 20,
  },
  mathComSmall: {
    textAlign: 'left',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 12,
    marginLeft: 2,
  }
})