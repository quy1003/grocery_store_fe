import { Button, ButtonText } from '@/components/ui/button';
import React from 'react';
import { Text, ImageBackground, StyleSheet, SafeAreaView, Dimensions, View } from 'react-native';

// Lấy kích thước màn hình
const { height, width } = Dimensions.get('window');

const Welcome = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={{
          uri: 'https://media.istockphoto.com/id/1718516554/photo/full-frame-of-assortment-of-healthy-and-fresh-fruits.webp?a=1&b=1&s=612x612&w=0&k=20&c=R5kRarCiJjLmzKIEv_8NEEscMdesZFWwYqxnDyJ7E2s=',
        }}
        style={{ width, height }}
        resizeMode="cover"
        blurRadius={1}
      >
        <View style={{height:'30%'}}></View>
        <View style={{width:'70%', marginLeft:'5%'}}>
            <Text style={[styles.text, styles.textTitile]}>Grocery Store</Text>
            <Text style={styles.text}>Find and order</Text>
            <Text style={styles.text}>High quality</Text>
            <Text style={styles.text}>Fruits & vegetables</Text>
        </View>
        <View style={{height:'20%'}}></View>
        <View style={{flex:1, alignItems:'center'}}>
        <Button style={{marginBottom:10, borderRadius:35, width:'90%', height:50}} size="lg" variant="solid" action="positive">
          <ButtonText style={{paddingVertical:5}}>Log in</ButtonText>
        </Button>
        <Button style={{marginBottom:10, borderRadius:35, width:'90%', height:50}} size="lg" variant="solid" action="positive">
          <ButtonText style={{paddingVertical:5}}>Sign up</ButtonText>
        </Button>
        </View>

      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    textTitile:{
        fontSize:32,
        marginBottom: 10
    },
  text: {
    color: 'whitesmoke',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlign:'left' ,
    marginLeft:'15px',
  },
});

export default Welcome;
