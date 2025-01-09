import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from './Screens/HomeScreen'
import ProfileScreen from './Screens/ProfileScreen'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FavoriteScreen from './Screens/FavoriteScreen'
import CartScreen from './Screens/CartScreen'
import { StyleSheet } from 'react-native'
import ProductDetailsScreen from '@/src/components/Screens/ProductDetailsScreen'
import { useContext, useEffect, useReducer } from 'react'
import { UserContext } from '@/App'
const Tab = createBottomTabNavigator()

export default function MyTabs() {
  const [user, dispatch] = useContext(UserContext, null)

  console.info('Thông tin user: ', user)
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          lazy: true,
          tabBarStyle: { backgroundColor: '#efffe8' },
          tabBarActiveTintColor: '#bfeca1',
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? 'home' : 'home-outline'}
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Favorite"
          component={FavoriteScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? 'star' : 'star-outline'}
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Test"
          component={ProductDetailsScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? 'star' : 'star-outline'}
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Cart"
          component={CartScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? 'cart' : 'cart-outline'}
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? 'person' : 'person-outline'}
                size={size}
                color={color}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#efffe8',
  },
})
