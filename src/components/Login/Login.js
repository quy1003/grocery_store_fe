import { Button, ButtonText } from "@/components/ui/button";
import { FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlHelper, FormControlHelperText, FormControlLabel, FormControlLabelText } from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import BaseScreen from "@/src/components/BaseScreen";
import LoginStyles from "@/src/styles/LoginStyles";
import React from "react";
import { View, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
const Login = () => {
    const [inputUsername, setInputUsername] = React.useState("")
    const [inputPassword, setInputPassword] = React.useState("")
    
  return (
    <BaseScreen
      title="Login"
    //   subtitle="Find and order your fresh fruits & vegetables"
    >
      <FormControl
        style={{marginTop:'10%'}}
        size="md"
        isDisabled={false}
        isReadOnly={false}
        isRequired={false}
      >
        <Input className="my-1" style={LoginStyles.inputLogin}>
          <InputField
          style={{paddingHorizontal:10}}
            type="text"
            placeholder="Username"
            value={inputUsername}
            onChangeText={(text) => setInputUsername(text)}
          />
        </Input>
 

        <Input className="my-1" style={LoginStyles.inputLogin}>
          <InputField
          style={{paddingHorizontal:10}}
            type="password"
            placeholder="Password"
            value={inputPassword}
            onChangeText={(text) => setInputPassword(text)}
          />
        </Input>
        <Text style={{textAlign:'right'}}>Forgot your password?</Text>
      </FormControl>
        <View style={LoginStyles.mutualView}>
              <Button style={LoginStyles.btnLogin} size="lg" variant="solid" action="positive">
                <ButtonText style={LoginStyles.btnLoginText}>Log in</ButtonText>
              </Button>
        </View>

        <View style={LoginStyles.mutualView}>
              <Button style={LoginStyles.btnSubLogin} size="lg" variant="solid" action="positive">
                <ButtonText style={LoginStyles.btnTextIcon}><Ionicons name={"logo-google"} size={24} /></ButtonText>
                <ButtonText style={LoginStyles.btnSubLoginText}>Continue With Google</ButtonText>
              </Button>
              <Button style={LoginStyles.btnSubLogin} size="lg" variant="solid" action="positive">
                <ButtonText style={LoginStyles.btnTextIcon}><Ionicons name={"logo-facebook"} size={24} /></ButtonText>
                <ButtonText style={LoginStyles.btnSubLoginText}>Continue With Facebook</ButtonText>
              </Button>
        </View>
        
    </BaseScreen>
  );
};

export default Login;
