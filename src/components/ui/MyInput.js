import { SearchIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
export default function MyInput({ placeholder, isDisabled = false }) {
  return (
    <Input isDisabled={isDisabled} style={styles.input}>
      <InputSlot style={styles.icon}>
        <Icon name="search" size={18} color="#888" />
      </InputSlot>
      <InputField placeholder={placeholder} />
    </Input>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 24,
    paddingHorizontal: 10,
    paddingVertical: 2,
    backgroundColor: "#ddd",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  icon: {
    padding: 10,
  },
});
