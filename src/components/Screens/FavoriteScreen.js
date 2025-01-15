// import React, { useEffect, useState, useRef } from "react";
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   FlatList,
//   SafeAreaView,
//   Alert,
// } from "react-native";
// import { useQuery, useMutation } from "@apollo/client";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import { IMAGE_URL_DOMAIN, BASE_IMAGE_URL } from "@env";
// import { GET_WISHLIST, REMOVE_FROM_WISHLIST } from "@/src/Query/favorite";
// import {
//   GestureHandlerRootView,
//   Swipeable,
// } from "react-native-gesture-handler";
// import FavoriteStyles from "@/src/styles/FavoriteStyles";

// const EmptyFavorites = ({ navigation }) => (
//   <View style={FavoriteStyles.emptyContainer}>
//     <Ionicons name="heart-outline" size={80} color="#bfeca1" />
//     <Text style={FavoriteStyles.emptyTitle}>Your favorites list is empty</Text>
//     <Text style={FavoriteStyles.emptySubtitle}>
//       Items added to your favorites will appear here
//     </Text>
//     <TouchableOpacity
//       style={FavoriteStyles.startShoppingButton}
//       onPress={() => navigation.navigate("Home")}
//     >
//       <Text style={FavoriteStyles.startShoppingText}>Start Shopping</Text>
//     </TouchableOpacity>
//   </View>
// );

// const FavoriteScreen = ({ navigation }) => {
//   const {
//     loading,
//     error: queryError,
//     data,
//     refetch,
//   } = useQuery(GET_WISHLIST, {
//     fetchPolicy: "network-only",
//   });

//   const [removeFromWishlist, { loading: removeLoading }] = useMutation(
//     REMOVE_FROM_WISHLIST,
//     {
//       onError: (error) => {
//         console.error("Remove from wishlist error:", error);
//       },
//       update: (cache, { data: mutationData }) => {
//         try {
//           if (!mutationData?.removeProductsFromWishlist?.wishlist) return;

//           const existingData = cache.readQuery({
//             query: GET_WISHLIST,
//           });

//           if (!existingData?.customer?.wishlist) return;

//           const updatedItems = existingData.customer.wishlist.items.filter(
//             (item) =>
//               !mutationData.removeProductsFromWishlist.wishlist.items.find(
//                 (removedItem) => removedItem.id === item.id
//               )
//           );

//           cache.writeQuery({
//             query: GET_WISHLIST,
//             data: {
//               customer: {
//                 ...existingData.customer,
//                 wishlist: {
//                   ...existingData.customer.wishlist,
//                   items: updatedItems,
//                   items_count:
//                     mutationData.removeProductsFromWishlist.wishlist
//                       .items_count,
//                 },
//               },
//             },
//           });
//         } catch (error) {
//           console.error("Cache update error:", error);
//         }
//       },
//     }
//   );

//   const [wishlistItems, setWishlistItems] = useState([]);
//   const swipeableRefs = useRef(new Map());

//   useEffect(() => {
//     if (data?.customer?.wishlist) {
//       setWishlistItems(data.customer.wishlist.items);
//     }
//   }, [data]);

//   useEffect(() => {
//     const unsubscribe = navigation.addListener("focus", () => {
//       refetch();
//     });
//     return unsubscribe;
//   }, [navigation, refetch]);

//   const handleDeleteItem = async (itemId) => {
//     if (removeLoading) return;

//     try {
//       const wishlistId = data?.customer?.wishlist?.id;
//       if (!wishlistId) {
//         throw new Error("Wishlist ID not found");
//       }

//       const { data: removeData } = await removeFromWishlist({
//         variables: {
//           wishlistId: wishlistId,
//           wishlistItemsIds: [itemId],
//         },
//         optimisticResponse: {
//           removeProductsFromWishlist: {
//             wishlist: {
//               id: wishlistId,
//               items_count: (data?.customer?.wishlist?.items_count || 1) - 1,
//               items: [
//                 {
//                   id: itemId,
//                   product: {
//                     id: "temp-product-id",
//                     name: "temp-name",
//                     __typename: "Product",
//                   },
//                   __typename: "WishlistItem",
//                 },
//               ],
//               __typename: "Wishlist",
//             },
//             __typename: "RemoveProductsFromWishlistOutput",
//           },
//         },
//       });

//       if (removeData?.removeProductsFromWishlist?.wishlist) {
//         setWishlistItems((prevItems) =>
//           prevItems.filter((item) => item.id !== itemId)
//         );
//       } else {
//         throw new Error("Mutation response is invalid");
//       }
//     } catch (error) {
//       console.error("Delete error:", error);
//       Alert.alert(
//         "Error",
//         "Failed to remove item from favorites. Please try again.",
//         [{ text: "OK" }]
//       );

//       const swipeable = swipeableRefs.current.get(itemId);
//       if (swipeable) {
//         swipeable.close();
//       }
//     }
//   };

//   const showDeleteConfirmation = (itemId) => {
//     Alert.alert(
//       "Remove from Favorites",
//       "Are you sure you want to remove this item from your favorites?",
//       [
//         {
//           text: "Cancel",
//           onPress: () => {
//             const swipeable = swipeableRefs.current.get(itemId);
//             if (swipeable) {
//               swipeable.close();
//             }
//           },
//           style: "cancel",
//         },
//         {
//           text: "OK",
//           onPress: () => handleDeleteItem(itemId),
//         },
//       ]
//     );
//   };

//   const renderRightActions = (itemId) => {
//     return (
//       <TouchableOpacity
//         style={FavoriteStyles.deleteButton}
//         onPress={() => showDeleteConfirmation(itemId)}
//       >
//         <Ionicons name="trash-outline" size={24} color="#fff" />
//       </TouchableOpacity>
//     );
//   };

//   const handleItemPress = (productId) => {
//     navigation.navigate("ProductDetails", { productId });
//   };

//   const renderItem = ({ item }) => {
//     const product = item.product;
//     const price = product.price_range.minimum_price.regular_price.value;
//     const fixedImageUrl = product.small_image.url.replace(
//       BASE_IMAGE_URL,
//       IMAGE_URL_DOMAIN
//     );

//     return (
//       <Swipeable
//         ref={(ref) => {
//           if (ref && !swipeableRefs.current.has(item.id)) {
//             swipeableRefs.current.set(item.id, ref);
//           }
//         }}
//         renderRightActions={() => renderRightActions(item.id)}
//         rightThreshold={40}
//         overshootRight={false}
//         onSwipeableOpen={() => {
//           swipeableRefs.current.forEach((ref, key) => {
//             if (key !== item.id && ref) {
//               ref.close();
//             }
//           });
//         }}
//       >
//         <TouchableOpacity
//           style={FavoriteStyles.itemContainer}
//           onPress={() => handleItemPress(product.id)}
//         >
//           <Image
//             source={{ uri: fixedImageUrl }}
//             style={FavoriteStyles.productImage}
//           />
//           <View style={FavoriteStyles.productInfo}>
//             <Text style={FavoriteStyles.productName}>{product.name}</Text>
//             <Text style={FavoriteStyles.productSize}>
//               {product.sku.includes("ml")
//                 ? `${product.sku.match(/\d+/)[0]}ml`
//                 : ""}
//             </Text>
//             <Text style={FavoriteStyles.price}>${price.toFixed(2)}</Text>
//           </View>
//           <Ionicons name="chevron-forward" size={20} color="#999" />
//         </TouchableOpacity>
//       </Swipeable>
//     );
//   };

//   if (loading) {
//     return (
//       <SafeAreaView style={FavoriteStyles.container}>
//         <View style={FavoriteStyles.center}>
//           <Text>Loading...</Text>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   if (queryError) {
//     return (
//       <SafeAreaView style={FavoriteStyles.container}>
//         <View style={FavoriteStyles.center}>
//           <Text>Error loading wishlist</Text>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <SafeAreaView style={FavoriteStyles.container}>
//         <View style={FavoriteStyles.header}>
//           <Text style={FavoriteStyles.headerTitle}>Favourite</Text>
//         </View>

//         {wishlistItems.length === 0 ? (
//           <EmptyFavorites navigation={navigation} />
//         ) : (
//           <FlatList
//             data={wishlistItems}
//             renderItem={renderItem}
//             keyExtractor={(item) => item.id}
//             style={FavoriteStyles.list}
//             contentContainerStyle={FavoriteStyles.listContent}
//           />
//         )}
//       </SafeAreaView>
//     </GestureHandlerRootView>
//   );
// };

// export default FavoriteScreen;

import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Alert,
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
import { ADD_PRODUCT_TO_CART } from "@/src/Query/cart"; // Cập nhật đường dẫn tùy theo cấu trúc dự án của bạn

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
      Alert.alert("Error", "Failed to remove item. Please try again.");
    },
  });

  const [addProductToCart] = useMutation(ADD_PRODUCT_TO_CART, {
    onError: (error) => {
      console.error("Add to cart error:", error);
      Alert.alert("Error", "Failed to add item to cart. Please try again.");
    },
  });

  // Load items from AsyncStorage when component mounts
  useEffect(() => {
    loadWishlistFromStorage();
  }, []);

  // Refetch on screen focus
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

  const handleAddAllToCart = async () => {
    try {
      const cartId = await AsyncStorage.getItem("@cart_id"); // Giả sử bạn lưu trữ `cartId` trong AsyncStorage
      if (!cartId) {
        Alert.alert("Error", "Cart ID not found. Please try again.");
        return;
      }

      const promises = localWishlistItems.map((item) =>
        addProductToCart({
          variables: {
            cartId,
            sku: item.product.sku,
            quantity: 1, // Số lượng mặc định là 1
          },
        })
      );

      await Promise.all(promises);
      Alert.alert("Success", "All items have been added to the cart.");
    } catch (error) {
      console.error("Add all to cart error:", error);
      Alert.alert(
        "Error",
        "Failed to add all items to cart. Please try again."
      );
    }
  };

  const handleDeleteItem = async (itemId) => {
    const swipeable = swipeableRefs.current.get(itemId);

    try {
      // Update local state and storage first
      const updatedItems = localWishlistItems.filter(
        (item) => item.id !== itemId
      );
      setLocalWishlistItems(updatedItems);
      await saveWishlistToStorage(updatedItems);

      // Then update server
      await removeFromWishlist({
        variables: {
          wishlistId: data?.customer?.wishlist?.id,
          wishlistItemsIds: [itemId],
        },
      });
    } catch (error) {
      console.error("Delete error:", error);

      // Revert local changes if server update fails
      if (swipeable) {
        swipeable.close();
      }

      // Reload from storage
      loadWishlistFromStorage();

      Alert.alert("Error", "Failed to remove item. Please try again.");
    }
  };

  const showDeleteConfirmation = (itemId) => {
    Alert.alert(
      "Remove from Favorites",
      "Are you sure you want to remove this item from your favorites?",
      [
        {
          text: "Cancel",
          onPress: () => {
            const swipeable = swipeableRefs.current.get(itemId);
            if (swipeable) {
              swipeable.close();
            }
          },
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => handleDeleteItem(itemId),
        },
      ]
    );
  };

  const renderRightActions = (itemId) => {
    return (
      <TouchableOpacity
        style={FavoriteStyles.deleteButton}
        onPress={() => showDeleteConfirmation(itemId)}
      >
        <Ionicons name="trash-outline" size={24} color="#fff" />
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item }) => {
    const product = item.product;
    const price = product.price_range.minimum_price.regular_price.value;
    const fixedImageUrl = product.small_image.url.replace(
      BASE_IMAGE_URL,
      IMAGE_URL_DOMAIN
    );

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
            navigation.navigate("ProductDetails", { productId: product.id })
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
          <Text>Loading...</Text>
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
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default FavoriteScreen;
