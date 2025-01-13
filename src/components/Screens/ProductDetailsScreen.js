import React, { useEffect, useState } from "react";
import BaseScreen from "@/src/components/BaseScreen";
import {
  ActivityIndicator,
  Image,
  LogBox,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/FontAwesome";
import ProductDetailsStyle from "@/src/styles/ProductDetailsStyle";
import { Slider } from "@rneui/themed";
import { GET_PRODUCT_BY_SKU } from "@/src/Query/product";
import { useQuery, useMutation } from "@apollo/client";
import { CREATE_CART, ADD_PRODUCT_TO_CART } from "@/src/Query/cart";
import {
  REMOVE_FROM_WISHLIST,
  GET_WISHLIST,
  ADD_TO_WISHLIST,
} from "@/src/Query/favorite";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProductDetailsScreen({ route, navigation }) {
  const { sku } = route.params;
  const [product, setProduct] = useState();
  const [count, setCount] = useState(1);
  const [strengthLevel, setStrengthLevel] = useState(1);
  const [finalTotal, setFinalTotal] = useState(0);
  const [regularTotal, setRegularTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [wishlistItemId, setWishlistItemId] = useState(null);

  const { loading, error, data } = useQuery(GET_PRODUCT_BY_SKU, {
    variables: { sku },
  });
  const { data: wishlistData, refetch: refetchWishlist } =
    useQuery(GET_WISHLIST);

  const [createCart] = useMutation(CREATE_CART);
  const [addToCart] = useMutation(ADD_PRODUCT_TO_CART);
  const [addToWishlist] = useMutation(ADD_TO_WISHLIST);
  const [removeFromWishlist] = useMutation(REMOVE_FROM_WISHLIST);

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

  useEffect(() => {
    if (wishlistData?.customer?.wishlist?.items) {
      const wishlistItem = wishlistData.customer.wishlist.items.find(
        (item) => item.product.sku === sku
      );
      setIsFavorite(!!wishlistItem);
      if (wishlistItem) {
        setWishlistItemId(wishlistItem.id);
      }
    }
  }, [wishlistData, sku]);

  const toggleFavorite = async () => {
    try {
      if (isFavorite && wishlistItemId) {
        await removeFromWishlist({
          variables: { wishlistItemId },
        });
        setIsFavorite(false);
        setWishlistItemId(null);
        Alert.alert("Success", "Product removed from wishlist");
      } else {
        const { data } = await addToWishlist({
          variables: { sku },
        });
        if (data?.addProductsToWishlist?.wishlist) {
          setIsFavorite(true);
          const newItem = data.addProductsToWishlist.wishlist.items.find(
            (item) => item.product.sku === sku
          );
          if (newItem) {
            setWishlistItemId(newItem.id);
          }
          Alert.alert("Success", "Product added to wishlist");
        }
      }
      refetchWishlist();
    } catch (error) {
      console.error("Error toggling wishlist:", error);
      Alert.alert("Error", "Failed to update wishlist");
    }
  };

  const getOrCreateCart = async () => {
    try {
      const cartId = await AsyncStorage.getItem("@shopping_cart_id");

      if (cartId) {
        return cartId;
      }

      const { data } = await createCart();
      const newCartId = data.createEmptyCart;

      await AsyncStorage.setItem("@shopping_cart_id", newCartId);
      return newCartId;
    } catch (error) {
      console.error("Error in getOrCreateCart:", error);
      throw new Error("Failed to initialize shopping cart");
    }
  };

  const handleAddToCart = async () => {
    if (!product || product.stock_status !== "IN_STOCK") {
      Alert.alert("Error", "Product is out of stock");
      return;
    }

    setIsLoading(true);
    try {
      const cartId = await getOrCreateCart();

      const { data: addToCartData } = await addToCart({
        variables: {
          cartId,
          sku: product.sku,
          quantity: count,
        },
      });

      if (addToCartData?.addSimpleProductsToCart?.cart) {
        Alert.alert("Success", "Product added to cart successfully", [
          {
            text: "Continue Shopping",
            onPress: () => navigation.goBack(),
            style: "cancel",
          },
          {
            text: "Go to Cart",
            onPress: () => navigation.navigate("MyTabs", { screen: "Cart" }),
          },
        ]);
      }
    } catch (error) {
      console.error("Error in handleAddToCart:", error);
      Alert.alert("Error", "Failed to add product to cart. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

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
        key={Math.random()}
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
        <View style={ProductDetailsStyle.loadingContainer}>
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
          rightComponent={
            <TouchableOpacity
              onPress={toggleFavorite}
              style={ProductDetailsStyle.favoriteButton}
              disabled={isLoading}
            >
              <IonIcon
                name={isFavorite ? "heart" : "heart-outline"}
                size={28}
                color="#fff"
              />
            </TouchableOpacity>
          }
        >
          <View style={ProductDetailsStyle.container}>
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
            <View style={ProductDetailsStyle.totalContainer}>
              <Text style={ProductDetailsStyle.totalText}>Total: </Text>
              <Text style={ProductDetailsStyle.total}>
                {finalTotal.toFixed(2)}{" "}
                {product?.price_range.minimum_price.regular_price.currency}
              </Text>
            </View>
            <TouchableOpacity
              style={[
                ProductDetailsStyle.btnAddToCart,
                (isLoading || product?.stock_status !== "IN_STOCK") && {
                  opacity: 0.7,
                },
              ]}
              onPress={handleAddToCart}
              disabled={isLoading || product?.stock_status !== "IN_STOCK"}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={ProductDetailsStyle.btnUnitActiveText}>
                  Add to cart
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </BaseScreen>
      )}
    </>
  );
}
