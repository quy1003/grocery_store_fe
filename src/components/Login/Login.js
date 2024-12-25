import { Button, ButtonText } from "@/components/ui/button";
import { FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlHelper, FormControlHelperText, FormControlLabel, FormControlLabelText } from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import BaseScreen from "@/src/components/BaseScreen";
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
        <Input className="my-1" style={{backgroundColor:'#98FB98', marginBottom:20, padding:8, borderRadius: 25}}>
          <InputField
          style={{paddingHorizontal:10}}
            type="text"
            placeholder="Username"
            value={inputUsername}
            onChangeText={(text) => setInputUsername(text)}
          />
        </Input>
 

        <Input className="my-1" style={{backgroundColor:'#98FB98', marginBottom:5, padding: 8, borderRadius: 25}}>
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
        <View style={{flex:1, alignItems:'center', marginTop:30}}>
              <Button style={{marginBottom:10, borderRadius:35, backgroundColor:'#228B22', width:'100%'}} size="lg" variant="solid" action="positive">
                <ButtonText style={{paddingVertical:18, textAlign:'center', color:'white', fontWeight:'bold'}}>Log in</ButtonText>
              </Button>
        </View>

        <View style={{flex:1, alignItems:'center', marginTop:30}}>
              <Button style={{marginBottom:40, borderRadius:35, backgroundColor:'#98FB98', width:'100%'}} size="lg" variant="solid" action="positive">
                <ButtonText style={{position:'absolute', top:15, left: '20%'}}><Ionicons name={"logo-google"} size={24} /></ButtonText>
                <ButtonText style={{paddingVertical:18,position:'relative', textAlign:'center', color:'black', fontWeight:'bold'}}>Continue With Google</ButtonText>
              </Button>
              <Button style={{marginBottom:40, borderRadius:35, backgroundColor:'#98FB98', width:'100%'}} size="lg" variant="solid" action="positive">
                <ButtonText style={{position:'absolute', top:15, left: '20%'}}><Ionicons name={"logo-facebook"} size={24} /></ButtonText>
                <ButtonText style={{paddingVertical:18,position:'relative', textAlign:'center', color:'black', fontWeight:'bold'}}>Continue With Google</ButtonText>
              </Button>
        </View>
        
    </BaseScreen>
  );
};

export default Login;
