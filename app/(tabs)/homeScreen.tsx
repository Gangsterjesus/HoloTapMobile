/**
 * ============================================================
 *  HoloTap Mobile — Home Screen (Expo Router)
 *  Engineers: Raymond Newton holotap engineering with help from co-pilot AI
 *  Author: Raymond Newton
 *  Date: 08 July 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  Provides the initial landing screen for the HoloTap mobile
 *  application. Displays brand identity, verifies backend
 *  connectivity, and acts as the entry point for consumer and
 *  merchant flows.
 *
 *  Architecture Notes:
 *  - Built using Expo Router (app directory structure).
 *  - Fetches backend status from /test endpoint.
 *  - Renders HoloTapBadge component for brand identity.
 *  - Uses expo-image for performant image rendering.
 *  - Designed for expansion into dashboard navigation.
 *
 *  Engineering Notes:
 *  - Fully TypeScript-compatible.
 *  - No inline business logic; UI + fetch only.
 *  - API endpoints sourced from src/config.js.
 *  - Layout optimised for cross-platform consistency.
 *  - Safe for TM470 submission and commercial deployment.
 *
 * ============================================================
 */











import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import HoloTapBadge from "@/src/images/image";
import { API_URL } from "@/src/config";
import { apiGet, apiPost } from "../../api/client";

export default function HomeScreen() {
  const [message, setMessage] = useState("Connecting...");

  useEffect(() => {
    const url = `${API_URL}/test`;
    console.log("Fetching:", url);

    fetch(url)
      .then(res => res.text())
      .then(text => {
        console.log("Response:", text);
        setMessage(text);
      })
      .catch(err => {
        console.log("Fetch error:", err);
        setMessage("Connection failed");
      });
  }, []);

  return (
    <View style={styles.container}>
      <HoloTapBadge />

      <Text style={styles.text}>{message}</Text>

   <Image
 source={require("../../assets/icon.png")}

  style={styles.logo}
/>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  logo: {
    width: 220,
    height: 220,
    marginTop: 30,
    borderRadius: 110,
  },
  text: {
    fontSize: 28,
    fontWeight: "600",
    color: "#222",
    textAlign: "center",
    marginTop: 20,
  },
});
