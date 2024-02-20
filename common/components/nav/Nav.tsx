import { useNavigation } from "@react-navigation/native"
import { useState } from "react"
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from "react-native"
import { TouchableOpacity } from "react-native"
import { DefaultButton } from "../buttons/DefaultButton"
import { LogoSmall } from "../logo/LogoSmall"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { PATHS } from "../../constants/paths"


export const Nav = () => {
  const [active, setActive] = useState(false)
  const navigation = useNavigation()
  const userEmail = AsyncStorage.getItem('userEmail')
  const { t } = useTranslation()

  const onClick = () => {
    setActive(!active)
  }

  return (
    <>
      <View style={styles.header}>
        <LogoSmall />
        <View style={styles.headerWithUser}>
          <TouchableOpacity style={styles.menu} onPress={onClick}>
            <View style={[styles.line, active && { backgroundColor: '#01143d' }]}></View>
            <View style={[styles.line, active && { backgroundColor: '#01143d' }]}></View>
            <View style={[styles.line, active && { backgroundColor: '#01143d' }]}></View>
          </TouchableOpacity>
        </View>
      </View>
      {userEmail && active && (
        <View style={styles.navigation}>
          <View style={styles.menuItems}>
            <DefaultButton title={t('nav.items.home')} path={PATHS.HOME} />
            <DefaultButton title={t('nav.items.mathOperations')} path={PATHS.MATH_OPERATIONS} />
            <DefaultButton title={t('nav.items.instructions')} path={PATHS.INSTRUCTIONS} />
            <View style={styles.footerDevideLine}></View>
            <DefaultButton title={t('nav.items.profile')} path={PATHS.PROFILE} />
            <DefaultButton title={t('nav.items.score')} path={PATHS.SCORE} />
            <DefaultButton title={t('buttons.logout')} path={PATHS.LOGOUT} />
          </View>
        </View>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    height: 80,
    width: '100%',
    position:'relative',
  },
  headerWithUser: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userEmail: {
    color: '#fff',
    fontSize: 16,
    marginRight: 10,
  },
  menu: {
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center'
  },
  line: {
    width: 40,
    height: 2,
    backgroundColor: '#fff',
    marginBottom: 10
  },
  navigation: {
    position: 'absolute',
    zIndex: 2,
    width: '100%',
    height: '100%',
    backgroundColor: '#01143d',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItems: {
    width: 200,
    height: 300,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
  },
  item: {
    marginBottom: 10,
  },
  itemLink: {
    color: '#fff',
    textDecorationLine: 'none',
  },
  footerDevideLine: {
    height: 2,
    width: '100%',
    backgroundColor: '#61dafb',
  },
})