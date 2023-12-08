import { Button, TouchableOpacity, View, Text } from "react-native";
import { styles } from "../../styles/styles";
import { Props } from "./types"

export const AlertResult = (props: Props) => {

  return (
    <View>
      {props.right && 
        <TouchableOpacity style={[styles.alertWrapper, styles.alertGreen]}>
          <Text style={styles.alertText}>Yeah, you are right</Text>
          <View>
            <Button
              title={props.title}
              onPress={props.onPress}
            />
          </View>
        </TouchableOpacity>
      }
      {props.wrong && 
        <TouchableOpacity style={[styles.alertWrapper, styles.alertRed]}>
          <Text style={styles.alertText}>Oh, nooooo. Please, try again</Text>
          <View>
            <Button
              title='Try again'
              onPress={props.onPress}
            />
          </View>
        </TouchableOpacity>
      }
    </View>
  )
}