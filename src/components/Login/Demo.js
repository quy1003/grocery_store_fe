import { Image } from '@/components/ui/image';
import MutualStyles from '@/src/styles/MutualStyles';
import React, { useState, useEffect } from 'react';
import { Text, Dimensions } from 'react-native';
import Animated, { Easing, withTiming, useSharedValue, useAnimatedStyle } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const DemoComponent = ({ onFinish }) => {
  const opacity = useSharedValue(1); 
  const translateX = useSharedValue(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      opacity.value = withTiming(0, { duration: 1000, easing: Easing.ease });
      translateX.value = withTiming(width, { duration: 1000, easing: Easing.ease });
    }, 3500);
    setTimeout(onFinish, 4500);

    return () => clearTimeout(timer);
  }, [opacity, translateX, onFinish]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <Animated.View style={[animatedStyle]}>
      <Image
        size="md"
        source={{
          uri: "https://images.unsplash.com/photo-1516594798947-e65505dbb29d?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        }}
        alt="Grocery Store"
        width={300}
        height={300}
        borderRadius={150}
        style={{position:'relative'}}
      />
      <Text style={MutualStyles.WelcomeTextDemo}>404 Grocery Store</Text>
    </Animated.View>
  );
};

export default DemoComponent;
