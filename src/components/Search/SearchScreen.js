import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import BaseScreen from "../BaseScreen";
import CartStyles from "@/src/styles/CartStyles";
import { Button, ButtonText } from "@/components/ui/button";
import Ionicons from "react-native-vector-icons/Ionicons";
const SearchScreen = () => {
  const cartItems = [
    {
      id: "1",
      name: "Potato",
      price: 200000,
      image:
        "https://th.bing.com/th/id/OIP.ZFX-ha8ZYhhi6Y6n9HXRlQHaE8?rs=1&pid=ImgDetMain",
    },
    {
      id: "2",
      name: "Tomato",
      price: 500000,
      image:
        "https://th.bing.com/th/id/R.8884b28d87290e253c4da138cbdbe5df?rik=WrXhafflBrY80w&pid=ImgRaw&r=0",
    },
    {
      id: "3",
      name: "Mix Fruits",
      price: 300000,
      image:
        "https://th.bing.com/th/id/OIP.c6Tbz7IbCn9bVXzXQSOqhgHaFN?rs=1&pid=ImgDetMain",
    },
    {
      id: "4",
      name: "Mix Fruits",
      price: 300000,
      image:
        "https://th.bing.com/th/id/OIP.c6Tbz7IbCn9bVXzXQSOqhgHaFN?rs=1&pid=ImgDetMain",
    },
    {
      id: "5",
      name: "Mix Fruits",
      price: 300000,
      image:
        "https://th.bing.com/th/id/OIP.c6Tbz7IbCn9bVXzXQSOqhgHaFN?rs=1&pid=ImgDetMain",
    },
    {
      id: "6",
      name: "Mix Fruits",
      price: 300000,
      image:
        "https://th.bing.com/th/id/OIP.c6Tbz7IbCn9bVXzXQSOqhgHaFN?rs=1&pid=ImgDetMain",
    },
    {
      id: "7",
      name: "Mix Fruits",
      price: 300000,
      image:
        "https://th.bing.com/th/id/OIP.c6Tbz7IbCn9bVXzXQSOqhgHaFN?rs=1&pid=ImgDetMain",
    },
    {
      id: "8",
      name: "Mix Fruits",
      price: 300000,
      image:
        "https://th.bing.com/th/id/OIP.c6Tbz7IbCn9bVXzXQSOqhgHaFN?rs=1&pid=ImgDetMain",
    },
    {
      id: "9",
      name: "Mix Fruits",
      price: 300000,
      image:
        "https://th.bing.com/th/id/OIP.c6Tbz7IbCn9bVXzXQSOqhgHaFN?rs=1&pid=ImgDetMain",
    },
    {
      id: "10",
      name: "Mix Fruits",
      price: 300000,

      image:
        "https://th.bing.com/th/id/OIP.c6Tbz7IbCn9bVXzXQSOqhgHaFN?rs=1&pid=ImgDetMain",
    },
    {
      id: "11",
      name: "Mix Fruits",
      price: 300000,
      image:
        "https://th.bing.com/th/id/OIP.c6Tbz7IbCn9bVXzXQSOqhgHaFN?rs=1&pid=ImgDetMain",
    },
  ];
  const generateRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <BaseScreen
      title="Vegetables and Fruits"
      subtitle="All items are currently in store"
    >
      <ScrollView contentContainerStyle={CartStyles.scrollContainer}>
        {cartItems.map((item) => (
          <TouchableOpacity key={item.id}>
            <View
              style={[
                CartStyles.cartItem,
                { backgroundColor: generateRandomColor() },
              ]}
            >
              <Image
                source={{ uri: item.image }}
                style={[CartStyles.productImage, { borderRadius: 50 }]}
              />
              <View style={CartStyles.productDetails}>
                <Text style={CartStyles.productName}>{item.name}</Text>
                <Text style={CartStyles.productPrice}>${item.price}</Text>
                <Text style={CartStyles.productQuantity}>
                  ⚖ {item.quantity} Kgs
                </Text>
              </View>
              <TouchableOpacity style={{ marginTop: "8%" }}>
                <Ionicons name={"chevron-forward-circle-outline"} size={45} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </BaseScreen>
  );
};

export default SearchScreen;
