import { StyleSheet, Text, View } from 'react-native';
import { useAppSelector } from '@hooks/useAppSelector';
import { selectUserAvatarPath } from '@redux/selectors/auth.selectors';

import { Props } from './Score.types';
import { UserAvatar } from '../avatar/UserAvatar';

export const Score = ({ score }: Props) => {
  const avatarPath = useAppSelector(selectUserAvatarPath);

  return (
    <View style={styles.container}>
      <View style={styles.scoreWrapper}>
        <UserAvatar source={avatarPath} small />
        <Text style={styles.title}>{score} XP</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  scoreWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
    width: 100,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
  },
});
