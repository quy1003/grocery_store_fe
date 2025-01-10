import { useNavigation } from '@react-navigation/native'
import React from 'react'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const BaseScreen = ({
  children,
  title,
  subtitle,
  leftSubtitle,
  backScreenName,
  backPress = () => {},
  topRightPress = () => {},
  topRightPressText,
}) => {
  const navigation = useNavigation()

  const handleBackPress = () => {
    if (backScreenName) {
      navigation.navigate(backScreenName)
    }
  }
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#56995d" barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <TouchableOpacity onPress={handleBackPress}>
              <Icon
                name="chevron-left"
                size={24}
                fontWeight={'100'}
                color="#fff"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={topRightPress}>
              <Text>{topRightPressText}</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.headerTitle}>{title}</Text>
          <View style={styles.subtitleContainer}>
            <Text style={styles.headerSubTitle}>{subtitle}</Text>
            <Text style={styles.headerSubTitleLeft}>{leftSubtitle}</Text>
          </View>
        </View>

        <View style={styles.content}>{children}</View>
      </ScrollView>
    </View>
  )
}

export default BaseScreen

const styles = StyleSheet.create({
  headerTop: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  container: {
    // flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: '#56995d',
    padding: 24,
    // paddingTop: 50,
    paddingBottom: 80,
    justifyContent: 'center',
    height: 300,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '600',
  },
  headerSubTitle: {
    color: '#fff',
    fontSize: 19,
    width: '75%',
  },
  headerSubTitleLeft: {
    color: '#fff',
    fontSize: 22,
  },
  subtitleContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  content: {
    flex: 1,
    // padding: 24,
    borderRadius: 20,
    marginTop: -60,
    backgroundColor: '#f5f5f5',
    // height: 700,
  },
})
