import React from "react";
import { Image, StyleSheet, View } from "react-native";

export default function HoloTapBadge() {
  return (
    <View style={styles.container}>
    <Image
  source={require("../../assets/icon.png")}
  style={styles.badge}
  resizeMode="contain"
/>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  badge: {
    width: 160,
    height: 160,
  },
});
