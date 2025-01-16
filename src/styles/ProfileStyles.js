import { StyleSheet } from "react-native";

export default StyleSheet.create({
  infoView: {
    marginTop: -60,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  textViewUser: {
    padding: 5,
    marginBottom: 1,
  },
  fontSize20: { fontSize: 20 },
  btnLogout: {
    backgroundColor: "#E63535",
    width: 120,
    marginLeft: "65%",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    marginTop: 15,
  },
  btnLogoutText: {
    padding: 14,
    paddingHorizontal: 20,
    textAlign: "left",
    color: "whitesmoke",
    fontWeight: "bold",
    position: "relative",
  },
  btnSaveText: {
    padding: 14.5,
    textAlign: "center",
    color: "white",
    backgroundColor: "#56995d",
    fontWeight: "bold",
    borderRadius: 18,
  },
});
