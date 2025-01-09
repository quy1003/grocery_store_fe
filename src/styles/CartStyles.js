import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#32a852",
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  backButton: {
    fontSize: 24,
    color: "white",
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },
  itemCount: {
    color: "white",
    fontSize: 14,
  },
  itemsContainer: {
    flex: 1,
    padding: 20,
  },
  itemCard: {
    flexDirection: "row",
    backgroundColor: "#e8f5e9",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    alignItems: "center",
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 15,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "600",
  },
  itemPrice: {
    fontSize: 16,
    color: "#32a852",
    marginVertical: 4,
  },
  itemWeight: {
    color: "#666",
    fontSize: 14,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    backgroundColor: "#fff",
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityButtonText: {
    fontSize: 18,
    color: "#32a852",
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  footer: {
    padding: 20,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 18,
    color: "#666",
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#32a852",
  },
  continueButton: {
    backgroundColor: "#32a852",
    borderRadius: 25,
    padding: 15,
    alignItems: "center",
  },
  continueButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
