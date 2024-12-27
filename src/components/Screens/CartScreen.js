import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import BaseScreen from '../BaseScreen';
import CartStyles from '@/src/styles/CartStyles';

const CartScreen = () => {
  const cartItems = [
    {
      id: '1',
      name: 'Potato',
      price: 200000,
      quantity: 2,
      image: 'https://th.bing.com/th/id/OIP.ZFX-ha8ZYhhi6Y6n9HXRlQHaE8?rs=1&pid=ImgDetMain',
    },
    {
      id: '2',
      name: 'Tomato',
      price: 500000,
      quantity: 1,
      image: 'https://th.bing.com/th/id/R.8884b28d87290e253c4da138cbdbe5df?rik=WrXhafflBrY80w&pid=ImgRaw&r=0',
    },
    {
      id: '3',
      name: 'Mix Fruits',
      price: 300000,
      quantity: 1,
      image: 'https://th.bing.com/th/id/OIP.c6Tbz7IbCn9bVXzXQSOqhgHaFN?rs=1&pid=ImgDetMain',
    },
    {
      id: '4',
      name: 'Mix Fruits',
      price: 300000,
      quantity: 1,
      image: 'https://th.bing.com/th/id/OIP.c6Tbz7IbCn9bVXzXQSOqhgHaFN?rs=1&pid=ImgDetMain',
    },
    {
      id: '5',
      name: 'Mix Fruits',
      price: 300000,
      quantity: 1,
      image: 'https://th.bing.com/th/id/OIP.c6Tbz7IbCn9bVXzXQSOqhgHaFN?rs=1&pid=ImgDetMain',
    },
    {
      id: '6',
      name: 'Mix Fruits',
      price: 300000,
      quantity: 1,
      image: 'https://th.bing.com/th/id/OIP.c6Tbz7IbCn9bVXzXQSOqhgHaFN?rs=1&pid=ImgDetMain',
    },
    {
      id: '7',
      name: 'Mix Fruits',
      price: 300000,
      quantity: 1,
      image: 'https://th.bing.com/th/id/OIP.c6Tbz7IbCn9bVXzXQSOqhgHaFN?rs=1&pid=ImgDetMain',
    },
    {
      id: '8',
      name: 'Mix Fruits',
      price: 300000,
      quantity: 1,
      image: 'https://th.bing.com/th/id/OIP.c6Tbz7IbCn9bVXzXQSOqhgHaFN?rs=1&pid=ImgDetMain',
    },
    {
      id: '9',
      name: 'Mix Fruits',
      price: 300000,
      quantity: 1,
      image: 'https://th.bing.com/th/id/OIP.c6Tbz7IbCn9bVXzXQSOqhgHaFN?rs=1&pid=ImgDetMain',
    },
    {
      id: '10',
      name: 'Mix Fruits',
      price: 300000,
      quantity: 1,
      image: 'https://th.bing.com/th/id/OIP.c6Tbz7IbCn9bVXzXQSOqhgHaFN?rs=1&pid=ImgDetMain',
    },
    {
      id: '11',
      name: 'Mix Fruits',
      price: 300000,
      quantity: 1,
      image: 'https://th.bing.com/th/id/OIP.c6Tbz7IbCn9bVXzXQSOqhgHaFN?rs=1&pid=ImgDetMain',
    },
  ];

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <BaseScreen title="Grocery Store Cart" subtitle="Your order">
      <View style={CartStyles.container}>
        <Text style={CartStyles.title}>Purchasing</Text>

        <ScrollView contentContainerStyle={CartStyles.scrollContainer}>
          {cartItems.map((item) => (
            <View style={CartStyles.cartItem} key={item.id}>
              <Image source={{ uri: item.image }} style={CartStyles.productImage} />
              <View style={CartStyles.productDetails}>
                <Text style={CartStyles.productName}>{item.name}</Text>
                <Text style={CartStyles.productPrice}>${item.price}</Text>
                <Text style={CartStyles.productQuantity}>Quantity: {item.quantity}</Text>
                <Text style={CartStyles.productTotal}>Total: ${item.price * item.quantity}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={CartStyles.totalContainer}>
          <Text style={CartStyles.totalText}>Total Payment: ${calculateTotal()}</Text>
        </View>

        <TouchableOpacity style={CartStyles.checkoutButton}>
          <Text style={CartStyles.checkoutButtonText}>Order</Text>
        </TouchableOpacity>
      </View>
    </BaseScreen>
  );
};


export default CartScreen;
