// // import React from 'react';
// // import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
// // import BaseScreen from '../BaseScreen';
// // import CartStyles from '@/src/styles/CartStyles';
// // import { Button, ButtonText } from '@/components/ui/button';
// // import Ionicons from "react-native-vector-icons/Ionicons";
// // const CartScreen = () => {
// //   const cartItems = [
// // {
// //   id: '1',
// //   name: 'Potato',
// //   price: 200000,
// //   quantity: 2,
// //   image: 'https://th.bing.com/th/id/OIP.ZFX-ha8ZYhhi6Y6n9HXRlQHaE8?rs=1&pid=ImgDetMain',
// // },
// // {
// //   id: '2',
// //   name: 'Tomato',
// //   price: 500000,
// //   quantity: 1,
// //   image: 'https://th.bing.com/th/id/R.8884b28d87290e253c4da138cbdbe5df?rik=WrXhafflBrY80w&pid=ImgRaw&r=0',
// // },
// // {
// //       id: '3',
// //       name: 'Mix Fruits',
// //       price: 300000,
// //       quantity: 1,
// //       image: 'https://th.bing.com/th/id/OIP.c6Tbz7IbCn9bVXzXQSOqhgHaFN?rs=1&pid=ImgDetMain',
// //     },
// //     {
// //       id: '4',
// //       name: 'Mix Fruits',
// //       price: 300000,
// //       quantity: 1,
// //       image: 'https://th.bing.com/th/id/OIP.c6Tbz7IbCn9bVXzXQSOqhgHaFN?rs=1&pid=ImgDetMain',
// //     },
// //     {
// //       id: '5',
// //       name: 'Mix Fruits',
// //       price: 300000,
// //       quantity: 1,
// //       image: 'https://th.bing.com/th/id/OIP.c6Tbz7IbCn9bVXzXQSOqhgHaFN?rs=1&pid=ImgDetMain',
// //     },
// //     {
// //       id: '6',
// //       name: 'Mix Fruits',
// //       price: 300000,
// //       quantity: 1,
// //       image: 'https://th.bing.com/th/id/OIP.c6Tbz7IbCn9bVXzXQSOqhgHaFN?rs=1&pid=ImgDetMain',
// //     },
// //     {
// //       id: '7',
// //       name: 'Mix Fruits',
// //       price: 300000,
// //       quantity: 1,
// //       image: 'https://th.bing.com/th/id/OIP.c6Tbz7IbCn9bVXzXQSOqhgHaFN?rs=1&pid=ImgDetMain',
// //     },
// //     {
// //       id: '8',
// //       name: 'Mix Fruits',
// //       price: 300000,
// //       quantity: 1,
// //       image: 'https://th.bing.com/th/id/OIP.c6Tbz7IbCn9bVXzXQSOqhgHaFN?rs=1&pid=ImgDetMain',
// //     },
// //     {
// //       id: '9',
// //       name: 'Mix Fruits',
// //       price: 300000,
// //       quantity: 1,
// //       image: 'https://th.bing.com/th/id/OIP.c6Tbz7IbCn9bVXzXQSOqhgHaFN?rs=1&pid=ImgDetMain',
// //     },
// //     {
// //       id: '10',
// //       name: 'Mix Fruits',
// //       price: 300000,
// //       quantity: 1,
// //       image: 'https://th.bing.com/th/id/OIP.c6Tbz7IbCn9bVXzXQSOqhgHaFN?rs=1&pid=ImgDetMain',
// //     },
// //     {
// //       id: '11',
// //       name: 'Mix Fruits',
// //       price: 300000,
// //       quantity: 1,
// //       image: 'https://th.bing.com/th/id/OIP.c6Tbz7IbCn9bVXzXQSOqhgHaFN?rs=1&pid=ImgDetMain',
// //     },
// //   ];

// //   const calculateTotal = () => {
// //     return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
// //   };

// //   return (
// //     <BaseScreen title="Grocery Store Cart" subtitle="Your order">
// //       <View style={CartStyles.container}>
// //         <Text style={CartStyles.title}>Purchasing</Text>

// //         <ScrollView contentContainerStyle={CartStyles.scrollContainer}>
// //           {cartItems.map((item) => (
// //             <TouchableOpacity key={item.id}>
// //               <View style={CartStyles.cartItem} >
// //               <Image source={{ uri: item.image }} style={CartStyles.productImage} />
// //               <View style={CartStyles.productDetails}>
// //                 <Text style={CartStyles.productName}>{item.name}</Text>
// //                 <Text style={CartStyles.productPrice}>${item.price}</Text>
// //                 <Text style={CartStyles.productQuantity}>Quantity: {item.quantity}</Text>
// //                 <Text style={CartStyles.productTotal}>Total: ${item.price * item.quantity}</Text>
// //               </View>
// //               <TouchableOpacity>
// //                 <Ionicons name={"close-circle-outline"} size={30} />
// //               </TouchableOpacity>
// //             </View>
// //             </TouchableOpacity>
// //           ))}
// //         </ScrollView>

// //         <View style={CartStyles.totalContainer}>
// //           <Text style={CartStyles.totalText}>Total Payment: ${calculateTotal()}</Text>
// //         </View>

// //         <TouchableOpacity style={CartStyles.checkoutButton}>
// //           <Text style={CartStyles.checkoutButtonText}>Order</Text>
// //         </TouchableOpacity>
// //       </View>
// //     </BaseScreen>
// //   );
// // };

// // export default CartScreen;

import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  SafeAreaView,
} from "react-native";

const CartScreen = () => {
  // Data mặc định sẽ luôn được sử dụng khi component được khởi tạo
  const [cartItems, setCartItems] = useState([
    {
      id: "1",
      name: "Potato",
      price: 200000,
      quantity: 2,
      image:
        "https://th.bing.com/th/id/OIP.ZFX-ha8ZYhhi6Y6n9HXRlQHaE8?rs=1&pid=ImgDetMain",
    },
    {
      id: "2",
      name: "Tomato",
      price: 500000,
      quantity: 1,
      image:
        "https://th.bing.com/th/id/R.8884b28d87290e253c4da138cbdbe5df?rik=WrXhafflBrY80w&pid=ImgRaw&r=0",
    },
  ]);

  const updateQuantity = (id, increment) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item.id === id) {
            const newQuantity = item.quantity + (increment ? 1 : -1);
            return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((sum, item) => sum + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const visibleItems = cartItems.filter((item) => item.quantity > 0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Shopping Cart</Text>
        <Text style={styles.itemCount}>
          A total of {visibleItems.length} pieces
        </Text>
      </View>

      <ScrollView style={styles.itemsContainer}>
        {visibleItems.map((item) => (
          <View key={item.id} style={styles.itemCard}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>$ {item.price}</Text>
              <Text style={styles.itemWeight}>{item.weight}</Text>
            </View>
            <View style={styles.quantityControls}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => updateQuantity(item.id, false)}
              >
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{item.quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => updateQuantity(item.id, true)}
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total: </Text>
          <Text style={styles.totalAmount}>${calculateTotal()}</Text>
        </View>
        <TouchableOpacity style={styles.continueButton}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#32a852",
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  backButton: {
    fontSize: 24,
    color: "white",
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },
  itemCount: {
    color: "white",
    fontSize: 14,
  },
  itemsContainer: {
    flex: 1,
    padding: 20,
  },
  itemCard: {
    flexDirection: "row",
    backgroundColor: "#e8f5e9",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    alignItems: "center",
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 15,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "600",
  },
  itemPrice: {
    fontSize: 16,
    color: "#32a852",
    marginVertical: 4,
  },
  itemWeight: {
    color: "#666",
    fontSize: 14,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    backgroundColor: "#fff",
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityButtonText: {
    fontSize: 18,
    color: "#32a852",
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  footer: {
    padding: 20,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 18,
    color: "#666",
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#32a852",
  },
  continueButton: {
    backgroundColor: "#32a852",
    borderRadius: 25,
    padding: 15,
    alignItems: "center",
  },
  continueButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CartScreen;
