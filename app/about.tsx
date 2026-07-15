/**
 * ============================================================
 *  HoloTapMobile — About Screen (Scalable Edition)
 *  Engineer: Raymond Newton (E5357171)
 *  Assistant: Copilot Engineering Assistant
 *  Date: 01 July 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  Provides merchant-facing product information including:
 *  - Mission statement
 *  - Dynamic version metadata
 *  - Technology stack overview
 *
 *  Scalability Patch:
 *  - Centralised metadata extraction
 *  - Future-proof config access (expo-constants + manifest fallback)
 *  - Modular UI sections for expansion
 *  - Safe for TM470 submission and commercial deployment
 *
 *  Architecture:
 *  - Stateless UI component
 *  - Expo Router (file-based routing)
 *  - Uses expo-constants for build metadata
 * ============================================================
 */

import { View, Text, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { apiGet } from "../api/client";
import { API_URL } from "../src/config";
/**
 * ============================================================
 *  Metadata Extraction (Scalable + Future-Proof)
 * ============================================================
 *  - Supports both expoConfig (EAS builds) and manifest (classic Expo)
 *  - Provides fallback values for TM470 stability
 *  - Centralised extraction ensures maintainability
 */
const appVersion: string =
  Constants.expoConfig?.version ||
  Constants.manifest?.version ||
  "1.0.0";

const buildNumber: string =
  Constants.expoConfig?.extra?.buildNumber ||
  Constants.manifest?.extra?.buildNumber ||
  "N/A";

const environment: string =
  Constants.expoConfig?.extra?.env ||
  Constants.manifest?.extra?.env ||
  "production";

/**
 * ============================================================
 *  Section Component (Modular + Typed)
 * ============================================================
 *  - Strong typing prevents TS7031 errors
 *  - React.ReactNode supports nested JSX
 *  - Modular design allows scalable UI expansion
 */
interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

/**
 * ============================================================
 *  Main Screen Component
 * ============================================================
 *  - Stateless
 *  - Scrollable for scalability
 *  - SafeAreaView prevents clipping on modern devices
 */
export default function AboutScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.header}>About HoloTap</Text>

        <View style={styles.card}>
          {/* Mission Section */}
          <Section title="Our Mission">
            <Text style={styles.text}>
              HoloTap enables fast, secure, and frictionless QR-based payments
              for merchants and customers. Designed for simplicity, reliability,
              and scalable deployment across UK businesses.
            </Text>
          </Section>

          {/* Version Metadata Section */}
          <Section title="App Version">
            <Text style={styles.text}>Version: {appVersion}</Text>
            <Text style={styles.text}>Build: {buildNumber}</Text>
            <Text style={styles.text}>Environment: {environment}</Text>
          </Section>

          {/* Technology Section */}
          <Section title="Technology Stack">
            <Text style={styles.text}>
              Built with React Native, Expo Router, TypeScript, and a Node.js
              backend. Engineered for modularity, scalability, and secure
              merchant integrations.
            </Text>
          </Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/**
 * ============================================================
 *  Stylesheet
 * ============================================================
 *  - Clean fintech aesthetic
 *  - Consistent spacing and typography
 *  - Cross-platform shadow support
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    paddingHorizontal: 20,
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
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 6,
  },
  text: {
    fontSize: 16,
    color: "#444",
    marginBottom: 6,
  },
});
