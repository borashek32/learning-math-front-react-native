import { Text, View } from 'react-native'
import { styles } from './../../styles/styles'
import { Props } from './types'

export const Score: React.FC<Props> = ({ score }) => {

  return (
    <View style={styles.scoreWrapper}>
      <Text style={styles.scoreText}>Your score: {score}</Text>
    </View>
  )
}