/**
 * =============================================================================
 * ENGINEERING HEADER — SETTLEMENT OVERVIEW (Flow 10)
 * =============================================================================
 * Author: Raymond Newton
 * Date: 01 July 2026
 * File: settlement.tsx
 *
 * PURPOSE:
 * Provides the merchant with a multi‑currency settlement overview. Displays
 * totals per currency (GBP, BTC, ETH, BRICS, NFTs, CBDC) and lists settlement
 * batches returned by the backend. Each batch can be tapped to open a detailed
 * settlement breakdown (Flow 11).
 *
 * =============================================================================
 */

import { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { apiGet } from "../../api/client";

import { API_URL } from "../../src/config";

interface SettlementTotals {
  GBP?: string;
  BTC?: string;
  ETH?: string;
  BRICS?: string;
  NFT?: string;
  CBDC?: string;
}

interface SettlementBatch {
  batchId: string;
  currency: string;
  total: string;
  timestamp: string;
  txHash?: string | null;
  nftId?: string | null;
}

const currencyMeta: Record<string, { symbol: string; decimals: number }> = {
  GBP: { symbol: "£", decimals: 2 },
  BTC: { symbol: "₿", decimals: 8 },
  ETH: { symbol: "Ξ", decimals: 8 },
  BRICS: { symbol: "Ƀ", decimals: 4 },
  NFT: { symbol: "NFT#", decimals: 0 },
  CBDC: { symbol: "¤", decimals: 2 },
};

function formatCurrency(amount: string | undefined, currency: string) {
  if (!amount) return "—";
  const meta = currencyMeta[currency] ?? currencyMeta.GBP;
  const num = Number(amount);
  if (isNaN(num)) return `${meta.symbol}${amount}`;
  return `${meta.symbol}${num.toFixed(meta.decimals)}`;
}

export default function SettlementScreen() {
  const router = useRouter();
  const [totals, setTotals] = useState<SettlementTotals>({});
  const [batches, setBatches] = useState<SettlementBatch[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function loadSettlement() {
    try {
      const data = await apiGet("/settlement/overview");
      setTotals(data.totals);
      setBatches(data.batches);
    } catch {
      setError("Unable to load settlement data.");
    }
  }

  useEffect(() => {
    loadSettlement();
  }, []);

  function openBatch(batch: SettlementBatch) {
    const next = {
      pathname: "/settlement-batch",
      params: {
        batchId: batch.batchId,
        currency: batch.currency,
        total: batch.total,
        timestamp: batch.timestamp,
        txHash: batch.txHash ?? undefined,
        nftId: batch.nftId ?? undefined,
      },
    } as any;
    router.push(next);
  }

  if (error) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.error}>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Settlement Overview</Text>

      <View style={styles.totalsCard}>
        <Text style={styles.sectionHeader}>Totals by Currency</Text>

        {Object.keys(currencyMeta).map((currency) => (
          <View key={currency} style={styles.totalRow}>
            <Text style={styles.totalLabel}>{currency}</Text>
            <Text style={styles.totalValue}>
              {formatCurrency(totals[currency as keyof SettlementTotals], currency)}
            </Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionHeader}>Settlement Batches</Text>

      <FlatList
        data={batches}
        keyExtractor={(item) => item.batchId}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.batchCard} onPress={() => openBatch(item)}>
            <Text style={styles.batchCurrency}>{item.currency}</Text>
            <Text style={styles.batchAmount}>
              {formatCurrency(item.total, item.currency)}
            </Text>
            <Text style={styles.batchTime}>
              {new Date(item.timestamp).toLocaleString()}
            </Text>

            {item.txHash && (
              <Text style={styles.batchMeta}>Tx Hash: {item.txHash}</Text>
            )}

            {item.nftId && (
              <Text style={styles.batchMeta}>NFT ID: {item.nftId}</Text>
            )}
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.center}>
            <Text style={styles.empty}>No settlement batches available.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 12,
  },
  totalsCard: {
    backgroundColor: "#f5f5f5",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 6,
  },
  totalLabel: {
    fontSize: 16,
    color: "#555",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "600",
  },
  batchCard: {
    backgroundColor: "#f5f5f5",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  batchCurrency: {
    fontSize: 18,
    fontWeight: "600",
  },
  batchAmount: {
    fontSize: 16,
    marginTop: 4,
  },
  batchTime: {
    fontSize: 14,
    marginTop: 4,
    color: "#555",
  },
  batchMeta: {
    fontSize: 12,
    marginTop: 4,
    color: "#777",
  },
  error: {
    fontSize: 18,
    color: "#D32F2F",
    fontWeight: "600",
  },
  empty: {
    fontSize: 16,
    color: "#777",
  },
});
