import React, { useEffect, useState } from "react"
import { StyleSheet, View, TouchableOpacity, Dimensions, Text } from "react-native"
import { LogoSmall } from "../logo/LogoSmall"
import { DefaultButton } from "../buttons/DefaultButton"
import { useAppSelector } from "../../hooks/useAppSelector"
import { selectUserAvatarPath, selectUserEmail, selectUserId } from "../../../features/auth/auth.selectors"
import { useTranslation } from "react-i18next"
import { PATHS } from "../../constants/paths"
import { SelectLang } from "../selectLang/SelectLang"
import * as Animatable from 'react-native-animatable'
import { NavLinkButton } from "../buttons/NavLinkButton"
import { selectTotalUserScore } from "../../../features/profile/profile.selectors"
import { UserAvatar } from "../avatar/UserAvatar"
import { useNavigation } from "@react-navigation/native"
import { useGetTotalUserScoreQuery } from "../../../features/profile/profile.api"
import { useDispatch } from "react-redux"
import { setTotalUserScore } from "../../../features/profile/profile.slice"

export const Nav = () => {
  const navigation = useNavigation()
  const [menuOpen, setMenuOpen] = useState(false)
  const userEmail = useAppSelector(selectUserEmail)
  const totalUserScore = useAppSelector(selectTotalUserScore)
  const avatarPath = useAppSelector(selectUserAvatarPath)

  const dispatch = useDispatch()
  const userId = useAppSelector(selectUserId)
  const { data: userScoreData } = useGetTotalUserScoreQuery(userId)

  useEffect(() => {
    userScoreData && dispatch(setTotalUserScore(userScoreData.score))
  }, [userScoreData, dispatch])
  
  const { t } = useTranslation()

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <>
      <View style={styles.header}>
        <LogoSmall path={userEmail ? PATHS.HOME : PATHS.MAIN} />
        <View style={userEmail ? styles.headerWithUser : {}}>
          {userEmail && 
            <TouchableOpacity onPress={() => navigation.navigate(PATHS.PROFILE as never)}>
              <Text style={styles.buttonTextSmall}>{userEmail}</Text>
              <Text style={styles.score}>{totalUserScore && totalUserScore} XP</Text>
            </TouchableOpacity>
          }
          <TouchableOpacity style={styles.menu} onPress={toggleMenu}>
            <Animatable.View 
              style={[styles.line, menuOpen && styles.lineActive]} 
              animation={menuOpen ? 'rotate' : null} 
              duration={300} 
              easing="ease-in-out"
            >
              <View style={[styles.line, menuOpen && styles.firstLineActive]}></View>
              <View style={[styles.line, menuOpen && styles.middleLineActive]}></View>
              <View style={[styles.line, menuOpen && styles.lineActive]}></View>
            </Animatable.View>
          </TouchableOpacity>
        </View>
      </View>
      {userEmail && menuOpen && (
        <View style={styles.navigation}>
          <View style={styles.menuItems}>
            {avatarPath && 
              <UserAvatar 
                source={avatarPath}
                small={true}
              />
            }
            <NavLinkButton 
              title={t("nav.items.home")}
              path={PATHS.HOME}
              onPress={() => {
                navigation.navigate(PATHS.HOME as never)
                setMenuOpen(false)
              }} 
            />
            <NavLinkButton 
              title={t("nav.items.mathOperations")} 
              path={PATHS.MATH_OPERATIONS} 
              onPress={() => {
                navigation.navigate(PATHS.MATH_OPERATIONS as never)
                setMenuOpen(false)
              }} 
            />
            <NavLinkButton 
              title={t("nav.items.instructions")} 
              path={PATHS.INSTRUCTIONS}
              onPress={() => {
                navigation.navigate(PATHS.INSTRUCTIONS as never)
                setMenuOpen(false)
              }}  
            />
            <View style={styles.footerDevideLine}></View>
            <NavLinkButton 
              title={t("nav.items.profile")} 
              path={PATHS.PROFILE} 
              onPress={() => {
                navigation.navigate(PATHS.PROFILE as never)
                setMenuOpen(false)
              }} 
            />
            <NavLinkButton 
              title={t("nav.items.score")} 
              path={PATHS.YOUR_SCORE} 
              onPress={() => {
                navigation.navigate(PATHS.YOUR_SCORE as never)
                setMenuOpen(false)
              }} 
            />
            <DefaultButton 
              title={t("buttons.logout")} 
              path={PATHS.LOGOUT} 
              onPress={() => {
                navigation.navigate(PATHS.LOGOUT as never)
                setMenuOpen(false)
              }} 
            />
            <SelectLang />
          </View>
        </View>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 10,
    height: 80,
    width: "100%",
  },
  headerWithUser: {
    paddingRight: 20,
    width: Dimensions.get("window").width - 56,
    flexDirection: "row",
    alignItems: 'baseline',
    justifyContent: "flex-end",
    position: "relative",
    gap: 10
  },
  userEmail: {
    color: "#fff",
    fontSize: 16,
    marginRight: 10,
  },
  menu: {
    width: 56,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
  },
  
  line: {
    width: 40,
    height: 2,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  lineActive: {
    transform: [{ rotate: '45deg' }],
    backgroundColor: "#fff",
  },
  firstLineActive: {
    transform: [{ rotate: '-45deg' }],
    backgroundColor: "#fff",
    top: 12,
    position: 'absolute',
    zIndex: 1000
  },
  middleLineActive: {
    backgroundColor: '#01143d'
  },

  navigation: {
    position: "absolute",
    zIndex: 2,
    width: "100%",
    height: "100%",
    backgroundColor: "#01143d",
    justifyContent: "flex-start",
    marginTop: 70,
    alignItems: "center",
  },
  menuItems: {
    paddingTop: 40,
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: 20,
  },
  item: {
    marginBottom: 10,
  },
  itemLink: {
    color: "#fff",
    textDecorationLine: "none",
  },
  footerDevideLine: {
    height: 2,
    width: 250,
    backgroundColor: "#61dafb",
  },
  buttonTextSmall: {
    fontSize: 12,
    color: '#fff',
    textDecorationColor: '#fff',
    textDecorationLine: 'underline'
  },
  score: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'right'
  }
})
