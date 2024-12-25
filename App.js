import { StatusBar } from 'expo-status-bar';
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MyTabs from './src/components/MyTabs';
import Welcome from './src/components/Login/Welcome';
import { theme } from './src/configs/theme';
import { Box } from "@/components/ui/box"
export default function App() {
  return <GluestackUIProvider config={theme} mode="light">
    <Box className="m-default"> 
      <Welcome />
    </Box>
  </GluestackUIProvider>;

}