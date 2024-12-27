import { Card } from "@/components/ui/card";
import { Image, StyleSheet, Text } from "react-native";

export default function OfferCard({ imgUrl, name, price, unit, quantity }) {
  return (
    <Card style={styles.container}>
      <Image
        source={{
          uri: "https://www.simplyrecipes.com/thmb/GdViexTWEeLHvTGec7SkI3uKxAA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Red-Yellow-Onion-OPTION-1-060f128af9eb4c30a82d73f22fc2b67c.jpg",
        }}
        alt="image"
        style={styles.img}
      />
      <Text style={styles.text}>2kg Onion just $100</Text>
    </Card>
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
