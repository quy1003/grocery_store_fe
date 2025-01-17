import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT_BY_CATEGORY } from "@/src/Query/product";
import BaseScreen from "@/src/components/BaseScreen";
import { IMAGE_URL_DOMAIN, BASE_IMAGE_URL } from "@env";

const CategoryScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const { loading, error, data } = useQuery(GET_PRODUCT_BY_CATEGORY, {
    variables: { categoryId: id },
  });
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (data) {
      const category = data.categories?.items[0];
      if (category) {
        setCategoryName(category.name);
        setProducts(category.products.items);
      }
    }
  }, [data]);

  const handlePress = (sku) => {
    console.log(sku);
    navigation.navigate("ProductDetails", { sku });
  };

  if (loading)
    return (
      <BaseScreen>
        <ActivityIndicator size="large" color="#00bcd4" />
      </BaseScreen>
    );
  if (error)
    return (
      <BaseScreen>
        <Text style={styles.errorText}>Error: {error.message}</Text>
      </BaseScreen>
    );

  return (
    <BaseScreen title={categoryName}>
      <View style={styles.listContainer}>
        {products &&
          products.slice(0, currentPage * 6).map((item) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => handlePress(item.sku)}
              key={item.id}
            >
              <Image
                source={{
                  uri: item.image?.url
                    ? item.image.url
                        .toString()
                        .replace(BASE_IMAGE_URL, IMAGE_URL_DOMAIN)
                    : "https://cdn.tgdd.vn/2020/08/content/1-800x814-1.jpg",
                }}
                style={styles.productImage}
                resizeMode="cover"
              />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.finalPrice}>
                  ${item.price_range.minimum_price.final_price.value.toFixed(2)}
                </Text>
                {/* <View style={styles.priceContainer}></View> */}
              </View>
            </TouchableOpacity>
          ))}
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          onPress={() => {
            if (currentPage < products.length / 9) {
              console.log("current page", currentPage);
              setCurrentPage(currentPage + 1);
            }
          }}
          style={styles.allBtn}
          title="See More Products"
        >
          <Text style={styles.textBtn}>See More Products</Text>
        </TouchableOpacity>
      </View>
    </BaseScreen>
  );
};

const styles = StyleSheet.create({
  allBtn: {
    padding: 8,
    borderColor: "#333",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 40,
    width: 180,
    marginVertical: 16,
  },
  textBtn: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
  btnContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    width: "100%",
  },
  listContainer: {
    padding: 16,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    marginBottom: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: "hidden",
    width: "49%",
    // marginRight: 8,
  },
  productImage: {
    width: "100%",
    height: 150,
    backgroundColor: "#f5f5f5",
  },
  productInfo: {
    padding: 16,
    display: "flex",
    justifyContent: "space-between",
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    alignSelf: "flex-end",
    bottom: 0,
  },
  finalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2e7d32",
    alignSelf: "flex-end",
  },
  regularPrice: {
    fontSize: 14,
    color: "#9e9e9e",
    textDecorationLine: "line-through",
  },
  errorText: {
    color: "#f44336",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});

export default CategoryScreen;
