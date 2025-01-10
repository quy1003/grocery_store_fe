import {
  GET_CUSTOMER_CART,
  UPDATE_CART_ITEM_QUANTITY,
  REMOVE_ITEM_FROM_CART,
} from "@/src/Query/cart";
import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
} from "react-native";
import { useQuery, useMutation } from "@apollo/client";
import CartStyles from "@/src/styles/CartStyles";

const CartScreen = () => {
  const { loading, error, data, startPolling, stopPolling } = useQuery(
    GET_CUSTOMER_CART,
    {
      pollInterval: 1000,
      fetchPolicy: "network-only",
    }
  );

  const [updateQuantity] = useMutation(UPDATE_CART_ITEM_QUANTITY);
  const [removeItem] = useMutation(REMOVE_ITEM_FROM_CART);

  useEffect(() => {
    startPolling(1000);

    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);

  if (loading && !data) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading cart</Text>;

  const cartItems = data?.customerCart?.items || [];
  const totalAmount = data?.customerCart?.prices?.grand_total?.value || 0;

  const handleQuantityChange = async (itemId, quantity) => {
    if (quantity === 0) {
      try {
        await removeItem({
          variables: {
            cartId: data.customerCart.id,
            cartItemId: parseInt(itemId),
          },

          optimisticResponse: {
            removeItemFromCart: {
              cart: {
                items: cartItems.filter((item) => item.id !== itemId),
                __typename: "Cart",
              },
              __typename: "RemoveItemFromCartOutput",
            },
          },
        });
      } catch (error) {
        console.error("Error removing item:", error);
      }
    } else {
      try {
        await updateQuantity({
          variables: {
            cartId: data.customerCart.id,
            cartItemId: parseInt(itemId),
            quantity: quantity,
          },

          optimisticResponse: {
            updateCartItems: {
              cart: {
                items: cartItems.map((item) =>
                  item.id === itemId
                    ? { ...item, quantity, __typename: "CartItem" }
                    : item
                ),
                __typename: "Cart",
              },
              __typename: "UpdateCartItemsOutput",
            },
          },
        });
      } catch (error) {
        console.error("Error updating quantity:", error);
      }
    }
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
    // Replace the domain in the image URL
    const fixedImageUrl = item.product.image.url.replace(
      "https://app.grocery-store.test",
      "https://magento.quythanh.tk"
    );

    return (
      <View key={item.id} style={CartStyles.itemCard}>
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
    );
  };

  return (
    <SafeAreaView style={CartStyles.container}>
      <View style={CartStyles.header}>
        <TouchableOpacity>
          <Text style={CartStyles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={CartStyles.headerTitle}>Shopping Cart</Text>
        <Text style={CartStyles.itemCount}>
          A total of {cartItems.length} pieces
        </Text>
      </View>

      <ScrollView style={CartStyles.itemsContainer}>
        {cartItems.map(renderCartItem)}
      </ScrollView>

      <View style={CartStyles.footer}>
        <View style={CartStyles.totalContainer}>
          <Text style={CartStyles.totalLabel}>Total: </Text>
          <Text style={CartStyles.totalAmount}>${totalAmount}</Text>
        </View>
        <TouchableOpacity style={CartStyles.continueButton}>
          <Text style={CartStyles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;
