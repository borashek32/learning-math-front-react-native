import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Summ } from './Summ';
import { Home } from './Home';
import { Diff } from './Diff';

const Tab = createBottomTabNavigator()

export const Navigation = () => {

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Summ" component={Summ} />
        <Tab.Screen name="Diff" component={Diff} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}