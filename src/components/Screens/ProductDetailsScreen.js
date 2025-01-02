import React, { useState } from "react";
import BaseScreen from "@/src/components/BaseScreen";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/FontAwesome";
import ProductDetailsStyle from "@/src/styles/ProductDetailsStyle";
import { Slider } from "@rneui/themed";

export default function ProductDetailsScreen({
  productName = "Watermelon",
  productStatus = "•   In stock",
}) {
  const star = 4.6;
  const [sliderValue, setSliderValue] = useState(2); // State for slider value

  const renderStar = (value) => {
    return (
      <Icon
        name={
          value < 0.3
            ? "star-o"
            : value > 0.7
            ? "star"
            : "star-half-o"
        }
        size={24}
        color="#f28419"
        key={Math.random()} // Use unique key
      />
    );
  };

  const renderStarReview = (stars) => {
    const review = [];
    for (let i = 1; i <= Math.floor(stars); i++) {
      review.push(renderStar(1));
    }
    if (stars % 1 !== 0) {
      review.push(renderStar(stars % 1));
    }
    return review;
  };

  return (
    <BaseScreen title={productName} leftSubtitle={productStatus}>
      <View style={ProductDetailsStyle.container}>
        {/* Product Info */}
        <View style={ProductDetailsStyle.productInfo}>
          <Image
            source={{
              uri: "https://cdn.tgdd.vn/Products/Images/8788/226930/bhx/dua-hau-do-202402271437411608.jpg",
            }}
            style={ProductDetailsStyle.img}
          />
          <View style={ProductDetailsStyle.reviewContainer}>
            <View style={ProductDetailsStyle.starsContainer}>
              {renderStarReview(star)}
            </View>
            <Text style={ProductDetailsStyle.reviewCount}>{"250 Likes"}</Text>
          </View>
        </View>

        {/* Quantity Selection */}
        <View>
          <Text style={ProductDetailsStyle.title}>Quantity</Text>
          <View style={ProductDetailsStyle.unitContainer}>
            <TouchableOpacity style={ProductDetailsStyle.btnUnit}>
              <Text style={ProductDetailsStyle.btnUnitText}>1 per kg</Text>
            </TouchableOpacity>
            <TouchableOpacity style={ProductDetailsStyle.btnUnitActive}>
              <Text style={ProductDetailsStyle.btnUnitActiveText}>
                500 grams
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={ProductDetailsStyle.btnUnit}>
              <Text style={ProductDetailsStyle.btnUnitText}>2 per kg</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Item Count Control */}
        <View style={ProductDetailsStyle.quantityWrapper}>
          <Text style={ProductDetailsStyle.title}>Item Count</Text>
          <View style={ProductDetailsStyle.quantityControll}>
            <TouchableOpacity style={ProductDetailsStyle.minus}>
              <IonIcon name="remove" size={18} color="#000" />
            </TouchableOpacity>
            <Text style={ProductDetailsStyle.quantity}>12</Text>
            <TouchableOpacity style={ProductDetailsStyle.plus}>
              <IonIcon name="add" size={18} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Strength Level */}
        <View>
          <Text style={ProductDetailsStyle.title}>Strength Level</Text>
          <View style={ProductDetailsStyle.wrapper}>
            <View style={ProductDetailsStyle.sliderContainer}>
              <Slider
                value={sliderValue}
                onValueChange={setSliderValue}
                maximumValue={10}
                minimumValue={0}
                step={1}
                allowTouchTrack
                trackStyle={{ height: 5, backgroundColor: "#44994d" }}
                minimumTrackTintColor="#44994d"
                thumbStyle={{
                  height: 20,
                  width: 20,
                  backgroundColor: "#e9f7e3",
                }}
              />
            </View>
            <View style={ProductDetailsStyle.strengthValue}>
              <Text style={ProductDetailsStyle.currentStrengthValue}>
                {sliderValue}
              </Text>
              <Text style={ProductDetailsStyle.currentStrengthMaxValue}>
                /10
              </Text>
            </View>
          </View>
        </View>

        {/* Total Price and Add to Cart */}
        <View style={ProductDetailsStyle.totalContainer}>
          <Text style={ProductDetailsStyle.totalText}>Total: </Text>
          <Text style={ProductDetailsStyle.total}>$15.00</Text>
        </View>
        <TouchableOpacity style={ProductDetailsStyle.btnAddToCart}>
          <Text style={ProductDetailsStyle.btnUnitActiveText}>Add to cart</Text>
        </TouchableOpacity>
      </View>
    </BaseScreen>
  );
}
