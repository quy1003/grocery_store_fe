import { Card } from "@/components/ui/card";
import { useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function ProductCard({ imgUrl, name, price, sku }) {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("ProductDetail", { sku });
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Card style={styles.container}>
        <Image
          source={{
            uri: imgUrl,
          }}
          alt="image"
          style={styles.img}
        />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>
          {price.value} {price.currency}
        </Text>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#b9e999",
    width: 140,
    height: 200,
    borderRadius: 24,
    padding: 10,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  img: {
    height: 100,
    width: 100,
    borderRadius: 50,
    alignSelf: "center",
  },
  name: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    width: "100%",
  },
  price: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
