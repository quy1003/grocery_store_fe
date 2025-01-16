import React, { createContext, useReducer, useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { ApolloProvider } from "@apollo/client";
import client from "@/src/configs/apolloClient";
import UserReducer from "./src/reducers/UserReducer";
import Login from "./src/components/Login/Login";
import HomeScreen from "./src/components/Screens/HomeScreen";
import DemoComponent from "./src/components/Login/Demo";
import MyTabs from "./src/components/MyTabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Welcome from "./src/components/Login/Welcome";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import SignUpScreen from "./src/components/Screens/SignUpScreen";
import ProductDetailsScreen from "@/src/components/Screens/ProductDetailsScreen";
import CategoryScreen from "@/src/components/Screens/CategoryScreen";

export const UserContext = createContext();

export default function App() {
  const [user, dispatch] = useReducer(UserReducer, null);

  const Stack = createNativeStackNavigator();

  return (
    <GestureHandlerRootView>
      <UserContext.Provider value={[user, dispatch]}>
        <ApolloProvider client={client}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Demo">
              <Stack.Screen
                name="Demo"
                component={DemoComponent}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="MyTabs"
                component={MyTabs}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Welcome"
                component={Welcome}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Signup"
                component={SignUpScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ProductDetail"
                component={ProductDetailsScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="CategoryScreen"
                component={CategoryScreen}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </ApolloProvider>
      </UserContext.Provider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
});
