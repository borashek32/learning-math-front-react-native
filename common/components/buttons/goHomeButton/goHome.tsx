import { Button } from "react-native"

export const GoHome = ({ navigation }) => {

  return <Button title="Go back" onPress={() => navigation.goBack()} />
}