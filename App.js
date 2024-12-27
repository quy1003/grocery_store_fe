import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Login from './src/components/Login/Login';
import DemoComponent from './src/components/Login/Demo';


export default function App() {
  const [showComponentB, setShowComponentB] = useState(false);

  const handleFinish = () => {
    setShowComponentB(true);
  };

  return (
    <View style={styles.container}>
      {showComponentB ? <Login /> : <DemoComponent onFinish={handleFinish} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
});
