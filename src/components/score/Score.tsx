import { StyleSheet, Text, View } from 'react-native'
import { Props } from './Score.types'
import { useAppSelector } from '../../hooks/useAppSelector'
import { selectUserAvatarPath } from '../../redux/selectors/auth.selectors'
import { UserAvatar } from '../avatar/UserAvatar'

export const Score = ({ score }: Props) => {
  const avatarPath = useAppSelector(selectUserAvatarPath)

  return (
    <View style={styles.container}>
      <View style={styles.scoreWrapper}>
        <UserAvatar 
          source={avatarPath}
          small={true}
        />
        <Text style={styles.title}>
          {score} XP
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 100,
    gap: 6
  },
  title: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center'
  }
})