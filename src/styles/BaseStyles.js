import { StyleSheet } from "react-native";

export default StyleSheet.create({
  headerTop: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  container: {
    backgroundColor: "#f5f5f5",
  },
  contentContainer: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: "#56995d",
    padding: 24,
    paddingBottom: 80,
    justifyContent: "center",
    height: 300,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "600",
  },
  headerSubTitle: {
    color: "#fff",
    fontSize: 19,
    width: "75%",
  },
  headerSubTitleRight: {
    color: "#fff",
    fontSize: 22,
  },
  subtitleContainer: {
    display: "flex",
    flexDirection: "row",
  },
  content: {
    flex: 1,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    marginTop: -60,
    backgroundColor: "#f5f5f5",
    minHeight: 60,
  },
});
