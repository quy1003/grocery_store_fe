import BaseScreen from "@/src/components/BaseScreen";
import MyInput from "@/src/components/ui/MyInput";
import OfferCard from "@/src/components/Product/OfferCard";
import ProductCard from "@/src/components/Product/ProductCard";
import Tabs from "@/src/components/ui/Tabs";
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { gql, useQuery } from "@apollo/client";

const GET_PRODUCTS = gql`
  {
    products(search: "") {
      items {
        name
        image {
          url
        }
      }
    }
  }
`;

const HomeScreen = () => {
  const tabs = ["Fruits", "Vegetables", "Breads", "Others"];

  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  const { loading, error, data } = useQuery(GET_RECOMMENDED_VIDEOS);
  console.log(data);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;
  return (
    <BaseScreen
      title="Welcome"
      subtitle="Find and order your fresh fruits & vegetables"
    >
      <View style={styles.container}>
        <MyInput placeholder={"Search fresh fruits & vegetables..."} />
        <Tabs tabs={tabs} activeTab={selectedTab} onPress={setSelectedTab} />
        <ScrollView
          horizontal
          style={styles.productContainer}
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.card}>
            <ProductCard />
          </View>
          <View style={styles.card}>
            <ProductCard />
          </View>
          <View style={styles.card}>
            <ProductCard />
          </View>
          <View style={styles.card}>
            <ProductCard />
          </View>
        </ScrollView>
        <TouchableOpacity title="See All" style={styles.allBtn}>
          <Text style={styles.textBtn}>See All</Text>
        </TouchableOpacity>
        <Text style={styles.textOffer}>Todays Offers {data}</Text>
        <View style={styles.offerContainer}>
          <OfferCard />
          <OfferCard />
          <OfferCard />
          <OfferCard />
          <OfferCard />
          <OfferCard />
        </View>
      </View>
    </BaseScreen>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    // backgroundColor: "#fff",
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
});
