import {
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";

export default function Tabs({ tabs, activeTab, onPress }) {
  return (
    <ScrollView
      horizontal
      style={styles.container}
      showsHorizontalScrollIndicator={false}
    >
      {tabs.map((tab, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={styles.tab}
            onPress={() => onPress(tab)}
          >
            <Text
              style={
                activeTab == tab
                  ? { ...styles.tabText, ...styles.tabTextActive }
                  : styles.tabText
              }
            >
              {tab}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    height: 40,
  },
  tab: {
    marginRight: 48,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  tabTextActive: {
    borderBottomStyle: "solid",
    borderBottomColor: "#77b07c",
    borderBottomWidth: 2,
  },
});
