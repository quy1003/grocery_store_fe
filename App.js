import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MyTabs from "./src/components/MyTabs";
import Welcome from "./src/components/Login/Welcome";
import Login from "./src/components/Login/Login";
import client from "@/src/configs/apolloClient";
import { ApolloProvider } from "@apollo/client";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <MyTabs />
    </ApolloProvider>
  );
}
