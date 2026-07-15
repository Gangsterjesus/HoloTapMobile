/**
 * =============================================================================
 * HOLOTAP MOBILE — PAYMENT RESULT SCREEN (payment-result.tsx)
 * =============================================================================
 * Engineer: Raymond Newton (E5357171)
 * Assistant: Copilot Engineering Assistant
 * Date: 02 July 2026
 * © 2026 HoloTap Technologies Ltd. All rights reserved.
 *
 * PURPOSE:
 * Fully upgraded Flow 8 — Payment Result screen.
 * Adds hologram animation, backend verification, loading state,
 * success/failure UI, auto‑return timer, and strict TypeScript typing.
 *
 * TM470 COMPLIANCE:
 * - Modular, testable, flow‑aligned, maintainable
 * - No business logic inside UI
 * - Strong typing + clean architecture
 * =============================================================================
 */

import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { API_URL } from "../src/config";



import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
} from "react-native-reanimated";

/**
 * =============================================================================
 *  TypeScript Types — Route Params (Multi‑Currency + Status)
 * =============================================================================
 */
interface RouteParams {
  amount?: string;
  currency?: string;
  merchantId?: string;
  sessionId?: string;
  status?: "success" | "failed";
  txHash?: string;
  nftId?: string;
}

/**
 * =============================================================================
 *  Currency Metadata — Scalable for Future Currencies
 * =============================================================================
 */
const currencyMeta: Record<string, { symbol: string; decimals: number }> = {
  GBP: { symbol: "£", decimals: 2 },
  BTC: { symbol: "₿", decimals: 8 },
  ETH: { symbol: "Ξ", decimals: 8 },
  BRICS: { symbol: "Ƀ", decimals: 4 },
  NFT: { symbol: "NFT#", decimals: 0 },
  CBDC: { symbol: "¤", decimals: 2 },
};

/**
 * =============================================================================
 *  Modular Currency Formatter
 * =============================================================================
 */
function formatCurrency(amount?: string, currency?: string): string {
  if (!amount || !currency) return "—";
  const meta = currencyMeta[currency] ?? currencyMeta.GBP;
  const numeric = Number(amount);
  if (isNaN(numeric)) return `${meta.symbol}${amount}`;
  return `${meta.symbol}${numeric.toFixed(meta.decimals)}`;
}

/**
 * =============================================================================
 *  Main Component — PaymentResult (Upgraded)
 * =============================================================================
 */
export default function PaymentResult() {
  const router = useRouter();
  const params = useLocalSearchParams() as RouteParams;

  const [loading, setLoading] = useState(true);
  const [backendStatus, setBackendStatus] = useState<"success" | "failed">(
    params.status ?? "success"
  );

  const formattedAmount = formatCurrency(params.amount, params.currency);

  /**
   * =============================================================================
   *  Backend Verification — Ensures Payment Integrity
   * =============================================================================
   */
  useEffect(() => {
    async function verifyPayment() {
      try {
        const res = await fetch(
          `https://api.holotap.co/payment/result?sessionId=${params.sessionId}`
        );
        const json = await res.json();

        setBackendStatus(json.status ?? "failed");
      } catch {
        setBackendStatus("failed");
      } finally {
        setLoading(false);
      }
    }

    verifyPayment();
  }, [params.sessionId]);

  /**
   * =============================================================================
   *  Hologram Animation — Reanimated v3
   * =============================================================================
   */
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withSequence(
      withTiming(1, { duration: 600 }),
      withRepeat(withTiming(0.4, { duration: 800 }), -1, true)
    );
  }, [opacity]);

  const hologramStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: opacity.value + 0.6 }],
  }));

  /**
   * =============================================================================
   *  Auto‑Return Timer — 4 Seconds
   * =============================================================================
   */
  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        router.replace("/merchant-dashboard");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [loading, router]);

  /**
   * =============================================================================
   *  Loading State
   * =============================================================================
   */
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#0078FF" />
        <Text style={styles.loadingText}>Verifying payment…</Text>
      </SafeAreaView>
    );
  }

  /**
   * =============================================================================
   *  Failure State
   * =============================================================================
   */
  if (backendStatus === "failed") {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.failedHeader}>Payment Failed</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Session ID:</Text>
          <Text style={styles.value}>{params.sessionId}</Text>

          <Text style={styles.label}>Merchant ID:</Text>
          <Text style={styles.value}>{params.merchantId}</Text>
        </View>

        <Text style={styles.failedNote}>
          The payment could not be completed.
        </Text>

        <Text
          style={styles.link}
          onPress={() => router.replace("/merchant-dashboard")}
        >
          Return to Dashboard
        </Text>
      </SafeAreaView>
    );
  }

  /**
   * =============================================================================
   *  Success State — With Hologram Animation
   * =============================================================================
   */
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Payment Successful</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Amount Paid:</Text>
        <Text style={styles.value}>{formattedAmount}</Text>

        <Text style={styles.label}>Currency:</Text>
        <Text style={styles.value}>{params.currency}</Text>

        <Text style={styles.label}>Merchant ID:</Text>
        <Text style={styles.value}>{params.merchantId}</Text>

        <Text style={styles.label}>Session ID:</Text>
        <Text style={styles.value}>{params.sessionId}</Text>

        {params.txHash && (
          <>
            <Text style={styles.label}>Blockchain Tx Hash:</Text>
            <Text style={styles.value}>{params.txHash}</Text>
          </>
        )}

        {params.nftId && (
          <>
            <Text style={styles.label}>NFT Receipt ID:</Text>
            <Text style={styles.value}>{params.nftId}</Text>
          </>
        )}
      </View>

      <Animated.Text style={[styles.hologram, hologramStyle]}>
        ✨ Hologram Activated ✨
      </Animated.Text>

      <Text style={styles.autoReturn}>Returning to dashboard…</Text>
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
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 30,
    color: "#0078FF",
  },
  failedHeader: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 30,
    color: "#D00000",
  },
  card: {
    width: "100%",
    backgroundColor: "#f5f5f5",
    padding: 20,
    borderRadius: 12,
    marginBottom: 40,
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
  hologram: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0078FF",
    marginBottom: 20,
  },
  autoReturn: {
    fontSize: 16,
    color: "#777",
  },
  failedNote: {
    fontSize: 18,
    color: "#D00000",
    marginBottom: 40,
  },
  link: {
    fontSize: 18,
    color: "#0078FF",
    fontWeight: "600",
  },
  loadingText: {
    marginTop: 20,
    fontSize: 18,
    color: "#555",
  },
});
