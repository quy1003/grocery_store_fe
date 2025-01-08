import SignUpStyles from "@/src/styles/SignUpStyles";
import React, { useState } from "react";
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
  Alert,
} from "react-native";
import { useMutation } from "@apollo/client";
import { gql } from "graphql-tag";

const CREATE_CUSTOMER_MUTATION = gql`
  mutation CreateCustomerV2($input: CustomerCreateInput!) {
    createCustomerV2(input: $input) {
      customer {
        id
        firstname
        lastname
        email
        is_subscribed
      }
    }
  }
`;

const SignUpScreen = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    isSubscribed: true,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  // Use the useMutation hook with better error handling
  const [createCustomer, { loading }] = useMutation(CREATE_CUSTOMER_MUTATION, {
    onError: (error) => {
      // Log the full error for debugging
      console.error("GraphQL Error:", error);

      // Extract the specific error message if available
      const errorMessage =
        error.graphQLErrors?.[0]?.message ||
        error.networkError?.result?.errors?.[0]?.message ||
        "Something went wrong. Please try again later.";

      Alert.alert("Error", errorMessage);
    },
    onCompleted: (data) => {
      Alert.alert(
        "Sign Up Successful",
        `Welcome ${data.createCustomerV2.customer.firstname}!`
      );
      // Add navigation logic here if needed
    },
  });

  const handleTermsToggle = () => {
    setIsTermsAccepted(!isTermsAccepted);
  };

  const validateForm = () => {
    if (!formData.firstName.trim()) {
      Alert.alert("Error", "First name is required");
      return false;
    }
    if (!formData.lastName.trim()) {
      Alert.alert("Error", "Last name is required");
      return false;
    }
    if (!formData.email.trim()) {
      Alert.alert("Error", "Email is required");
      return false;
    }
    if (!formData.password) {
      Alert.alert("Error", "Password is required");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return false;
    }
    if (!isTermsAccepted) {
      Alert.alert("Error", "Please accept the terms and conditions");
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    try {
      await createCustomer({
        variables: {
          input: {
            firstname: formData.firstName,
            lastname: formData.lastName,
            email: formData.email,
            password: formData.password,
            is_subscribed: formData.isSubscribed,
          },
        },
      });
    } catch (err) {
      // Additional error handling if needed
      console.error("Try/Catch Error:", err);
    }
  };

  return (
    <SafeAreaView style={SignUpStyles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
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
                source={require("../../assets/logo.png")}
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
                  autoCapitalize="none"
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
                    SignUpStyles.checkbox,
                    isTermsAccepted && SignUpStyles.checkboxChecked,
                  ]}
                >
                  {isTermsAccepted && (
                    <Text style={SignUpStyles.checkmark}>✓</Text>
                  )}
                </View>
                <Text style={SignUpStyles.termsText}>Terms and Conditions</Text>
              </TouchableOpacity>

              {/* Sign Up Button */}
              <TouchableOpacity
                style={[
                  SignUpStyles.signUpButton,
                  loading && SignUpStyles.signUpButtonDisabled,
                ]}
                onPress={handleSignUp}
                disabled={loading}
              >
                <Text style={SignUpStyles.signUpButtonText}>
                  {loading ? "Signing Up..." : "Sign Up"}
                </Text>
              </TouchableOpacity>

              {/* Login Link */}
              <View style={SignUpStyles.loginContainer}>
                <Text style={SignUpStyles.loginText}>
                  Already have an account?{" "}
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
  );
};

export default SignUpScreen;
