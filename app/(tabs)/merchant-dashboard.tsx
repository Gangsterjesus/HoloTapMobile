/**
 * ============================================================
 *  HoloTapMobile — Merchant Dashboard (Scalable Edition)
 *  Engineer: Raymond Newton (E5357171)
 *  Assistant: Copilot Engineering Assistant
 *  Date: 01 July 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  PURPOSE:
 *  Provides the primary merchant interface for QR generation,
 *  live payments, refunds, settlement, and settings.
 *
 *  SCALABILITY PATCH:
 *  - Strong TypeScript typing
 *  - Modular DashboardCard component
 *  - Correct Expo Router v6 href types (NO group prefixes)
 *  - SafeAreaView for modern devices
 *  - Clean fintech UI
 *
 *  ROUTING NOTES:
 *  Your generated router types (from .expo/types/router.d.ts)
 *  confirm the allowed hrefs:
 *
 *    "/generate-qrc"
 *    "/live-payments"
 *    "/refund"
 *    "/settlement"
 *    "/settings"
 *    "/merchant-dashboard"
 *
 *  Therefore, hrefs MUST use these exact strings.
 * ============================================================
 */

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Href, Link } from "expo-router";

/**
 * ============================================================
 *  Typed Dashboard Card Component
 * ============================================================
 */
interface DashboardCardProps {
  title: string;
href: Href; // <- typed to Expo Router's href type
  primary?: boolean;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, href, primary }) => (
  <Link href={href} asChild>
    <TouchableOpacity style={primary ? styles.buttonPrimary : styles.button}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  </Link>
);

/**
 * ============================================================
 *  Main Merchant Dashboard Screen
 * ============================================================
 */
export default function MerchantDashboard() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Logo */}
      <Image
        source={require("../../src/assets/HoloTap-Badge.png")}
        style={styles.logo}
      />

      {/* Header */}
      <Text style={styles.title}>HoloTap Merchant</Text>
      <Text style={styles.subtitle}>Instant QR payments for UK businesses</Text>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <DashboardCard
          title="Show My QR Code"
          href="/generate-qrc"
          primary
        />

        <DashboardCard
          title="Live Payments"
          href="/live-payments"
        />

        <DashboardCard
          title="Refund / Void"
          href="/refund"
        />

        <DashboardCard
          title="Settlement"
          href="/settlement"
        />

        <DashboardCard
          title="Settings"
          href="/settings"
        />
      </View>
    </SafeAreaView>
  );
}

/**
 * ============================================================
 *  Stylesheet — Clean Fintech UI
 * ============================================================
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  logo: {
    width: 160,
    height: 160,
    borderRadius: 80,
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
    width: "100%",
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
