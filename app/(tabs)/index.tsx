/**
 * ============================================================
 *  HoloTap Mobile — Home Screen (Expo Router)
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Author: Raymond Newton
 *  Date: 21 June 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  Provides the initial landing screen for the HoloTap mobile
 *  application. This screen verifies backend connectivity and
 *  displays the HoloTap brand identity. It acts as the entry
 *  point for merchant and consumer flows.
 *
 *  Architecture Notes:
 *  - Built using Expo Router (app directory structure).
 *  - Pure functional component with no business logic.
 *  - Fetches backend status from /test endpoint.
 *  - Designed for expansion into merchant dashboard navigation.
 *  - Uses expo-image for performant logo rendering.
 *
 *  Engineering Notes:
 *  - Fully TypeScript‑compatible.
 *  - No inline business logic; UI only.
 *  - All API endpoints sourced from src/config.js.
 *  - Layout optimised for cross‑platform consistency.
 *  - Safe for TM470 submission and commercial deployment.
 *
 * ============================================================
 */

import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { API_URL } from "../../src/config";

export default function HomeScreen() {
  const [message, setMessage] = useState("Connecting...");

  useEffect(() => {
    fetch(`${API_URL}/test`)
      .then(res => res.text())
      .then(text => setMessage(text))
      .catch(() => setMessage("Connection failed"));
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../src/assets/HoloTap-Badge.png")}
        style={styles.logo}
      />
      <Text style={styles.text}>{message}</Text>
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
    marginBottom: 30,
    borderRadius: 110,
  },
  text: {
    fontSize: 28,
    fontWeight: "600",
    color: "#222",
    textAlign: "center",
  },
});
