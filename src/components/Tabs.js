import {
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";

export default function Tabs({ tabs }) {
  return (
    <ScrollView horizontal style={styles.container}>
      {tabs.map((tab, index) => {
        return (
          <TouchableOpacity key={index} style={styles.tab}>
            <Text style={styles.tabText}>{tab}</Text>
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
});
