import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import BaseStyles from "../styles/BaseStyles";

const BaseScreen = ({
  children,
  title,
  subtitle = "",
  rightSubtitle = "",
  backScreenName,
  topRightPress = () => {},
  topRightPressText,
  rightComponent,
}) => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    if (backScreenName) {
      navigation.navigate(backScreenName);
    } else {
      navigation.goBack(null);
    }
  };
  return (
    <View style={BaseStyles.container}>
      <StatusBar backgroundColor="#56995d" barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <TouchableOpacity style={styles.backBtn} onPress={handleBackPress}>
              <Icon
                name="angle-left"
                size={32}
                fontWeight={"100"}
                color="#fff"
              />
            </TouchableOpacity>
            {rightComponent ? (
              rightComponent
            ) : (
              <TouchableOpacity onPress={topRightPress}>
                <Text>{topRightPressText}</Text>
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.headerTitle}>{title}</Text>
          {(subtitle != "" || rightSubtitle != "") && (
            <View style={styles.subtitleContainer}>
              <Text style={styles.headerSubTitle}>{subtitle}</Text>
              <Text style={styles.headerSubTitleRight}>{rightSubtitle}</Text>
            </View>
          )}
        </View>

        <View style={BaseStyles.content}>{children}</View>
      </ScrollView>
    </View>
  );
};

export default BaseScreen;
