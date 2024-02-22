import { Text } from 'react-native'
import { Props } from './types.js'

export const MathOperation = (props: Props) => {

  return (
    <Text style={{fontSize: 24, color: '#fff'}}>{props.title}</Text>
  )
}