import React, { createContext, useReducer, useState } from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { ApolloProvider } from '@apollo/client'
import client from '@/src/configs/apolloClient'
import UserReducer from './src/reducers/UserReducer'
import Login from './src/components/Login/Login'
import HomeScreen from './src/components/Screens/HomeScreen'
import DemoComponent from './src/components/Login/Demo'

export const UserContext = createContext()

export default function App() {
  const initialUserState = null
  const [user, dispatch] = useReducer(UserReducer, initialUserState)

  const Stack = createNativeStackNavigator()

  return (
    <ApolloProvider client={client}>
      <UserContext.Provider value={[user, dispatch]}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Demo">
            <Stack.Screen
              name="Demo"
              component={DemoComponent}
              options={{ headerShown: false }} // Ẩn header nếu muốn
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </UserContext.Provider>
    </ApolloProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
})
