/**
 * =============================================================================
 * HOLOTAP MOBILE — PAYMENT RESULT SCREEN (payment-result.tsx)
 * =============================================================================
 * Engineer: Raymond Newton (E5357171)
 * Assistant: Copilot Engineering Assistant
 * Date: 01 July 2026
 * © 2026 HoloTap Technologies Ltd. All rights reserved.
 *
 * PURPOSE:
 * Implements Flow 8 — Payment Result.
 * Displays the final payment outcome with multi‑currency support
 * (GBP, BTC, ETH, BRICS tokens, NFTs, future CBDC).
 *
 * SCALABILITY PATCH:
 * - Strong TypeScript typing for multi‑currency payloads
 * - Modular currency formatter
 * - NFT / crypto‑ready UI hooks
 * - Clean fintech UI
 * - Strict TypeScript + ESLint compliance
 *
 * FLOW ALIGNMENT:
 * Flow 6 → Payment Initialisation
 * Flow 7 → Payment Submission
 * Flow 8 → Payment Result (this screen)
 *
 * TM470 COMPLIANCE:
 * - Modular, testable, flow-aligned, maintainable
 * - No business logic inside UI
 * =============================================================================
 */

import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";

/**
 * =============================================================================
 *  TypeScript Types — Route Params (Multi‑Currency)
 * =============================================================================
 */
interface RouteParams {
  amount?: string;
  currency?: string; // "GBP" | "BTC" | "ETH" | "BRICS" | "NFT" | "CBDC"
  merchantId?: string;
  sessionId?: string;
  txHash?: string; // crypto transaction hash (future)
  nftId?: string;  // NFT receipt ID (future)
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
 *  Modular Currency Formatter — Clean & Testable
 * =============================================================================
 */
function formatCurrency(amount: string | undefined, currency: string | undefined): string {
  if (!amount || !currency) return "—";

  const meta = currencyMeta[currency] ?? currencyMeta.GBP;

  // Convert to number safely
  const numeric = Number(amount);
  if (isNaN(numeric)) return `${meta.symbol}${amount}`;

  return `${meta.symbol}${numeric.toFixed(meta.decimals)}`;
}

/**
 * =============================================================================
 *  Main Component — PaymentResult
 * =============================================================================
 */
export default function PaymentResult() {
  const router = useRouter();
  const { amount, currency, merchantId, sessionId, txHash, nftId } =
    useLocalSearchParams() as RouteParams;

  const formattedAmount = formatCurrency(amount, currency);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Payment Successful</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Amount Paid:</Text>
        <Text style={styles.value}>{formattedAmount}</Text>

        <Text style={styles.label}>Currency:</Text>
        <Text style={styles.value}>{currency ?? "GBP"}</Text>

        <Text style={styles.label}>Merchant ID:</Text>
        <Text style={styles.value}>{merchantId}</Text>

        <Text style={styles.label}>Session ID:</Text>
        <Text style={styles.value}>{sessionId}</Text>

        {txHash && (
          <>
            <Text style={styles.label}>Blockchain Tx Hash:</Text>
            <Text style={styles.value}>{txHash}</Text>
          </>
        )}

        {nftId && (
          <>
            <Text style={styles.label}>NFT Receipt ID:</Text>
            <Text style={styles.value}>{nftId}</Text>
          </>
        )}
      </View>

      <Text style={styles.hologram}>✨ Hologram Animation Triggered ✨</Text>

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
 *  Stylesheet — Clean Fintech UI
 * =============================================================================
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "center",
  },
  header: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 30,
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
    fontSize: 18,
    fontWeight: "600",
    color: "#0078FF",
    marginBottom: 40,
  },
  link: {
    fontSize: 18,
    color: "#0078FF",
    fontWeight: "600",
  },
});
