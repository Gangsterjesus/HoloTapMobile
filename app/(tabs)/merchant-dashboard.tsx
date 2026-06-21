/**
 * ============================================================
 *  HoloTap Mobile — Merchant Dashboard Screen
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Author: Raymond Newton
 *  Date: 21 June 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  Provides the primary merchant interface for the HoloTap mobile
 *  application. This dashboard acts as the central hub for QR
 *  generation, live payments, refunds, settlement, and merchant
 *  configuration flows.
 *
 *  Architecture Notes:
 *  - Built using Expo Router (app directory structure).
 *  - Stateless UI; business logic handled by backend services.
 *  - Designed for integration with merchant session endpoints.
 *  - Uses expo-image for performant logo rendering.
 *
 *  Engineering Notes:
 *  - Fully TypeScript‑compatible.
 *  - UI-only component; no inline API logic.
 *  - Navigation-ready for future merchant flows.
 *  - Safe for TM470 submission and commercial deployment.
 *
 * ============================================================
 */

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { Link } from "expo-router";

export default function MerchantDashboard() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../src/assets/HoloTap-Badge.png")}
        style={styles.logo}
      />

      <Text style={styles.title}>HoloTap Merchant</Text>
      <Text style={styles.subtitle}>Instant QR payments for UK businesses</Text>

      <View style={styles.buttonContainer}>
        <Link href="/generate-qr" asChild>
          <TouchableOpacity style={styles.buttonPrimary}>
            <Text style={styles.buttonText}>Show My QR Code</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/live-payments" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Live Payments</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/refund" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Refund / Void</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/settlement" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Settlement</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/settings" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Settings</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    paddingTop: 60,
  },
  logo: {
    width: 180,
    height: 180,
    borderRadius: 90,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#222",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 40,
  },
  buttonContainer: {
    width: "90%",
    gap: 16,
  },
  buttonPrimary: {
    backgroundColor: "#0078FF",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#333",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
