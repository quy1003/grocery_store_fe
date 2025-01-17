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
import React, { useContext, useRef, useState } from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { gql, useMutation } from "@apollo/client";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { set } from "local-storage";

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

  const [isEditing, setIsEditing] = useState(false);
  const [isUserNameEditing, setIsUserNameEditing] = useState(false);
  const [isEmailEditing, setIsEmailEditing] = useState(false);
  const [originalState, setOriginalState] = useState({
    firstname,
    lastname,
    email,
  });

  const [updateCustomer] = useMutation(UPDATE_CUSTOMER);
  const emailInputRef = useRef(null);
  const userNameInputRef = useRef(null);
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
      if (data && data.updateCustomer && data.updateCustomer.customer) {
        const updatedUser = data.updateCustomer.customer;
        dispatch({ type: "LOGIN", payload: updatedUser });
        await AsyncStorage.setItem("user", JSON.stringify(updatedUser));
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleCancel = () => {
    setFirstname(originalState.firstname);
    setLastname(originalState.lastname);
    setEmail(originalState.email);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setOriginalState({ firstname, lastname, email });
    setIsEditing(true);
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
          <InputField style={ProfileStyles.fontSize20} disabled={true} />
        </Input>
        <Input style={ProfileStyles.textViewUser}>
          <InputField
            ref={userNameInputRef}
            style={[
              ProfileStyles.fontSize20,
              {
                width: "40%",
                backgroundColor: isUserNameEditing ? "lightgray" : "#EEEEEE",
              },
            ]}
            value={firstname}
            onChangeText={setFirstname}
            placeholder="First Name"
            editable={isUserNameEditing}
          />
          <TouchableOpacity
            onPress={() => {
              setIsUserNameEditing(true);
              setIsEmailEditing(false);
              setTimeout(() => {
                userNameInputRef.current.focus();
              }, 100);
            }}
            style={{
              backgroundColor: "lightgray",
              padding: 10,
              borderRadius: 10,
            }}
          >
            <Ionicons
              style={{ marginTop: 3 }}
              name={"settings-outline"}
              size={30}
            />
          </TouchableOpacity>
          <InputField
            style={[
              ProfileStyles.fontSize20,
              {
                width: "40%",
                backgroundColor: isUserNameEditing ? "lightgray" : "#EEEEEE",
              },
            ]}
            value={lastname}
            onChangeText={setLastname}
            placeholder="Last Name"
            editable={isUserNameEditing}
          />
          <Ionicons
            style={{ position: "absolute", top: "30%", left: "5%" }}
            name={"person-circle"}
            size={30}
          />
        </Input>

        <Input style={ProfileStyles.textViewUser}>
          <InputField
            ref={emailInputRef}
            style={[
              ProfileStyles.fontSize20,
              { backgroundColor: isEmailEditing ? "lightgray" : "#EEEEEE" },
            ]}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            editable={isEmailEditing}
          />
          <Ionicons
            style={{ position: "absolute", top: "30%", left: "5%" }}
            name={"mail"}
            size={30}
          />
          <TouchableOpacity
            onPress={() => {
              setIsEmailEditing(true);
              setIsUserNameEditing(false);
              setTimeout(() => {
                emailInputRef.current.focus();
              }, 100);
            }}
            style={{
              position: "absolute",
              top: "10%",
              right: "2%",
              backgroundColor: "lightgray",
              borderRadius: 10,
              padding: 13,
            }}
          >
            <Ionicons name={"settings-outline"} size={30} />
          </TouchableOpacity>
        </Input>
        <Input isDisabled={true} style={ProfileStyles.textViewUser}>
          <InputField
            style={ProfileStyles.fontSize20}
            value={role}
            placeholder="Role"
          />
          <Ionicons
            style={{ position: "absolute", top: "30%", left: "5%" }}
            name={"finger-print"}
            size={30}
          />
        </Input>
      </View>
      {isEditing ? (
        <>
          <Button
            size="lg"
            variant="solid"
            action="positive"
            style={ProfileStyles.btnSave}
          >
            <TouchableOpacity onPress={handleSave}>
              <ButtonText style={ProfileStyles.btnSaveText}>Save</ButtonText>
            </TouchableOpacity>
          </Button>
          <Button size="lg" variant="outline" style={ProfileStyles.btnCancle}>
            <TouchableOpacity onPress={handleCancel}>
              <ButtonText style={ProfileStyles.btnCancleText}>
                Cancel
              </ButtonText>
            </TouchableOpacity>
          </Button>
        </>
      ) : (
        <Button
          size="lg"
          variant="solid"
          action="neutral"
          style={ProfileStyles.btnEdit}
        >
          <TouchableOpacity onPress={handleEdit}>
            <ButtonText style={ProfileStyles.btnEditText}>Edit</ButtonText>
          </TouchableOpacity>
        </Button>
      )}
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
