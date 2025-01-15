import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
  Animated,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  GestureHandlerRootView,
  Swipeable,
  RectButton,
} from "react-native-gesture-handler";
import {
  GET_CUSTOMER_CART,
  UPDATE_CART_ITEM_QUANTITY,
  REMOVE_ITEM_FROM_CART,
} from "@/src/Query/cart";
import { useQuery, useMutation } from "@apollo/client";
import CartStyles from "@/src/styles/CartStyles";
import { IMAGE_URL_DOMAIN, BASE_IMAGE_URL } from "@env";

const CART_CACHE_KEY = "cart_data_cache";
const CART_CACHE_TIMESTAMP = "cart_cache_timestamp";
const CACHE_DURATION = 5 * 60 * 1000;

const EmptyCart = ({ onShopNow }) => {
  return (
    <View style={CartStyles.emptyContainer}>
      <View style={CartStyles.emptyContent}>
        <Ionicons
          name="cart-outline"
          size={120}
          color="#CCCCCC"
          style={CartStyles.emptyIcon}
        />
        <Text style={CartStyles.emptyTitle}>Your cart is empty</Text>
        <Text style={CartStyles.emptyText}>
          Looks like you haven't added anything to your cart yet
        </Text>
        <TouchableOpacity style={CartStyles.shopNowButton} onPress={onShopNow}>
          <Text style={CartStyles.shopNowButtonText}>Start Shopping</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const CartScreen = ({ navigation }) => {
  const [localCart, setLocalCart] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);

  const { loading, error, data, startPolling, stopPolling, refetch } = useQuery(
    GET_CUSTOMER_CART,
    {
      fetchPolicy: "network-only",
      nextFetchPolicy: "cache-and-network",
      notifyOnNetworkStatusChange: true,
      onError: (error) => {
        console.error("Cart query error:", error);
      },
    }
  );

  const [updateQuantity] = useMutation(UPDATE_CART_ITEM_QUANTITY);
  const [removeItem] = useMutation(REMOVE_ITEM_FROM_CART);

  const calculateTotal = (items) => {
    if (!items) return 0;
    return items.reduce((sum, item) => {
      const itemPrice =
        item.product.price_range.minimum_price.regular_price.value;
      return sum + itemPrice * item.quantity;
    }, 0);
  };

  const loadCachedCart = async () => {
    try {
      const cachedTimestamp = await AsyncStorage.getItem(CART_CACHE_TIMESTAMP);
      if (cachedTimestamp) {
        const timestamp = parseInt(cachedTimestamp);
        const now = Date.now();

        if (now - timestamp < CACHE_DURATION) {
          const cachedCart = await AsyncStorage.getItem(CART_CACHE_KEY);
          if (cachedCart) {
            const parsedCart = JSON.parse(cachedCart);
            setLocalCart(parsedCart);
            setTotalAmount(calculateTotal(parsedCart?.customerCart?.items));
          }
        }
      }
    } catch (error) {
      console.error("Error loading cached cart:", error);
    }
  };

  const updateCartCache = async (cartData) => {
    try {
      await AsyncStorage.setItem(CART_CACHE_KEY, JSON.stringify(cartData));
      await AsyncStorage.setItem(CART_CACHE_TIMESTAMP, Date.now().toString());
    } catch (error) {
      console.error("Error caching cart data:", error);
    }
  };

  const handleShopNow = () => {
    navigation.navigate("Home");
  };

  useEffect(() => {
    const initializeCart = async () => {
      await loadCachedCart();
      try {
        const result = await refetch();
        if (result.data) {
          await updateCartCache(result.data);
          setLocalCart(result.data);
          setTotalAmount(calculateTotal(result.data?.customerCart?.items));
        }
      } catch (err) {
        console.error("Refetch error:", err);
      }
    };

    initializeCart();
    startPolling(30000);

    return () => {
      stopPolling();
    };
  }, []);

  const handleQuantityChange = async (itemId, quantity) => {
    if (quantity === 0) {
      await handleRemoveItem(itemId);
      return;
    }

    try {
      const currentCart = localCart || data;
      const updatedItems = currentCart.customerCart.items.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      );

      const updatedCart = {
        ...currentCart,
        customerCart: {
          ...currentCart.customerCart,
          items: updatedItems,
        },
      };

      const newTotal = calculateTotal(updatedItems);
      setTotalAmount(newTotal);

      setLocalCart(updatedCart);
      await updateCartCache(updatedCart);

      await updateQuantity({
        variables: {
          cartId: currentCart.customerCart.id,
          cartItemId: parseInt(itemId),
          quantity: quantity,
        },
      });
    } catch (error) {
      console.error("Error updating quantity:", error);
      setLocalCart(data);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      const currentCart = localCart || data;
      const updatedItems = currentCart.customerCart.items.filter(
        (item) => item.id !== itemId
      );

      const updatedCart = {
        ...currentCart,
        customerCart: {
          ...currentCart.customerCart,
          items: updatedItems,
        },
      };

      const newTotal = calculateTotal(updatedItems);
      setTotalAmount(newTotal);

      setLocalCart(updatedCart);
      await updateCartCache(updatedCart);

      await removeItem({
        variables: {
          cartId: currentCart.customerCart.id,
          cartItemId: parseInt(itemId),
        },
      });
    } catch (error) {
      console.error("Error removing item:", error);
      setLocalCart(data);
    }
  };

  const renderRightActions = (progress, dragX, itemId) => {
    const trans = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [0, 100],
    });

    return (
      <RectButton
        style={CartStyles.deleteButton}
        onPress={() => handleRemoveItem(itemId)}
      >
        <Animated.View
          style={[
            CartStyles.deleteButtonContainer,
            {
              transform: [{ translateX: trans }],
            },
          ]}
        >
          <Ionicons name="trash-outline" size={24} color="#fff" />
        </Animated.View>
      </RectButton>
    );
  };

  const renderSelectedOptions = (item) => {
    const options = [];

    if (item.configurable_options?.length > 0) {
      item.configurable_options.forEach((option) => {
        options.push(
          <Text key={option.option_label} style={CartStyles.optionText}>
            {option.option_label}: {option.value_label}
          </Text>
        );
      });
    }

    if (item.customizable_options?.length > 0) {
      item.customizable_options.forEach((option) => {
        options.push(
          <Text key={option.label} style={CartStyles.optionText}>
            {option.label}: {option.values[0]?.label}
          </Text>
        );
      });
    }

    return options.length > 0 ? (
      <View style={CartStyles.optionsContainer}>{options}</View>
    ) : null;
  };

  const renderCartItem = (item) => {
    const fixedImageUrl = item.product.image.url.replace(
      BASE_IMAGE_URL,
      IMAGE_URL_DOMAIN
    );

    return (
      <Swipeable
        key={item.id}
        renderRightActions={(progress, dragX) =>
          renderRightActions(progress, dragX, item.id)
        }
        rightThreshold={-100}
        overshootRight={false}
      >
        <View style={CartStyles.itemCard}>
          <Image source={{ uri: fixedImageUrl }} style={CartStyles.itemImage} />
          <View style={CartStyles.itemInfo}>
            <Text style={CartStyles.itemName}>{item.product.name}</Text>
            {renderSelectedOptions(item)}
            <Text style={CartStyles.itemPrice}>
              ${item.product.price_range.minimum_price.regular_price.value}
            </Text>
          </View>
          <View style={CartStyles.quantityControls}>
            <TouchableOpacity
              style={CartStyles.quantityButton}
              onPress={() => handleQuantityChange(item.id, item.quantity - 1)}
            >
              <Text style={CartStyles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={CartStyles.quantityText}>{item.quantity}</Text>
            <TouchableOpacity
              style={CartStyles.quantityButton}
              onPress={() => handleQuantityChange(item.id, item.quantity + 1)}
            >
              <Text style={CartStyles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Swipeable>
    );
  };

  const cartData = localCart || data;
  const cartItems = cartData?.customerCart?.items || [];

  if (loading && !cartData) {
    return (
      <SafeAreaView style={CartStyles.container}>
        <View style={CartStyles.loadingContainer}>
          <Text>Loading cart...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error && !cartData?.customerCart?.items) {
    return (
      <SafeAreaView style={CartStyles.container}>
        <View style={CartStyles.errorContainer}>
          <Text>Unable to load cart</Text>
          <TouchableOpacity
            style={CartStyles.retryButton}
            onPress={() => refetch()}
          >
            <Text style={CartStyles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (!loading && cartItems.length === 0) {
    return (
      <SafeAreaView style={CartStyles.container}>
        <View style={CartStyles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={CartStyles.backButton}>←</Text>
          </TouchableOpacity>
          <Text style={CartStyles.headerTitle}>Shopping Cart</Text>
          <Text style={CartStyles.itemCount}>0 items</Text>
        </View>
        <EmptyCart onShopNow={handleShopNow} />
      </SafeAreaView>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={CartStyles.container}>
        <View style={CartStyles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={CartStyles.backButton}>←</Text>
          </TouchableOpacity>
          <Text style={CartStyles.headerTitle}>Shopping Cart</Text>
          <Text style={CartStyles.itemCount}>
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
          </Text>
        </View>

        <ScrollView style={CartStyles.itemsContainer}>
          {cartItems.map(renderCartItem)}
        </ScrollView>

        <View style={CartStyles.footer}>
          <View style={CartStyles.totalContainer}>
            <Text style={CartStyles.totalLabel}>Total: </Text>
            <Text style={CartStyles.totalAmount}>
              ${totalAmount.toFixed(2)}
            </Text>
          </View>
          <TouchableOpacity
            style={CartStyles.continueButton}
            onPress={() => {
              navigation.navigate("Checkout");
            }}
          >
            <Text style={CartStyles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default CartScreen;
