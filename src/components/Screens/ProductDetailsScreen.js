import React, { useEffect, useState } from "react";
import BaseScreen from "@/src/components/BaseScreen";
import {
  ActivityIndicator,
  Image,
  LogBox,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/FontAwesome";
import ProductDetailsStyle from "@/src/styles/ProductDetailsStyle";
import { Slider } from "@rneui/themed";
import { GET_PRODUCT_BY_SKU } from "@/src/Query/product";
import { useQuery } from "@apollo/client";

export default function ProductDetailsScreen({ route }) {
  const { sku } = route.params;
  const [product, setProduct] = useState();
  const [count, setCount] = useState(1);
  const [strengthLevel, setStrengthLevel] = useState(1);
  const [finalTotal, setFinalTotal] = useState(0);
  const [regularTotal, setRegularTotal] = useState(0);

  const { loading, error, data } = useQuery(GET_PRODUCT_BY_SKU, {
    variables: { sku },
  });
  useEffect(() => {
    if (data) {
      setProduct(data.products.items[0]);
      setFinalTotal(
        count *
          data.products.items[0].price_range.minimum_price.final_price.value
      );
      setRegularTotal(
        count *
          data.products.items[0].price_range.minimum_price.regular_price.value
      );
    }
  }, [data]);

  const star = 4.2;
  const renderStar = (value) => {
    LogBox.ignoreLogs([
      "Warning: Slider: Support for defaultProps will be removed",
    ]);
    return (
      <Icon
        name={value < 0.3 ? "star-o" : value > 0.7 ? "star" : "star-half-o"}
        size={24}
        color="#f28419"
        key={Math.random()} // Use unique key
      />
    );
  };

  const renderStarReview = (stars) => {
    const review = [];
    let tempStars = stars;
    for (let i = 1; i <= 5; i++) {
      review.push(renderStar(tempStars > 1 ? 1 : tempStars % 1));
      tempStars--;
    }
    return review;
  };

  const handleItemCount = (inc) => {
    if (count + inc <= 0) return;
    setCount(count + inc);

    setFinalTotal(
      (count + inc) * product.price_range.minimum_price.final_price.value
    );
    setRegularTotal(
      (count + inc) * product.price_range.minimum_price.regular_price.value
    );
  };

  return (
    <>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <BaseScreen
          title={product?.name}
          leftSubtitle={
            product?.stock_status == "IN_STOCK"
              ? "•   In stock"
              : "•   Out of stock"
          }
          backScreenName={"MyTabs"}
        >
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
                  {renderStarReview(product?.rating_summary)}
                </View>
                <Text style={ProductDetailsStyle.reviewCount}>
                  {"250 Likes"}
                </Text>
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
                <TouchableOpacity
                  style={ProductDetailsStyle.minus}
                  onPress={() => {
                    handleItemCount(-1);
                  }}
                >
                  <IonIcon name="remove" size={18} color="#000" />
                </TouchableOpacity>
                <Text style={ProductDetailsStyle.quantity}>{count}</Text>
                <TouchableOpacity
                  style={ProductDetailsStyle.plus}
                  onPress={() => {
                    handleItemCount(1);
                  }}
                >
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
                    value={strengthLevel}
                    onValueChange={setStrengthLevel}
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
                    {strengthLevel}
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
              {/* {regularTotal !== finalTotal && (
                <Text style={ProductDetailsStyle.reTotal}>
                  {regularTotal.toFixed(2)}{" "}
                  {product?.price_range.minimum_price.regular_price.currency}
                </Text>
              )} */}
              <Text style={ProductDetailsStyle.total}>
                {finalTotal.toFixed(2)}{" "}
                {product?.price_range.minimum_price.regular_price.currency}
              </Text>
            </View>
            <TouchableOpacity style={ProductDetailsStyle.btnAddToCart}>
              <Text style={ProductDetailsStyle.btnUnitActiveText}>
                Add to cart
              </Text>
            </TouchableOpacity>
          </View>
        </BaseScreen>
      )}
    </>
  );
}
