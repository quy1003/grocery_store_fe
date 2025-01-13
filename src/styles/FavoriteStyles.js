import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 15,
    backgroundColor: "#efffe8",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 15,
  },
  itemContainer: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  productImage: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  productInfo: {
    flex: 1,
    marginLeft: 15,
  },
  productName: {
    fontSize: 16,
    fontWeight: "500",
  },
  productSize: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 4,
  },
  deleteButton: {
    backgroundColor: "#ff4444",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: "100%",
  },
  addAllButton: {
    backgroundColor: "#bfeca1",
    padding: 15,
    margin: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  addAllButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 10,
    color: "#333",
  },
  emptySubtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    paddingHorizontal: 40,
    marginBottom: 30,
  },
  startShoppingButton: {
    backgroundColor: "#bfeca1",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 20,
  },
  startShoppingText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
});
