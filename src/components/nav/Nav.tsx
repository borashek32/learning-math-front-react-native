import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  Text,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import {
  selectUserAvatarPath,
  selectUserEmail,
  selectUserId,
} from '@redux/selectors/auth.selectors';
import { PATHS } from '@constants/paths';
import { SelectLang } from '@components/selectLang/SelectLang';
import { NavLinkButton } from '@components/buttons/NavLinkButton';
import { selectTotalUserScore } from '@redux/selectors/profile.selectors';
import { useGetTotalUserScoreQuery } from '@api/profile/profile.api';
import { setTotalUserScore } from '@redux/slices/profile.slice';
import { BlueButton } from 'components/buttons/BlueButton';

import { UserAvatar } from '../avatar/UserAvatar';
import { useAppSelector } from '../../hooks/useAppSelector';
import { LogoSmall } from '../logo/LogoSmall';

export const Nav = () => {
  const navigation = useNavigation();
  const [menuOpen, setMenuOpen] = useState(false);
  const userEmail = useAppSelector(selectUserEmail);
  const totalUserScore = useAppSelector(selectTotalUserScore);
  const avatarPath = useAppSelector(selectUserAvatarPath);

  const dispatch = useDispatch();
  const userId = useAppSelector(selectUserId);
  const { data: userScoreData, refetch } = useGetTotalUserScoreQuery(
    userId ?? '',
  );

  useEffect(() => {
    if (userScoreData) {
      refetch();
    }
  }, [userScoreData, refetch]);

  useEffect(() => {
    refetch();
    userScoreData && dispatch(setTotalUserScore(userScoreData.score));
  }, [userScoreData, dispatch, refetch]);

  const { t } = useTranslation();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <View style={styles.header}>
        <LogoSmall path={userEmail ? PATHS.HOME : PATHS.MAIN} />
        <View style={userEmail ? styles.headerWithUser : {}}>
          {userEmail && (
            <TouchableOpacity
              onPress={() => navigation.navigate(PATHS.PROFILE as never)}>
              <Text style={styles.buttonTextSmall}>{userEmail}</Text>
              <Text style={styles.score}>
                {totalUserScore && totalUserScore} XP
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.menu} onPress={toggleMenu}>
            <Animatable.View
              style={[styles.line, menuOpen && styles.lineActive]}
              animation={menuOpen ? 'rotate' : undefined}
              duration={300}
              easing="ease-in-out">
              <View style={[styles.line, menuOpen && styles.firstLineActive]} />
              <View
                style={[styles.line, menuOpen && styles.middleLineActive]}
              />
              <View style={[styles.line, menuOpen && styles.lineActive]} />
            </Animatable.View>
          </TouchableOpacity>
        </View>
      </View>
      {menuOpen && (
        <View style={styles.navigation}>
          <View style={styles.menuItems}>
            {avatarPath && <UserAvatar source={avatarPath} small />}
            <NavLinkButton
              title={t('screens.home')}
              path={PATHS.MAIN}
              onPress={() => {
                navigation.navigate(PATHS.HOME as never);
                setMenuOpen(false);
              }}
            />
            <NavLinkButton
              title={t('screens.math')}
              path={PATHS.MATH_OPERATIONS}
              onPress={() => {
                navigation.navigate(PATHS.MATH_OPERATIONS as never);
                setMenuOpen(false);
              }}
            />
            <NavLinkButton
              title={t('screens.preSchool')}
              path={PATHS.PRE_SCHOOL}
              onPress={() => {
                navigation.navigate(PATHS.PRE_SCHOOL as never);
                setMenuOpen(false);
              }}
            />
            <NavLinkButton
              title={t('screens.instructions')}
              path={PATHS.INSTRUCTIONS}
              onPress={() => {
                navigation.navigate(PATHS.INSTRUCTIONS as never);
                setMenuOpen(false);
              }}
            />
            <View style={styles.footerDevideLine} />
            <NavLinkButton
              title={t('screens.profile')}
              path={PATHS.PROFILE}
              onPress={() => {
                navigation.navigate(PATHS.PROFILE as never);
                setMenuOpen(false);
              }}
            />
            <NavLinkButton
              title={t('yourScore.total')}
              path={PATHS.YOUR_SCORE}
              onPress={() => {
                navigation.navigate(PATHS.YOUR_SCORE as never);
                setMenuOpen(false);
              }}
            />
            <BlueButton
              title={t('buttons.logout')}
              onPress={() => {
                navigation.navigate(PATHS.LOGOUT as never);
                setMenuOpen(false);
              }}
            />
            <SelectLang />
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  buttonTextSmall: {
    color: '#fff',
    fontSize: 12,
    textDecorationColor: '#fff',
    textDecorationLine: 'underline',
  },
  firstLineActive: {
    backgroundColor: '#fff',
    position: 'absolute',
    top: 12,
    transform: [{ rotate: '-45deg' }],
    zIndex: 1000,
  },
  footerDevideLine: {
    backgroundColor: '#61dafb',
    height: 2,
    width: 250,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 80,
    justifyContent: 'space-between',
    paddingLeft: 10,
    width: '100%',
  },

  headerWithUser: {
    alignItems: 'baseline',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'flex-end',
    paddingRight: 20,
    position: 'relative',
    width: Dimensions.get('window').width - 56,
  },
  item: {
    marginBottom: 10,
  },
  itemLink: {
    color: '#fff',
    textDecorationLine: 'none',
  },
  line: {
    backgroundColor: '#fff',
    height: 2,
    marginBottom: 10,
    width: 40,
  },

  lineActive: {
    backgroundColor: '#fff',
    transform: [{ rotate: '45deg' }],
  },
  menu: {
    alignItems: 'center',
    height: 56,
    justifyContent: 'center',
    width: 56,
  },
  menuItems: {
    alignItems: 'center',
    flexDirection: 'column',
    gap: 20,
    justifyContent: 'center',
    paddingTop: 40,
    width: 300,
  },
  middleLineActive: {
    backgroundColor: '#01143d',
  },
  navigation: {
    alignItems: 'center',
    backgroundColor: '#01143d',
    height: '100%',
    justifyContent: 'flex-start',
    marginTop: 70,
    position: 'absolute',
    width: '100%',
    zIndex: 2,
  },
  score: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'right',
  },
  userEmail: {
    color: '#fff',
    fontSize: 16,
    marginRight: 10,
  },
});
