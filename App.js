import React, { createContext, useEffect, useReducer, useState } from "react";
import { View, StyleSheet } from "react-native";
import Login from "./src/components/Login/Login";
import DemoComponent from "./src/components/Login/Demo";
import client from "@/src/configs/apolloClient";
import { ApolloProvider } from "@apollo/client";
import MyTabs from "@/src/components/MyTabs";
import UserReducer from "./src/reducers/UserReducer";

export const UserContext = createContext();
export default function App() {
  //
  const initialUserState = null;
  const [user, dispatch] = useReducer(UserReducer, initialUserState);
  
  //
  const [showComponentB, setShowComponentB] = useState(false);

  const handleFinish = () => {
    setShowComponentB(true);
  };

  return (
    <ApolloProvider client={client}>
      <UserContext.Provider value={[user, dispatch]}>
        {/* <View style={styles.container}>
          {showComponentB ? (
          <MyTabs />
        ) : (
          <DemoComponent onFinish={handleFinish} />
        )}
      </View> */}
       {user ? <MyTabs/> : <Login/>}
      </UserContext.Provider>
    </ApolloProvider>
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
