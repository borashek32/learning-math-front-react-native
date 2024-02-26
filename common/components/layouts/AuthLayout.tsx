import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Props } from './Layout.types'
import { LogoSmall } from '../logo/LogoSmall';

export const AuthLayout = ({ title, children }: Props) => {

  return (
    <>
      <View style={styles.logoSmallWrapper}>
        <LogoSmall />
      </View>
      <View style={styles.container}>
        {/* <View style={styles.contentWrapper}> */}
          <Text style={styles.title}>{title}</Text>
          { children }
        {/* </View> */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#01143d',
  },
  logoSmallWrapper: {
    backgroundColor: '#01143d',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 10,
    paddingLeft: 10
  },
  contentWrapper: {
    marginTop: 40,
  },
  title: {
    marginBottom: 30,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center'
  },
})
