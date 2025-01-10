import { Card } from "@/components/ui/card";
import { Link } from "@react-navigation/native";
import { Image, StyleSheet, Text } from "react-native";

export default function ProductCard({ imgUrl, name, price, unit, quantity }) {
  return (
    <Card style={styles.container}>
      <Image
        source={{
          uri: imgUrl,
        }}
        alt="image"
        style={styles.img}
      />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.price}>{price.value} {price.currency}</Text>
      {/* <Text>2 kg</Text> */}
    </Card>
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
    justifyContent: "space-evenly",
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
