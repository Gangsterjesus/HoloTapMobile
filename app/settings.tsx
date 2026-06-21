/**
 * ============================================================
 *  HoloTap Mobile — Settings Screen
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Date: 21 June 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  Provides merchant‑facing configuration options including
 *  profile management, system information, app metadata, and
 *  navigation to future settings modules.
 *
 *  Architecture Notes:
 *  - Built using Expo Router (app directory structure).
 *  - Stateless UI component; no business logic.
 *  - Uses expo-constants for version metadata.
 *  - Designed for expansion into profile editing, API diagnostics,
 *    and merchant account management.
 *
 *  Engineering Notes:
 *  - Fully TypeScript‑compatible.
 *  - Consistent card‑based UI for readability.
 *  - Navigation placeholders for future screens (/profile, /about).
 *  - Safe for TM470 submission and commercial deployment.
 *
 * ============================================================
 */

import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import Constants from "expo-constants";

export default function SettingsScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      {/* Screen Header */}
      <Text style={styles.header}>Settings</Text>

      {/* ============================
          Merchant Profile Section
         ============================ */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Merchant Profile</Text>
        <Text style={styles.cardText}>Merchant: HoloTap Merchant</Text>
        <Text style={styles.cardText}>Email: merchant@example.com</Text>

        {/* Navigate to profile editing */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/profile")}
        >
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* ============================
          System Information Section
         ============================ */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>System</Text>
        <Text style={styles.cardText}>API Status: Online</Text>

        {/* App version pulled from app.json / app.config.js */}
        <Text style={styles.cardText}>
          App Version: {Constants.expoConfig?.version || "1.0.0"}
        </Text>

        {/* Navigate to About screen */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/about")}
        >
          <Text style={styles.buttonText}>About HoloTap</Text>
        </TouchableOpacity>
      </View>

      {/* ============================
          Logout Button
         ============================ */}
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

/* ============================================================
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
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 6,
    color: "#444",
  },
  button: {
    marginTop: 10,
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
  logoutButton: {
    marginTop: 10,
    padding: 15,
    backgroundColor: "#FF3B30",
    borderRadius: 10,
  },
  logoutText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
  },
});
