import AsyncStorage from "@react-native-async-storage/async-storage";

const UserReducer = async (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return action.payload;
    case "LOGOUT":
      AsyncStorage.removeItem("user");
      AsyncStorage.removeItem("token");
      return null;
    default:
      return state;
  }
};

export default UserReducer;
