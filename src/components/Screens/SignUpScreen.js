import SignUpStyles from '@/src/styles/SignUpStyles'
import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'

const SignUpScreen = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isTermsAccepted, setIsTermsAccepted] = useState(false)

  const handleTermsToggle = () => {
    setIsTermsAccepted(!isTermsAccepted)
  }

  return (
    <SafeAreaView style={SignUpStyles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={SignUpStyles.keyboardAvoidView}
      >
        <ScrollView
          style={SignUpStyles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={SignUpStyles.scrollContent}
        >
          <View style={SignUpStyles.content}>
            {/* Logo Section */}
            <View style={SignUpStyles.logoContainer}>
              <Image
                source={require('../../assets/logo.png')}
                style={SignUpStyles.logo}
                resizeMode="contain"
              />
            </View>

            {/* Header Section */}
            <Text style={SignUpStyles.title}>Create Account</Text>
            <Text style={SignUpStyles.subtitle}>
              Please sign up to continue
            </Text>

            {/* Form Section */}
            <View style={SignUpStyles.form}>
              <View style={SignUpStyles.inputContainer}>
                <TextInput
                  style={SignUpStyles.input}
                  placeholder="First name"
                  value={formData.firstName}
                  onChangeText={(text) =>
                    setFormData({ ...formData, firstName: text })
                  }
                />
              </View>

              <View style={SignUpStyles.inputContainer}>
                <TextInput
                  style={SignUpStyles.input}
                  placeholder="Last name"
                  value={formData.lastName}
                  onChangeText={(text) =>
                    setFormData({ ...formData, lastName: text })
                  }
                />
              </View>

              <View style={SignUpStyles.inputContainer}>
                <TextInput
                  style={SignUpStyles.input}
                  placeholder="Email"
                  keyboardType="email-address"
                  value={formData.email}
                  onChangeText={(text) =>
                    setFormData({ ...formData, email: text })
                  }
                />
              </View>

              <View style={SignUpStyles.inputContainer}>
                <TextInput
                  style={SignUpStyles.input}
                  placeholder="Password"
                  secureTextEntry={!showPassword}
                  value={formData.password}
                  onChangeText={(text) =>
                    setFormData({ ...formData, password: text })
                  }
                />
                <TouchableOpacity
                  style={SignUpStyles.eyeIcon}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Text>👁️</Text>
                </TouchableOpacity>
              </View>

              <View style={SignUpStyles.inputContainer}>
                <TextInput
                  style={SignUpStyles.input}
                  placeholder="Confirm password"
                  secureTextEntry={!showConfirmPassword}
                  value={formData.confirmPassword}
                  onChangeText={(text) =>
                    setFormData({ ...formData, confirmPassword: text })
                  }
                />
                <TouchableOpacity
                  style={SignUpStyles.eyeIcon}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Text>👁️</Text>
                </TouchableOpacity>
              </View>

              {/* Terms and Conditions */}
              <TouchableOpacity
                style={SignUpStyles.termsContainer}
                onPress={handleTermsToggle}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.checkbox,
                    isTermsAccepted && styles.checkboxChecked,
                  ]}
                >
                  {isTermsAccepted && (
                    <Text style={SignUpStyles.checkmark}>✓</Text>
                  )}
                </View>
                <Text style={SignUpStyles.termsText}>Terms and Conditions</Text>
              </TouchableOpacity>

              {/* Sign Up Button */}
              <TouchableOpacity style={SignUpStyles.signUpButton}>
                <Text style={SignUpStyles.signUpButtonText}>Sign Up</Text>
              </TouchableOpacity>

              {/* Login Link */}
              <View style={SignUpStyles.loginContainer}>
                <Text style={SignUpStyles.loginText}>
                  Already have an account?{' '}
                </Text>
                <TouchableOpacity>
                  <Text style={SignUpStyles.loginLink}>Sign In</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default SignUpScreen
