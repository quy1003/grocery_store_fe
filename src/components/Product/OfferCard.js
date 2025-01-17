import { Card } from "@/components/ui/card";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { IMAGE_URL_DOMAIN, BASE_IMAGE_URL } from "@env";
import { useNavigation } from "@react-navigation/native";

export default function OfferCard({ imgUrl, name, price, sku = "" }) {
  const navigate = useNavigation();
  const handlePress = () => {
    if (sku != "") navigate.navigate("ProductDetails", { sku });
  };
  return (
    <TouchableOpacity onPress={handlePress}>
      <Card style={styles.container}>
        <Image
          source={{
            uri: imgUrl?.toString().replace(BASE_IMAGE_URL, IMAGE_URL_DOMAIN),
          }}
          alt="image"
          style={styles.img}
        />
        <Text style={styles.text}>
          {name} just {price?.value} {price?.currency}
        </Text>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    // height: 200,
    borderRadius: 24,
    // padding: 10,
    display: "flex",
    // justifyContent: "space-evenly",
    // alignItems: "flex-start",
  },
  img: {
    height: 100,
    width: 100,
    borderRadius: 30,
    alignSelf: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    padding: 12,
  },
});
