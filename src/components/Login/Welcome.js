import { Button, ButtonText } from '@/components/ui/button'
import LoginStyles, { WelcomeStyles } from '@/src/styles/LoginStyles'
import React from 'react'
import {
  Text,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  View,
  TouchableOpacity,
} from 'react-native'

// Lấy kích thước màn hình
const { height, width } = Dimensions.get('window')

const Welcome = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, marginTop: 25 }}>
      <ImageBackground
        source={{
          uri: 'https://media.istockphoto.com/id/1718516554/photo/full-frame-of-assortment-of-healthy-and-fresh-fruits.webp?a=1&b=1&s=612x612&w=0&k=20&c=R5kRarCiJjLmzKIEv_8NEEscMdesZFWwYqxnDyJ7E2s=',
        }}
        style={{ width, height }}
        resizeMode="cover"
        blurRadius={1}
      >
        <View style={{ height: '30%' }}></View>
        <View style={{ width: '70%', marginLeft: '5%' }}>
          <Text style={[WelcomeStyles.generalText, WelcomeStyles.textTitle]}>
            Grocery Store
          </Text>
          <Text style={WelcomeStyles.generalText}>Find and order</Text>
          <Text style={WelcomeStyles.generalText}>High quality</Text>
          <Text style={WelcomeStyles.generalText}>Fruits & vegetables</Text>
        </View>
        <View style={{ height: '18%' }}></View>
        <View style={{ flex: 1, alignItems: 'center', paddingHorizontal: 10 }}>
          <Button
            style={WelcomeStyles.btnAccess}
            size="lg"
            variant="solid"
            action="positive"
          >
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <ButtonText style={WelcomeStyles.btnTextAccess}>
                Log in
              </ButtonText>
            </TouchableOpacity>
          </Button>
          <Button
            style={WelcomeStyles.btnAccess}
            size="lg"
            variant="solid"
            action="positive"
          >
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <ButtonText style={WelcomeStyles.btnTextAccess}>
                Sign up
              </ButtonText>
            </TouchableOpacity>
          </Button>
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}

export default Welcome
