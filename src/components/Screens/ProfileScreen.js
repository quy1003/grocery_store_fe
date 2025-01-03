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

const ProfileScreen = () => {
  const [, dispatch] = useContext(UserContext);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");

      dispatch({ type: "LOGOUT" });

      Alert.alert("Logout successfully!", "You just exited our application");
    } catch (error) {
      console.info("Error:", error);
    }
  };
  
  return (
    <BaseScreen title="User Profile" subtitle="">
      <Avatar size="2xl" style={{ flex: 1, alignItems: "center", marginTop: "-20%" }}>
        <AvatarImage
          source={{
            uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
          }}
          borderRadius={70}
          width={140}
          height={140}
        />
        <AvatarFallbackText style={{ textAlign: "center", padding: 10 }}>
          John Wick
        </AvatarFallbackText>
        <AvatarBadge />
      </Avatar>
      <View
        style={ProfileStyles.infoView}
      >
        <View style={ProfileStyles.textViewUser}>
          <Text style={ProfileStyles.fontSize20}>Username: John Wicker</Text>
        </View>
        <View style={ProfileStyles.textViewUser}>
          <Text style={ProfileStyles.fontSize20}>Phone: +8495942943</Text>
        </View>
        <View style={ProfileStyles.textViewUser}>
          <Text style={ProfileStyles.fontSize20}>Email: john@gmail.com</Text>
        </View>
        <View style={ProfileStyles.textViewUser}>
          <Text style={ProfileStyles.fontSize20}>Address: 78, Texas, America</Text>
        </View>
      </View>
      <Button
        size="lg"
        variant="solid"
        action="negative"
        style={ProfileStyles.btnLogout}
      >
        <TouchableOpacity onPress={handleLogout}>
        <ButtonText
          style={ProfileStyles.btnLogoutText}
        >
        
          Log out
        </ButtonText>
        <ButtonText style={{position:'absolute', top:'18%', right: 15}}><Ionicons name={"arrow-forward-circle-outline"} size={30} /></ButtonText>
        </TouchableOpacity>
      </Button>
      <View style={{ height: "33%" }}></View>
    </BaseScreen>
  );
};

export default ProfileScreen;
