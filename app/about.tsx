/**
 * ============================================================
 *  HoloTapMobile — About Screen
 *  Engineer: Raymond Newton (E5357171)
 *  Assistant: Copilot Engineering Assistant
 *  Date: 21 June 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  Provides product information for merchants including:
 *  - HoloTap mission statement
 *  - Version metadata
 *  - Technology stack overview
 *
 *  Architecture:
 *  - Expo Router (file-based routing).
 *  - Stateless UI component.
 *  - Uses expo-constants for app metadata.
 *
 *  Notes:
 *  - Linked from Settings screen.
 *  - Safe for TM470 submission and commercial deployment.
 * ============================================================
 */

import { View, Text, StyleSheet } from "react-native";
import Constants from "expo-constants";

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>About HoloTap</Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Our Mission</Text>
        <Text style={styles.text}>
          HoloTap enables fast, secure, and frictionless QR-based payments for
          merchants and customers. Designed for simplicity and reliability.
        </Text>

        <Text style={styles.sectionTitle}>App Version</Text>
        <Text style={styles.text}>
          {Constants.expoConfig?.version || "1.0.0"}
        </Text>

        <Text style={styles.sectionTitle}>Technology</Text>
        <Text style={styles.text}>
          Built with React Native, Expo Router, and a Node.js backend.
        </Text>
      </View>
    </View>
  );
}

/**
 * ============================================================
 *  Stylesheet
 * ============================================================
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F7FA",
  },
  header: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 6,
  },
  text: {
    fontSize: 16,
    color: "#444",
    marginBottom: 10,
  },
});
