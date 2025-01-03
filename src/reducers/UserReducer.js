import AsyncStorage from "@react-native-async-storage/async-storage";

const UserReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      const { user } = action.payload;
      if (user) AsyncStorage.setItem("user", JSON.stringify(user));

      return {  user };
    case "LOGOUT":
      AsyncStorage.removeItem("user");
      AsyncStorage.removeItem("token");
      return null;
    default:
      return state;
  }
};

export default UserReducer;

