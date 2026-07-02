/**
 * =============================================================================
 * HOLOTAP MOBILE — SETTLEMENT BATCH DETAIL SCREEN (batch-id.tsx)
 * =============================================================================
 * Engineer: Raymond Newton (E5357171)
 * Assistant: Copilot Engineering Assistant
 * Date: 02 July 2026
 * © 2026 HoloTap Technologies Ltd. All rights reserved.
 *
 * PURPOSE:
 * Displays the full details of a settlement batch including:
 * - Batch metadata (ID, currency, totals, item count, timestamp)
 * - A scrollable list of all transactions inside the batch
 * - Multi‑currency formatting for fiat and digital assets
 * - Loading and error handling states
 *
 * ARCHITECTURE NOTES:
 * - Uses Expo Router for param‑based navigation
 * - Fetches batch data from the HoloTap backend API
 * - Stateless UI; all business logic remains server‑side
 * - Consistent fintech UI styling aligned with HoloTap design language
 *
 * ENGINEERING NOTES:
 * - Fully typed with strict TypeScript interfaces
 * - No unused variables or hooks
 * - All React Hooks include correct dependency arrays
 * - JSX structure validated to avoid parse errors
 * =============================================================================
 */


import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";

/**
 * Types
 */
interface RouteParams {
  batchId?: string;
}

interface BatchItem {
  txId: string;
  amount: string;
  currency: string;
  merchantId: string;
  sessionId: string;
  status: "success" | "failed";
}

interface BatchPayload {
  batchId: string;
  currency: string;
  totalAmount: string;
  itemCount: number;
  timestamp: string;
  items: BatchItem[];
}

/**
 * Currency formatting
 */
const currencyMeta: Record<string, { symbol: string; decimals: number }> = {
  GBP: { symbol: "£", decimals: 2 },
  BTC: { symbol: "₿", decimals: 8 },
  ETH: { symbol: "Ξ", decimals: 8 },
  BRICS: { symbol: "Ƀ", decimals: 4 },
  CBDC: { symbol: "¤", decimals: 2 },
};

function formatCurrency(amount?: string, currency?: string): string {
  if (!amount || !currency) return "—";
  const meta = currencyMeta[currency] ?? currencyMeta.GBP;
  const numeric = Number(amount);
  if (isNaN(numeric)) return `${meta.symbol}${amount}`;
  return `${meta.symbol}${numeric.toFixed(meta.decimals)}`;
}

/**
 * Main Component
 */
export default function BatchDetail() {
  const router = useRouter();
  const { batchId } = useLocalSearchParams() as RouteParams;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [batch, setBatch] = useState<BatchPayload | null>(null);

  /**
   * Fetch batch details
   */
  useEffect(() => {
    async function loadBatch() {
      try {
        const res = await fetch(`https://api.holotap.co/batch/${batchId}`);
        const json = await res.json();
        setBatch(json);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadBatch();
  }, [batchId]);

  /**
   * Loading state
   */
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#0078FF" />
        <Text style={styles.loadingText}>Loading batch details…</Text>
      </SafeAreaView>
    );
  }

  /**
   * Error state
   */
  if (error || !batch) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorHeader}>Unable to load batch</Text>
        <Text style={styles.errorNote}>
          Something went wrong while fetching batch data.
        </Text>

        <Text
          style={styles.link}
          onPress={() => router.replace("/settlement")}
        >
          Return to Settlement Overview
        </Text>
      </SafeAreaView>
    );
  }

  /**
   * Render transaction item
   */
  const renderItem = ({ item }: { item: BatchItem }) => (
    <View style={styles.txCard}>
      <Text style={styles.txLabel}>Transaction ID:</Text>
      <Text style={styles.txValue}>{item.txId}</Text>

      <Text style={styles.txLabel}>Amount:</Text>
      <Text style={styles.txValue}>
        {formatCurrency(item.amount, item.currency)}
      </Text>

      <Text style={styles.txLabel}>Status:</Text>
      <Text
        style={[
          styles.txValue,
          { color: item.status === "success" ? "#0A8F00" : "#D00000" },
        ]}
      >
        {item.status}
      </Text>
    </View>
  );

  /**
   * Success state
   */
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Batch Details</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Batch ID:</Text>
        <Text style={styles.value}>{batch.batchId}</Text>

        <Text style={styles.label}>Total Amount:</Text>
        <Text style={styles.value}>
          {formatCurrency(batch.totalAmount, batch.currency)}
        </Text>

        <Text style={styles.label}>Currency:</Text>
        <Text style={styles.value}>{batch.currency}</Text>

        <Text style={styles.label}>Items:</Text>
        <Text style={styles.value}>{batch.itemCount}</Text>

        <Text style={styles.label}>Timestamp:</Text>
        <Text style={styles.value}>{batch.timestamp}</Text>
      </View>

      <Text style={styles.subHeader}>Transactions</Text>

      <FlatList
        data={batch.items}
        keyExtractor={(item) => item.txId}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 40 }}
      />

      <Text
        style={styles.link}
        onPress={() => router.replace("/settlement")}
      >
        Return to Settlement Overview
      </Text>
    </SafeAreaView>
  );
}

/**
 * Stylesheet
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
    color: "#0078FF",
    textAlign: "center",
  },
  subHeader: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
  },
  card: {
    backgroundColor: "#f5f5f5",
    padding: 20,
    borderRadius: 12,
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    color: "#555",
    marginTop: 10,
  },
  value: {
    fontSize: 20,
    fontWeight: "600",
    color: "#222",
  },
  txCard: {
    backgroundColor: "#fafafa",
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#eee",
  },
  txLabel: {
    fontSize: 14,
    color: "#666",
    marginTop: 6,
  },
  txValue: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222",
  },
  link: {
    fontSize: 18,
    color: "#0078FF",
    fontWeight: "600",
    textAlign: "center",
    marginTop: 20,
  },
  loadingText: {
    marginTop: 20,
    fontSize: 18,
    color: "#555",
    textAlign: "center",
  },
  errorHeader: {
    fontSize: 26,
    fontWeight: "700",
    color: "#D00000",
    marginBottom: 20,
    textAlign: "center",
  },
  errorNote: {
    fontSize: 18,
    color: "#555",
    marginBottom: 40,
    textAlign: "center",
  },
});
