import { Button, ButtonText } from '@/components/ui/button'
import { FormControl } from '@/components/ui/form-control'
import { Input, InputField } from '@/components/ui/input'
import BaseScreen from '@/src/components/BaseScreen'
import LoginStyles from '@/src/styles/LoginStyles'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '@/App'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { GENERATE_CUSTOMER_TOKEN } from '@/src/Query/sign-in'
import { useApolloClient, useMutation, useQuery } from '@apollo/client'
import { GET_CURRENT_USER } from '@/src/Query/current-user'
import { useAnimatedProps } from 'react-native-reanimated'
import Toast from 'react-native-toast-message'
const Login = ({ navigation }) => {
  const [inputUsername, setInputUsername] = React.useState('')
  const [inputPassword, setInputPassword] = React.useState('')
  const [user, dispatch] = useContext(UserContext)
  const apolloClient = useApolloClient()
  const [loading, setLoading] = useState(false)
  const [generateCustomerToken] = useMutation(GENERATE_CUSTOMER_TOKEN)
  const handleLogin = async () => {
    setLoading(true)
    try {
      const response = await generateCustomerToken({
        variables: { email: inputUsername, password: inputPassword },
      })

      if (response?.data?.generateCustomerToken?.token) {
        const token = response.data.generateCustomerToken.token

        await AsyncStorage.setItem('token', JSON.stringify({ token }))

        const { data } = await apolloClient.query({
          query: GET_CURRENT_USER,
          fetchPolicy: 'network-only',
        })
        if (data?.customer) {
          dispatch({
            type: 'LOGIN',
            payload: {
              user: data.customer,
            },
          })
          showToast('success', 'Login Successfully!')
          navigation.replace('HomeScreen')
        } else {
          console.error('Không thể lấy thông tin người dùng.')
          Alert.alert(
            'Đăng nhập thất bại',
            'Không thể lấy thông tin người dùng.',
            [{ text: 'OK', onPress: () => console.log('OK pressed') }],
            { cancelable: false }
          )
        }
      } else {
        console.error('Lỗi: Không nhận được token.')
        Alert.alert(
          'Failed to Login',
          'Cannot be received token from the server',
          [{ text: 'OK', onPress: () => console.log('OK pressed') }],
          { cancelable: false }
        )
      }
    } catch (err) {
      // console.log("Error: ", err.message)
      showToast('error', err.message)
    } finally {
      setLoading(false)
    }
  }

  const showToast = (state, message) => {
    Toast.show({
      type: state,
      position: 'bottom',
      text1: 'Info',
      text2: message,
      visibilityTime: 3000,
    })
  }
  return (
    <BaseScreen
      title="Login"
      //   subtitle="Find and order your fresh fruits & vegetables"
    >
      <View style={{ padding: '5%' }}>
        <FormControl
          style={{ marginTop: '10%' }}
          size="md"
          isDisabled={false}
          isReadOnly={false}
          isRequired={false}
        >
          <Input className="my-1" style={LoginStyles.inputLogin}>
            <InputField
              style={{ paddingHorizontal: 10 }}
              type="text"
              placeholder="Username"
              value={inputUsername}
              onChangeText={(text) => setInputUsername(text)}
            />
          </Input>

          <Input className="my-1" style={LoginStyles.inputLogin}>
            <InputField
              style={{ paddingHorizontal: 10 }}
              type="password"
              placeholder="Password"
              value={inputPassword}
              onChangeText={(text) => setInputPassword(text)}
            />
          </Input>
          <Text style={{ textAlign: 'right' }}>Forgot your password?</Text>
        </FormControl>

        <View style={LoginStyles.mutualView}>
          <Button
            style={LoginStyles.btnLogin}
            size="lg"
            variant="solid"
            action="positive"
          >
            <TouchableOpacity onPress={handleLogin} disabled={loading}>
              {loading ? (
                <ButtonText style={LoginStyles.btnLoginText}>
                  <ActivityIndicator color="#fff" />
                </ButtonText>
              ) : (
                <ButtonText style={LoginStyles.btnLoginText}>Log in</ButtonText>
              )}
            </TouchableOpacity>
          </Button>
        </View>

        <View style={LoginStyles.mutualView}>
          <Button
            style={LoginStyles.btnSubLogin}
            size="lg"
            variant="solid"
            action="positive"
          >
            <ButtonText style={LoginStyles.btnTextIcon}>
              <Ionicons name={'logo-google'} size={24} />
            </ButtonText>
            <ButtonText style={LoginStyles.btnSubLoginText}>
              Continue With Google
            </ButtonText>
          </Button>

          <Button
            style={LoginStyles.btnSubLogin}
            size="lg"
            variant="solid"
            action="positive"
          >
            <ButtonText style={LoginStyles.btnTextIcon}>
              <Ionicons name={'logo-facebook'} size={24} />
            </ButtonText>
            <ButtonText style={LoginStyles.btnSubLoginText}>
              Continue With Facebook
            </ButtonText>
          </Button>
          <Toast />
        </View>
      </View>
    </BaseScreen>
  )
}

export default Login
