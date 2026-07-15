/**
 * =============================================================================
 * ENGINEERING HEADER — LIVE PAYMENTS FEED (Flow 9)
 * =============================================================================
 * Author: Raymond Newton
 * Date: 01 July 2026
 * File: live-payments.tsx
 *
 * -----------------------------------------------------------------------------
 * PURPOSE
 * -----------------------------------------------------------------------------
 * This screen provides the merchant with a real‑time feed of incoming payments.
 * It polls the backend for live transaction data and displays each payment with
 * multi‑currency support (GBP, BTC, ETH, BRICS, NFTs, CBDC). Each item can be
 * tapped to open the Payment Result screen for full transaction details.
 *
 * -----------------------------------------------------------------------------
 * ARCHITECTURE NOTES
 * -----------------------------------------------------------------------------
 * - Polls /payments/live every 3 seconds for updated transaction data.
 * - Supports future‑proof currency formatting via currencyMeta + formatCurrency().
 * - Uses FlatList for scalable rendering of large payment histories.
 * - Integrates with Expo Router v6 using typed Href navigation.
 * - Each payment item includes optional blockchain fields (txHash, nftId).
 * - Designed for merchant dashboards and real‑time monitoring workflows.
 *
 * -----------------------------------------------------------------------------
 * FLOW ALIGNMENT
 * -----------------------------------------------------------------------------
 * Flow 8: Payment Result
 *   - Individual payments can be opened to view full details.
 *
 * Flow 9: Live Payments Feed (this screen)
 *   - Displays incoming payments in real time.
 *
 * Flow 10+: Settlement / Refund / Analytics
 *   - Future screens will consume the same multi‑currency transaction model.
 *
 * -----------------------------------------------------------------------------
 * ENGINEERING NOTES
 * -----------------------------------------------------------------------------
 * - Polling interval is set to 3000ms; can be replaced with WebSockets later.
 * - Multi‑currency formatting is centralised for consistency across all flows.
 * - Error handling is intentionally lightweight to keep the feed responsive.
 * - The screen is designed to be visually simple but operationally powerful.
 *
 * -----------------------------------------------------------------------------
 * TESTING NOTES
 * -----------------------------------------------------------------------------
 * - Verify backend returns correct JSON structure for each payment item.
 * - Confirm auto‑refresh updates the list without UI flicker.
 * - Test navigation into payment-result.tsx with all currency types.
 * - Validate formatting for BTC/ETH/NFT/BRICS/CBDC amounts.
 *
 * =============================================================================
 */

import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, type Href } from "expo-router";
import { apiGet } from "../../api/client";
import { API_URL } from "../../src/config";


interface PaymentItem {
  id: string;
  amount: string;
  currency: string;
  status: string;
  timestamp: string;
  merchantId: string;
  sessionId: string;
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

function formatCurrency(amount: string, currency: string) {
  const meta = currencyMeta[currency] ?? currencyMeta.GBP;
  const num = Number(amount);
  if (isNaN(num)) return `${meta.symbol}${amount}`;
  return `${meta.symbol}${num.toFixed(meta.decimals)}`;
}

export default function LivePaymentsScreen() {
  const router = useRouter();
  const [payments, setPayments] = useState<PaymentItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function loadPayments() {
    try {
      const data = await apiGet("/payments/live");
      setPayments(data);
    } catch {
      setError("Unable to load live payments.");
    }
  }

  useEffect(() => {
    loadPayments();
    const interval = setInterval(loadPayments, 3000);
    return () => clearInterval(interval);
  }, []);

  function openPayment(item: PaymentItem) {
    const next: Href = {
      pathname: "/payment-result",
      params: {
        amount: item.amount,
        currency: item.currency,
        merchantId: item.merchantId,
        sessionId: item.sessionId,
        txHash: item.txHash ?? undefined,
        nftId: item.nftId ?? undefined,
      },
    };
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
      <Text style={styles.header}>Live Payments</Text>

      <FlatList
        data={payments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => openPayment(item)}>
            <Text style={styles.amount}>
              {formatCurrency(item.amount, item.currency)}
            </Text>
            <Text style={styles.status}>{item.status.toUpperCase()}</Text>
            <Text style={styles.time}>
              {new Date(item.timestamp).toLocaleTimeString()}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.center}>
            <Text style={styles.empty}>No live payments yet.</Text>
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
  card: {
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    marginBottom: 12,
  },
  amount: {
    fontSize: 20,
    fontWeight: "600",
  },
  status: {
    marginTop: 4,
    fontSize: 14,
    color: "#0078FF",
  },
  time: {
    marginTop: 4,
    fontSize: 12,
    color: "#555",
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
