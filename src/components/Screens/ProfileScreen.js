import { UserContext } from "@/App";
import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import BaseScreen from "@/src/components/BaseScreen";
import ProfileStyles from "@/src/styles/ProfileStyles";
import React, { useContext, useState } from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { gql, useMutation } from "@apollo/client";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UPDATE_CUSTOMER = gql`
  mutation UpdateCustomer(
    $firstname: String!
    $lastname: String!
    $email: String!
  ) {
    updateCustomer(
      input: { firstname: $firstname, lastname: $lastname, email: $email }
    ) {
      customer {
        firstname
        lastname
        email
      }
    }
  }
`;

const ProfileScreen = ({ navigation }) => {
  const [user, dispatch] = useContext(UserContext);
  const [firstname, setFirstname] = useState(user ? user._j.firstname : "NaN");
  const [lastname, setLastname] = useState(user ? user._j.lastname : "NaN");
  const [email, setEmail] = useState(user ? user._j.email : "NaN");
  const [role, setRole] = useState(user ? user._j.__typename : "NaN");

  const [updateCustomer] = useMutation(UPDATE_CUSTOMER);
  const handleLogout = async () => {
    try {
      dispatch({ type: "LOGOUT" });
      navigation.replace("Login");
    } catch (error) {
      console.info("Error:", error);
    }
  };

  const handleSave = async () => {
    try {
      const { data } = await updateCustomer({
        variables: {
          firstname,
          lastname,
          email,
        },
      });
      console.log("Data:", data);
      if (data && data.updateCustomer && data.updateCustomer.customer) {
        const updatedUser = data.updateCustomer.customer;
        dispatch({ type: "LOGIN", payload: updatedUser });
        await AsyncStorage.setItem("user", JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <BaseScreen title="User Profile" subtitle="">
      <Avatar
        size="2xl"
        style={{ flex: 1, alignItems: "center", marginTop: "-20%", zIndex: 10 }}
      >
        <AvatarImage
          source={{
            uri: `https://ui-avatars.com/api/?name=${user._j.firstname}}`,
          }}
          borderRadius={70}
          width={140}
          height={140}
        />
        <AvatarBadge />
      </Avatar>
      <View style={ProfileStyles.infoView}>
        <Input style={ProfileStyles.textViewUser}>
          <InputField
            style={ProfileStyles.fontSize20}
            value={firstname}
            onChangeText={setFirstname}
            placeholder="First Name"
          />
        </Input>

        <Input style={ProfileStyles.textViewUser}>
          <InputField
            style={ProfileStyles.fontSize20}
            value={lastname}
            onChangeText={setLastname}
            placeholder="Last Name"
          />
        </Input>
        <Input style={ProfileStyles.textViewUser}>
          <InputField
            style={ProfileStyles.fontSize20}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
          />
        </Input>
        <Input isDisabled={true} style={ProfileStyles.textViewUser}>
          <InputField
            style={ProfileStyles.fontSize20}
            value={role}
            onChangeText={setRole}
            placeholder="Role"
          />
        </Input>
      </View>
      <Button
        size="lg"
        variant="solid"
        action="positive"
        style={ProfileStyles.btnLogout}
      >
        <TouchableOpacity onPress={handleSave}>
          <ButtonText style={ProfileStyles.btnSaveText}>Save</ButtonText>
        </TouchableOpacity>
      </Button>
      <Button
        size="lg"
        variant="solid"
        action="negative"
        style={ProfileStyles.btnLogout}
      >
        <TouchableOpacity onPress={handleLogout}>
          <ButtonText style={ProfileStyles.btnLogoutText}>Log out</ButtonText>
          <ButtonText style={{ position: "absolute", top: "18%", right: 15 }}>
            <Ionicons name={"arrow-forward-circle-outline"} size={30} />
          </ButtonText>
        </TouchableOpacity>
      </Button>
      <View style={{ height: "33%" }}></View>
    </BaseScreen>
  );
};

export default ProfileScreen;
