import React from "react";
import { View, Text, ScrollView, StyleSheet, StatusBar } from "react-native";

const BaseScreen = ({ children, title, subtitle }) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#56995d" barStyle="light-content" />

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{title}</Text>
          <Text style={styles.headerSubTitle}>{subtitle}</Text>
        </View>

        <View style={styles.content}>
          {children}
          {children}
          {children}
          {children}
          {children}
        </View>
      </ScrollView>
    </View>
  );
};

export default BaseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  contentContainer: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: "#56995d",
    padding: 24,
    paddingTop: 50,
    paddingBottom: 80,
    justifyContent: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "400",
  },
  headerSubTitle: {
    color: "#fff",
    fontSize: 19,
    width: "75%",
  },
  content: {
    flex: 1,
    padding: 16,
    borderRadius: 24,
    marginTop: -60,
    backgroundColor: "#f5f5f5",
  },
});
