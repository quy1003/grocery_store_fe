import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Modal,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useQuery, useMutation } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons";
import { IMAGE_URL_DOMAIN, BASE_IMAGE_URL } from "@env";
import { GET_WISHLIST, REMOVE_FROM_WISHLIST } from "@/src/Query/favorite";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";
import FavoriteStyles from "@/src/styles/FavoriteStyles";
import BaseScreen from "../BaseScreen";
import CustomModal from "@/src/mutuals/CustomModal";

const WISHLIST_STORAGE_KEY = "@wishlist_items";

const EmptyFavorites = ({ navigation }) => (
  <View style={FavoriteStyles.emptyContainer}>
    <Ionicons name="heart-outline" size={80} color="#bfeca1" />
    <Text style={FavoriteStyles.emptyTitle}>Your favorites list is empty</Text>
    <Text style={FavoriteStyles.emptySubtitle}>
      Items added to your favorites will appear here
    </Text>
    <TouchableOpacity
      style={FavoriteStyles.startShoppingButton}
      onPress={() => navigation.navigate("Home")}
    >
      <Text style={FavoriteStyles.startShoppingText}>Start Shopping</Text>
    </TouchableOpacity>
  </View>
);

const FavoriteScreen = ({ navigation }) => {
  const [localWishlistItems, setLocalWishlistItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const swipeableRefs = useRef(new Map());

  const { data, refetch } = useQuery(GET_WISHLIST, {
    fetchPolicy: "cache-and-network",
    onCompleted: async (data) => {
      if (data?.customer?.wishlist?.items) {
        await saveWishlistToStorage(data.customer.wishlist.items);
        setLocalWishlistItems(data.customer.wishlist.items);
      }
      setIsLoading(false);
    },
  });

  const [removeFromWishlist] = useMutation(REMOVE_FROM_WISHLIST, {
    onError: (error) => {
      console.error("Remove from wishlist error:", error);
    },
  });

  useEffect(() => {
    loadWishlistFromStorage();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      refetch();
    });
    return unsubscribe;
  }, [navigation, refetch]);

  const saveWishlistToStorage = async (items) => {
    try {
      await AsyncStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error("Error saving wishlist:", error);
    }
  };

  const loadWishlistFromStorage = async () => {
    try {
      const storedItems = await AsyncStorage.getItem(WISHLIST_STORAGE_KEY);
      if (storedItems) {
        setLocalWishlistItems(JSON.parse(storedItems));
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading wishlist:", error);
      setIsLoading(false);
    }
  };

  const handleDeleteItem = async () => {
    try {
      const updatedItems = localWishlistItems.filter(
        (item) => item.id !== itemToDelete,
      );
      setLocalWishlistItems(updatedItems);
      await saveWishlistToStorage(updatedItems);

      await removeFromWishlist({
        variables: {
          wishlistId: data?.customer?.wishlist?.id,
          wishlistItemsIds: [itemToDelete],
        },
      });
      setModalVisible(false);
      setItemToDelete(null);
    } catch (error) {
      console.error("Delete error:", error);
      loadWishlistFromStorage();
    }
  };

  const showDeleteConfirmation = (itemId) => {
    setItemToDelete(itemId);
    setModalVisible(true);
  };

  const renderRightActions = (itemId) => {
    return (
      <View style={{ width: "25%" }}>
        <TouchableOpacity
          style={FavoriteStyles.deleteButton}
          onPress={() => showDeleteConfirmation(itemId)}
        >
          <Ionicons name="trash-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    );
  };

  const renderItem = ({ item }) => {
    const product = item.product;
    const price = product.price_range.minimum_price.regular_price.value;
    const fixedImageUrl = product.small_image.url
      .toString()
      .replace(BASE_IMAGE_URL, IMAGE_URL_DOMAIN);

    return (
      <Swipeable
        ref={(ref) => {
          if (ref && !swipeableRefs.current.has(item.id)) {
            swipeableRefs.current.set(item.id, ref);
          }
        }}
        renderRightActions={() => renderRightActions(item.id)}
        rightThreshold={40}
        overshootRight={false}
        onSwipeableOpen={() => {
          swipeableRefs.current.forEach((ref, key) => {
            if (key !== item.id && ref) {
              ref.close();
            }
          });
        }}
      >
        <TouchableOpacity
          style={FavoriteStyles.itemContainer}
          onPress={() =>
            navigation.navigate("ProductDetails", { sku: product.sku })
          }
        >
          <Image
            source={{ uri: fixedImageUrl }}
            style={FavoriteStyles.productImage}
          />
          <View style={FavoriteStyles.productInfo}>
            <Text style={FavoriteStyles.productName}>{product.name}</Text>
            <Text style={FavoriteStyles.productSize}>
              {product.sku.includes("ml")
                ? `${product.sku.match(/\d+/)[0]}ml`
                : ""}
            </Text>
            <Text style={FavoriteStyles.price}>${price.toFixed(2)}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>
      </Swipeable>
    );
  };

  if (isLoading) {
    return (
      <SafeAreaView style={FavoriteStyles.container}>
        <View style={FavoriteStyles.center}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={FavoriteStyles.container}>
        <View style={FavoriteStyles.header}>
          <Text style={FavoriteStyles.headerTitle}>Favourite</Text>
        </View>

        {localWishlistItems.length === 0 ? (
          <EmptyFavorites navigation={navigation} />
        ) : (
          <FlatList
            data={localWishlistItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            style={FavoriteStyles.list}
            contentContainerStyle={FavoriteStyles.listContent}
          />
        )}

        <CustomModal
          isVisible={isModalVisible}
          title="Remove from Favorites"
          message="Are you sure you want to remove this item from your favorites?"
          onCancel={() => setModalVisible(false)}
          onConfirm={handleDeleteItem}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default FavoriteScreen;
