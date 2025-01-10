import { UserContext } from '@/App'
import { Image } from '@/components/ui/image'
import MutualStyles from '@/src/styles/MutualStyles'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useContext, useEffect } from 'react'
import { Text, Dimensions, View } from 'react-native'
import Animated, {
  Easing,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated'

const { width } = Dimensions.get('window')

const DemoComponent = ({ navigation }) => {
  const opacity = useSharedValue(1)
  const translateX = useSharedValue(0)
  const [user, dispatch] = useContext(UserContext)
  useEffect(() => {
    const checkUser = async () => {
      try {
        const userStorage = await AsyncStorage.getItem('user')

        if (userStorage) {
          dispatch({ type: 'LOGIN', payload: JSON.parse(userStorage) })
          navigation.replace('MyTabs')

          navigation.replace('MyTabs')
          return
        }
        navigation.replace('Login')
      } catch (error) {
        console.error('Lỗi khi kiểm tra AsyncStorage:', error)
        navigation.replace('Login')
      }
    }

    const timer = setTimeout(() => {
      opacity.value = withTiming(0, { duration: 1000, easing: Easing.ease })
      translateX.value = withTiming(width, {
        duration: 1000,
        easing: Easing.ease,
      })
    }, 4500)

    checkUser()
    return () => clearTimeout(timer)
  }, [navigation, opacity, translateX])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateX: translateX.value }],
    }
  })

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Animated.View style={[animatedStyle]}>
        <Image
          size="md"
          source={{
            uri: 'https://images.unsplash.com/photo-1516594798947-e65505dbb29d?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          }}
          alt="Grocery Store"
          width={300}
          height={300}
          borderRadius={150}
          style={{ position: 'relative' }}
        />
        <Text style={MutualStyles.WelcomeTextDemo}>404 Grocery Store</Text>
      </Animated.View>
    </View>
  )
}

export default DemoComponent
