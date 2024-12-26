import { Card } from "@/components/ui/card";
import { Link } from "@react-navigation/native";
import { Image, StyleSheet, Text } from "react-native";

export default function ProductCard({imgUrl, name, price, unit, quantity}) {
  return (
    <Card style={styles.container}>
      <Image
        source={{
          uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYm6VNnITJhsBKCe5horUs5C8aEfgxozfiGA&s",
        }}
        alt="image"
        style={styles.img}
      />
      <Text style={styles.name}>Onion</Text>
      <Text style={styles.price}>$25</Text>
      <Text>2 kg</Text>
      <Link href="https://gluestack.io/" isExternal></Link>
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
  },
  price: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
