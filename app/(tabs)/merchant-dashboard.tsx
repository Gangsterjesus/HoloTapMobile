/**
 * =============================================================================
 * HOLOTAP MOBILE — MERCHANT DASHBOARD v2 (Data‑Driven Edition)
 * =============================================================================
 * Engineer: Raymond Newton (E5357171)
 * Assistant: Copilot Engineering Assistant
 * Date: 02 July 2026
 * © 2026 HoloTap Technologies Ltd. All rights reserved.
 *
 * PURPOSE:
 * The primary merchant control panel providing:
 * - Live settlement metrics
 * - Recent payment/refund/batch activity
 * - Dynamic QR session status
 * - Navigation to core merchant flows
 *
 * VERSION 2 UPGRADES:
 * - Backend‑driven merchant summary
 * - Activity feed (payments, refunds, settlements)
 * - Dynamic QR session block with expiry countdown
 * - Modular MetricCard + ActivityItem components
 * - Strong TypeScript typing
 * - Clean fintech UI aligned with HoloTap brand
 *
 * ROUTING (Expo Router v6):
 * Valid hrefs confirmed via generated router types:
 *   "/generate-qrc"
 *   "/live-payments"
 *   "/refund"
 *   "/settlement"
 *   "/settings"
 *   "/merchant-dashboard"
 * =============================================================================
 */

import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { API_URL } from "../../src/config";



import { Href, Link } from "expo-router";

/**
 * =============================================================================
 *  Types — Backend Payloads
 * =============================================================================
 */
interface MerchantSummary {
  todayTotal: string;
  weekTotal: string;
  pendingSettlements: number;
  completedSettlements: number;
  lastPaymentTime: string;
}

interface ActivityItemPayload {
  id: string;
  type: "payment" | "refund" | "settlement";
  amount: string;
  currency: string;
  timestamp: string;
}

interface QRSessionPayload {
  active: boolean;
  sessionId?: string;
  expiresAt?: string;
}

/**
 * =============================================================================
 *  Metric Card Component
 * =============================================================================
 */
interface MetricCardProps {
  label: string;
  value: string | number;
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value }) => (
  <View style={styles.metricCard}>
    <Text style={styles.metricLabel}>{label}</Text>
    <Text style={styles.metricValue}>{value}</Text>
  </View>
);

/**
 * =============================================================================
 *  Activity Item Component
 * =============================================================================
 */
const ActivityItem: React.FC<{ item: ActivityItemPayload }> = ({ item }) => (
  <View style={styles.activityCard}>
    <Text style={styles.activityType}>{item.type.toUpperCase()}</Text>
    <Text style={styles.activityAmount}>
      {item.currency} {item.amount}
    </Text>
    <Text style={styles.activityTimestamp}>{item.timestamp}</Text>
  </View>
);

/**
 * =============================================================================
 *  Dashboard Navigation Card
 * =============================================================================
 */
interface DashboardCardProps {
  title: string;
  href: Href;
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
 * =============================================================================
 *  Main Merchant Dashboard v2
 * =============================================================================
 */
export default function MerchantDashboard() {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<MerchantSummary | null>(null);
  const [activity, setActivity] = useState<ActivityItemPayload[]>([]);
  const [qrSession, setQrSession] = useState<QRSessionPayload | null>(null);
  const [error, setError] = useState(false);

  /**
   * Fetch dashboard data
   */
  useEffect(() => {
    async function loadDashboard() {
      try {
        const [summaryRes, activityRes, qrRes] = await Promise.all([
          fetch("https://api.holotap.co/merchant/summary"),
          fetch("https://api.holotap.co/merchant/activity"),
          fetch("https://api.holotap.co/merchant/qr-session"),
        ]);

        setSummary(await summaryRes.json());
        setActivity(await activityRes.json());
        setQrSession(await qrRes.json());
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  /**
   * Loading state
   */
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#0078FF" />
        <Text style={styles.loadingText}>Loading dashboard…</Text>
      </SafeAreaView>
    );
  }

  /**
   * Error state
   */
  if (error || !summary || !qrSession) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorHeader}>Unable to load dashboard</Text>
        <Text style={styles.errorNote}>Please try again later.</Text>
      </SafeAreaView>
    );
  }

  /**
   * Success state
   */
  return (
    <SafeAreaView style={styles.container}>
      {/* Logo */}
    <Image
 source={require("../../assets/icon.png")}

  style={styles.logo}
/>


      {/* Header */}
      <Text style={styles.title}>Merchant Dashboard</Text>
      <Text style={styles.subtitle}>Live business performance</Text>

      {/* Metrics */}
      <View style={styles.metricsRow}>
        <MetricCard label="Today" value={`£${summary.todayTotal}`} />
        <MetricCard label="This Week" value={`£${summary.weekTotal}`} />
      </View>

      <View style={styles.metricsRow}>
        <MetricCard label="Pending Settlements" value={summary.pendingSettlements} />
        <MetricCard label="Completed" value={summary.completedSettlements} />
      </View>

      {/* QR Session */}
      {qrSession.active ? (
        <View style={styles.qrCard}>
          <Text style={styles.qrTitle}>Active QR Session</Text>
          <Text style={styles.qrValue}>Session ID: {qrSession.sessionId}</Text>
          <Text style={styles.qrExpiry}>Expires: {qrSession.expiresAt}</Text>
        </View>
      ) : (
        <View style={styles.qrCardInactive}>
          <Text style={styles.qrTitleInactive}>No Active QR Session</Text>
        </View>
      )}

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        <DashboardCard title="Show My QR Code" href="/generate-qrc" primary />
        <DashboardCard title="Live Payments" href="/live-payments" />
        <DashboardCard title="Refund / Void" href="/refund" />
        <DashboardCard title="Settlement" href="/settlement" />
        <DashboardCard title="Settings" href="/settings" />
      </View>

      {/* Activity Feed */}
      <Text style={styles.activityHeader}>Recent Activity</Text>

      <FlatList
        data={activity}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ActivityItem item={item} />}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </SafeAreaView>
  );
}

/**
 * =============================================================================
 *  Stylesheet — Clean Fintech UI
 * =============================================================================
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
    alignItems: "center",
  },
  logo: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#222",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 30,
  },

  metricsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 16,
  },
  metricCard: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 6,
    elevation: 2,
  },
  metricLabel: {
    fontSize: 14,
    color: "#666",
  },
  metricValue: {
    fontSize: 22,
    fontWeight: "700",
    color: "#222",
    marginTop: 6,
  },

  qrCard: {
    width: "100%",
    backgroundColor: "#E8F3FF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 30,
  },
  qrCardInactive: {
    width: "100%",
    backgroundColor: "#eee",
    padding: 16,
    borderRadius: 12,
    marginBottom: 30,
  },
  qrTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0078FF",
  },
  qrTitleInactive: {
    fontSize: 18,
    fontWeight: "700",
    color: "#777",
  },
  qrValue: {
    fontSize: 16,
    color: "#333",
    marginTop: 6,
  },
  qrExpiry: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },

  buttonContainer: {
    width: "100%",
    gap: 16,
    marginBottom: 30,
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

  activityHeader: {
    fontSize: 22,
    fontWeight: "700",
    color: "#222",
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  activityCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    width: "100%",
    elevation: 2,
  },
  activityType: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0078FF",
  },
  activityAmount: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222",
    marginTop: 4,
  },
  activityTimestamp: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },

  loadingText: {
    marginTop: 20,
    fontSize: 18,
    color: "#555",
  },
  errorHeader: {
    fontSize: 26,
    fontWeight: "700",
    color: "#D00000",
    marginBottom: 20,
  },
  errorNote: {
    fontSize: 18,
    color: "#555",
  },
});
