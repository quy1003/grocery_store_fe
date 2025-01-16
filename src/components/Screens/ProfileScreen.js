import { UserContext } from "@/App";
import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import BaseScreen from "@/src/components/BaseScreen";
import ProfileStyles from "@/src/styles/ProfileStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext } from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const ProfileScreen = ({ navigation }) => {
  const [user, dispatch] = useContext(UserContext);
  const handleLogout = async () => {
    try {
      dispatch({ type: "LOGOUT" });

      Alert.alert("Logout successfully!", "You just exited our application");
      navigation.replace("Login");
    } catch (error) {
      console.info("Error:", error);
    }
  };

  return (
    <BaseScreen title="User Profile" subtitle="">
      <Avatar
        size="2xl"
        style={{ flex: 1, alignItems: "center", marginTop: "-20%" }}
      >
        <AvatarImage
          source={{
            uri: `https://ui-avatars.com/api/?name=${user._j.firstname}}`,
          }}
          borderRadius={70}
          width={140}
          height={140}
        />
        <AvatarFallbackText style={{ textAlign: "center", padding: 10 }}>
          {user ? user._j.firstname : "Nothing"}
        </AvatarFallbackText>
        <AvatarBadge />
      </Avatar>
      <View style={ProfileStyles.infoView}>
        <View style={ProfileStyles.textViewUser}>
          <Text style={ProfileStyles.fontSize20}>
            Username:{" "}
            {user
              ? user._j.firstname + " " + user._j.lastname
              : "Nothing to show"}
          </Text>
        </View>
        <View style={ProfileStyles.textViewUser}>
          <Text style={ProfileStyles.fontSize20}>
            Email: {user ? user._j.email : "Nothing to show"}
          </Text>
        </View>
        <View style={ProfileStyles.textViewUser}>
          <Text style={ProfileStyles.fontSize20}>
            Role: {user ? user._j.__typename : "Nothing to show"}
          </Text>
        </View>
      </View>
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
