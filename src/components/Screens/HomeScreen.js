import { Icon, SearchIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import BaseScreen from "@/src/components/BaseScreen";
import MyInput from "@/src/components/MyInput";
import ProductCard from "@/src/components/ProductCard";
import Tabs from "@/src/components/Tabs";
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Touchable,
  Button,
  TouchableOpacity,
} from "react-native";

const HomeScreen = () => {
  const tabs = ["Fruits", "Vegetables", "Breads", "Others"];

  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  console.log(tabs);
  tabs.map((m) => console.log(m));
  return (
    <BaseScreen
      title="Welcome"
      subtitle="Find and order your fresh fruits & vegetables"
    >
      <MyInput placeholder={"Search fresh fruits & vegetables..."} />
      <Tabs tabs={tabs} />
      <ScrollView horizontal>
        <View style={styles.card}>
          <ProductCard />
        </View>
        <View style={styles.card}>
          <ProductCard />
        </View>
        <View style={styles.card}>
          <ProductCard />
        </View>
        <View style={styles.card}>
          <ProductCard />
        </View>
      </ScrollView>
      <TouchableOpacity title="See All" style={styles.allBtn}>
        <Text>See All</Text>
      </TouchableOpacity>
    </BaseScreen>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    marginRight: 10,
  },
  allBtn: {
    padding: 20,
    borderColor: "#333",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 40,
    width: 100,
  },
});
