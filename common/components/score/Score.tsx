import { Text, View } from 'react-native'
import { styles } from '../../styles/styles'
import { Props } from './types'

export const Score = ({ score }: Props) => {

  return (
    <View>
      <Text style={styles.title}>
        {score} XP
      </Text>
    </View>
  )
}