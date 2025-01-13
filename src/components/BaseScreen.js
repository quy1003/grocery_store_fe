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
  subtitle,
  leftSubtitle,
  backScreenName,
  backPress = () => {},
  topRightPress = () => {},
  topRightPressText,
  rightComponent,
}) => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    if (backScreenName) {
      navigation.navigate(backScreenName);
    }
  };
  return (
    <View style={BaseStyles.container}>
      <StatusBar backgroundColor="#56995d" barStyle="light-content" />
      <ScrollView contentContainerStyle={BaseStyles.contentContainer}>
        <View style={BaseStyles.header}>
          <View style={BaseStyles.headerTop}>
            <TouchableOpacity onPress={handleBackPress}>
              <Icon
                name="chevron-left"
                size={24}
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
          <Text style={BaseStyles.headerTitle}>{title}</Text>
          <View style={BaseStyles.subtitleContainer}>
            <Text style={BaseStyles.headerSubTitle}>{subtitle}</Text>
            <Text style={BaseStyles.headerSubTitleLeft}>{leftSubtitle}</Text>
          </View>
        </View>

        <View style={BaseStyles.content}>{children}</View>
      </ScrollView>
    </View>
  );
};

export default BaseScreen;
