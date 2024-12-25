import { Input } from "@/components/ui/input";
import BaseScreen from "@/src/components/BaseScreen";
import React from "react";
import { View, Text } from "react-native";

const HomeScreen = () => {
  return (
    <BaseScreen
      title="Welcome"
      subtitle="Find and order your fresh fruits & vegetables"
    >
      <Input></Input>
      <View>
        <Text>Component</Text>
      </View>
    </BaseScreen>
  );
};

export default HomeScreen;
