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
  const renderStar = (star) => {
    return (
      <Icon
        name={star < 0.3 ? "star-o" : star > 0.7 ? "star" : "star-half-o"}
        size={24}
        fontWeight={"100"}
        color="#f28419"
        key={star}
      />
    );
  };

  const renderStarReview = (star) => {
    const review = [];
    const half = star - Math.floor(star);
    for (let i = 1; i <= star; i++) {
      review.push(renderStar(i));
    }
    review.push(renderStar(half));
    return review;
  };
  return (
    <BaseScreen title={productName} leftSubtitle={productStatus}>
      <View style={ProductDetailsStyle.container}>
        <View style={ProductDetailsStyle.productInfo}>
          <Image
            source={{
              uri: "https://cdn.tgdd.vn/Products/Images/8788/226930/bhx/dua-hau-do-202402271437411608.jpg",
            }}
            alt="image"
            style={ProductDetailsStyle.img}
          />
          <View style={ProductDetailsStyle.reviewContainer}>
            <View style={ProductDetailsStyle.starsContainer}>
              {renderStarReview(star)}
            </View>
            <Text style={ProductDetailsStyle.reviewCount}>{"250 Likes"}</Text>
          </View>
        </View>

        <View>
          <Text style={ProductDetailsStyle.title}>Quantity</Text>
          <View style={ProductDetailsStyle.unitContainer}>
            <TouchableOpacity style={ProductDetailsStyle.btnUnit}>
              <Text style={ProductDetailsStyle.btnUnitText}>1 per kg </Text>
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
        {/* Increase/decrease quantity button */}
        <View style={ProductDetailsStyle.quantityWrapper}>
          <Text style={ProductDetailsStyle.title}>Item Count</Text>
          <View style={ProductDetailsStyle.quantityControll}>
            <TouchableOpacity style={ProductDetailsStyle.minus}>
              <IonIcon name={"remove"} size={18} color="" />
            </TouchableOpacity>
            <Text style={ProductDetailsStyle.quantity}>12</Text>
            <TouchableOpacity style={ProductDetailsStyle.plus}>
              <IonIcon name={"add"} size={18} color="" />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text style={ProductDetailsStyle.title}>Strength Level</Text>
          <View style={ProductDetailsStyle.wrapper}>
            <View style={ProductDetailsStyle.sliderContainer}>
              <Slider
                // value={value}
                // onValueChange={setValue}
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
              <Text style={ProductDetailsStyle.currentStrengthValue}>2</Text>
              <Text style={ProductDetailsStyle.currentStrengthMaxValue}>
                /5
              </Text>
            </View>
          </View>
          <View style={ProductDetailsStyle.totalContainer}>
            <Text style={ProductDetailsStyle.totalText}>Total: </Text>
            <Text style={ProductDetailsStyle.total}>$15.00</Text>
          </View>
          <TouchableOpacity style={ProductDetailsStyle.btnAddToCart}>
            <Text style={ProductDetailsStyle.btnUnitActiveText}>
              Add to cart
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </BaseScreen>
  );
}
