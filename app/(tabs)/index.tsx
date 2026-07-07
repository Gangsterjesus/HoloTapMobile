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
 *  Initial landing screen for the HoloTap mobile application.
 *  Verifies backend connectivity via the /test endpoint and
 *  displays the HoloTap brand identity. Serves as the entry
 *  point for merchant and consumer navigation flows.
 *
 *  Architecture Notes:
 *  - Expo Router (app directory structure).
 *  - Pure functional component; UI‑only.
 *  - Backend status fetched from src/config.js (API_URL).
 *  - Uses expo-image for performant asset rendering.
 *
 *  Engineering Notes:
 *  - Fully TypeScript‑compatible.
 *  - No inline business logic; safe for TM470 submission.
 *  - Cross‑platform layout consistency ensured.
 * ============================================================
 */

import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";

import { API_URL } from "../../src/config";

export default function HomeScreen() {
  console.log("API_URL is:", API_URL);

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
      <Image
        source={require("../../assets/images/icon.png")}
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
