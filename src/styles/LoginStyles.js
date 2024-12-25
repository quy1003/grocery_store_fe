import { StyleSheet } from "react-native";

export default StyleSheet.create({
  inputLogin: {
    backgroundColor: "#98FB98",
    marginBottom: 20,
    padding: 8,
    borderRadius: 25,
  },
  btnLogin: {
    marginBottom: 10,
    borderRadius: 35,
    backgroundColor: "#228B22",
    width: "100%",
  },
  btnLoginText: {
    paddingVertical: 18,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
  btnTextIcon: { position: "absolute", top: 15, left: "20%" },
  btnSubLoginText: {
    paddingVertical: 18,
    position: "relative",
    textAlign: "center",
    color: "black",
    fontWeight: "bold",
  },
  btnSubLogin: {
    marginBottom: 40,
    borderRadius: 35,
    backgroundColor: "#98FB98",
    width: "100%",
  },
  mutualView: { flex: 1, alignItems: "center", marginTop: 30 },
});

export const WelcomeStyles = StyleSheet.create({
  textTitle: {
    fontSize: 36,
    marginBottom: 10,
  },
  generalText: {
    color: "whitesmoke",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    textAlign: "left",
    marginLeft: "15px",
  },
  btnAccess: {
    marginBottom: 40,
    borderRadius: 35,
    backgroundColor: "#228B22",
    width: "100%",
  },
  btnTextAccess: {
    paddingVertical: 18,
    position: "relative",
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});
