import { View, Text } from "react-native";
import { apiGet } from "../api/client";
import { API_URL } from "../src/config";

export default function ProfileScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24 }}>Profile Screen</Text>
    </View>
  );
}
 p