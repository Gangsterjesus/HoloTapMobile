/**
 * =============================================================================
 * HOLOTAP MOBILE — SETTINGS SCREEN (Flow 12)
 * =============================================================================
 */

import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import Constants from "expo-constants";
import { API_URL } from "../../src/config";

export default function SettingsScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.header}>Settings</Text>

      {/* Merchant Profile */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Merchant Profile</Text>
        <Text style={styles.cardText}>Merchant: HoloTap Merchant</Text>
        <Text style={styles.cardText}>Email: merchant@example.com</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/profile")}
        >
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* System Information */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>System Information</Text>

        <Text style={styles.cardText}>API Endpoint:</Text>
        <Text style={styles.apiText}>{API_URL}</Text>

        <Text style={styles.cardText}>
          App Version: {Constants.expoConfig?.version || "1.0.0"}
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/about")}
        >
          <Text style={styles.buttonText}>About HoloTap</Text>
        </TouchableOpacity>
      </View>

      {/* Diagnostics */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Diagnostics</Text>
        <Text style={styles.cardText}>Device ID: {Constants.deviceId}</Text>
        <Text style={styles.cardText}>Runtime: Expo</Text>

      <TouchableOpacity
  style={styles.button}
  onPress={() => router.push({ pathname: "/(tabs)/diagnostics" })}
>
  <Text style={styles.buttonText}>Open Diagnostics</Text>
</TouchableOpacity>

      </View>

      {/* Logout */}
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

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
  apiText: {
    fontSize: 14,
    marginBottom: 10,
    color: "#007AFF",
    fontWeight: "600",
  },
  button: {
    marginTop: 12,
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
