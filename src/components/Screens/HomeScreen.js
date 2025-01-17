import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { gql, useQuery } from "@apollo/client";
import BaseScreen from "@/src/components/BaseScreen";
import MyInput from "@/src/components/ui/MyInput";
import Tabs from "@/src/components/ui/Tabs";
import ProductCard from "@/src/components/Product/ProductCard";
import OfferCard from "@/src/components/Product/OfferCard";
import { GET_CATEGORIES } from "@/src/Query/category";
import { IMAGE_URL_DOMAIN, BASE_IMAGE_URL } from "@env";
import { GET_PRODUCT_BY_CATEGORY } from "@/src/Query/product";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const [tabs, setTabs] = useState([]);
  const [selectedTab, setSelectedTab] = useState();
  const [cateProducts, setCateProducts] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [searchResultCategory, setSearchResultCategory] = useState([]);
  const [searchResultProduct, setSearchResultProduct] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const navigation = useNavigation();
  const { loading, error, data } = useQuery(GET_CATEGORIES);

  const handlePress = () => {
    navigation.navigate("CategoryScreen", { id: selectedTab.id });
  };

  useEffect(() => {
    if (data) {
      setTabs(data.category.children);
      setSelectedTab(data.category.children[0]);
      let arr = [];
      data.category.children.forEach((element) => {
        console.log(element.products.items.length);
        arr = arr.concat(element.products.items);
      });
      setAllProducts(arr);
    } else {
      console.log(data);
    }
  }, [data]);

  useEffect(() => {
    if (selectedTab) {
      setCateProducts(selectedTab.products.items);
    }
  }, [selectedTab]);

  useEffect(() => {
    if (keyword.length >= 2) {
      console.log(keyword);
      setSearchResultCategory(
        tabs.filter((category) => category.name.includes(keyword)),
      );
      setSearchResultProduct(
        allProducts.filter((product) => {
          console.log(product.name);
          return product.name.includes(keyword);
        }),
      );
    } else {
      setSearchResultCategory([]);
      setSearchResultProduct([]);
    }
  }, [keyword]);

  const renderSearchResults = () => {
    if (keyword.length < 2) return null;

    return (
      <View style={styles.searchResults}>
        {/* Categories Section */}
        {searchResultCategory.length > 0 && (
          <View style={styles.resultSection}>
            <Text style={styles.resultSectionTitle}>Categories</Text>
            {searchResultCategory.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={styles.resultItem}
                onPress={() => {
                  navigation.navigate("CategoryScreen", { id: category.id });
                  setKeyword("");
                  setShowSearchResults(false);
                }}
              >
                <Text style={styles.resultItemText}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Products Section */}
        {searchResultProduct.length > 0 && (
          <View style={styles.resultSection}>
            <Text style={styles.resultSectionTitle}>Products</Text>
            {searchResultProduct.map((product) => (
              <TouchableOpacity
                key={product.id}
                style={styles.resultItem}
                onPress={() => {
                  navigation.navigate("ProductDetails", {
                    sku: product.sku,
                  });
                  setKeyword("");
                  setShowSearchResults(false);
                }}
              >
                <Text style={styles.resultItemText}>{product.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* No Results Message */}
        {searchResultCategory.length === 0 &&
          searchResultProduct.length === 0 && (
            <View style={styles.noResults}>
              <Text style={styles.noResultsText}>No results found</Text>
            </View>
          )}
      </View>
    );
  };

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={30} />
      </View>
    );

  if (error) return <Text>Error: {error.message}</Text>;
  return (
    <BaseScreen
      title="Welcome"
      subtitle="Find and order your fresh fruits & vegetables"
      backScreenName={"Home"}
    >
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <MyInput
            placeholder={"Search fresh fruits & vegetables..."}
            value={keyword}
            onChange={(text) => {
              setKeyword(text);
              setShowSearchResults(true);
            }}
          />
          {showSearchResults && renderSearchResults()}
        </View>
        <Tabs tabs={tabs} activeTab={selectedTab} onPress={setSelectedTab} />
        <ScrollView
          horizontal
          style={styles.productContainer}
          showsHorizontalScrollIndicator={false}
        >
          {cateProducts &&
            cateProducts.map((product) => {
              const imageUrl = product.image?.url
                ? product.image.url
                    .toString()
                    .replace(BASE_IMAGE_URL, IMAGE_URL_DOMAIN)
                : "https://cdn.tgdd.vn/2020/08/content/1-800x814-1.jpg";
              return (
                <View style={styles.card} key={product.id}>
                  <ProductCard
                    imgUrl={imageUrl}
                    name={product.name}
                    price={product.price_range.minimum_price.final_price}
                    sku={product.sku}
                  />
                </View>
              );
            })}
        </ScrollView>
        <TouchableOpacity
          title="See All"
          style={styles.allBtn}
          onPress={handlePress}
        >
          <Text style={styles.textBtn}>See All</Text>
        </TouchableOpacity>
        <Text style={styles.textOffer}>Todays Offers</Text>
        <View style={styles.offerContainer}>
          {allProducts.slice(0, currentPage * 9).map((product) => (
            <OfferCard
              key={product.id}
              imgUrl={product.image.url}
              name={product.name}
              price={product.price_range.minimum_price.final_price}
              sku={product.sku}
            />
          ))}
        </View>
        <TouchableOpacity
          onPress={() => {
            if (currentPage < allProducts.length / 9) {
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

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 24,
  },
  card: {
    marginRight: 16,
  },
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
  textOffer: {
    alignSelf: "flex-start",
    fontSize: 20,
    fontWeight: "bold",
  },
  productContainer: {
    // marginTop: 10,
    // height: "auto",
  },
  offerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  searchContainer: {
    width: "100%",
    position: "relative",
    zIndex: 999,
  },
  searchResults: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 12,
    marginTop: 4,
    maxHeight: 300,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  resultSection: {
    marginBottom: 16,
  },
  resultSectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  resultItem: {
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  resultItemText: {
    fontSize: 14,
    color: "#666",
  },
  noResults: {
    padding: 16,
    alignItems: "center",
  },
  noResultsText: {
    color: "#666",
    fontSize: 14,
  },
});
