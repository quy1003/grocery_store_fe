import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import Login from './src/components/Login/Login'
import DemoComponent from './src/components/Login/Demo'
import client from '@/src/configs/apolloClient'
import { ApolloProvider } from '@apollo/client'
import MyTabs from '@/src/components/MyTabs'
import SignUpScreen from './src/components/Screens/SignUpScreen'

export default function App() {
  const [showComponentB, setShowComponentB] = useState(false)

  const handleFinish = () => {
    setShowComponentB(true)
  }

  return (
    <ApolloProvider client={client}>
      {/* <View style={styles.container}>
        {showComponentB ? (
          <MyTabs />
        ) : (
          <DemoComponent onFinish={handleFinish} />
        )}
      </View> */}
      <MyTabs />
      {/* <SignUpScreen /> */}
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
