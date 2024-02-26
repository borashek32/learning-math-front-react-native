import { Text, View } from 'react-native'
import { styles } from './../../styles/styles'
import { Props } from './types'

export const Score: React.FC<Props> = ({ score }) => {

  return (
    <View>
      <Text style={styles.title}>
        {score} XP
      </Text>
    </View>
  )
}