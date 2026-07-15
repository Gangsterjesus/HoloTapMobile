/**
 * =============================================================================
 * HOLOTAP MOBILE — PAYMENT INITIALISATION (payment.tsx)
 * =============================================================================
 * Engineer: Raymond Newton (E5357171)
 * Assistant: Copilot Engineering Assistant
 * Date: 01 July 2026
 * © 2026 HoloTap Technologies Ltd. All rights reserved.
 *
 * PURPOSE:
 * Implements Flow 6 + Flow 7 — Payment Initialisation & Submission.
 * Receives merchantId + sessionId from Flow 4, allows the user to enter
 * payment details, submits them to the backend, and transitions into
 * Flow 8 (Payment Result).
 *
 * SCALABILITY PATCH:
 * - Strong TypeScript typing for route params + backend response
 * - Modular payment helper
 * - Typed navigation (Href)
 * - Deterministic lifecycle
 * - Clean fintech UI
 * - Strict TypeScript + ESLint compliance
 *
 * FLOW ALIGNMENT:
 * Flow 4 → Session Verification (payment-verification.tsx)
 * Flow 5 → Payment Initialisation (this screen)
 * Flow 6 → Payment Submission
 * Flow 8 → Payment Result (payment-result.tsx)
 *
 * TM470 COMPLIANCE:
 * - Modular, testable, flow-aligned, maintainable
 * - No business logic inside UI
 * =============================================================================
 */

import React, { useState } from "react";
import { Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter, type Href } from "expo-router";
import { apiPost } from "../api/client";
import { API_URL } from "../src/config";

/**
 * =============================================================================
 *  TypeScript Types — Route Params + Backend Response
 * =============================================================================
 */
interface RouteParams {
  merchantId?: string;
  sessionId?: string;
}

interface PaymentResponse {
  success: boolean;
  message?: string;
}

/**
 * =============================================================================
 *  Modular Payment Helper — Clean & Testable
 * =============================================================================
 */
async function submitPayment(
  merchantId: string,
  sessionId: string,
  amount: number,
  description: string
): Promise<PaymentResponse> {
  return apiPost("/payment/process", {
    merchantId,
    sessionId,
    amount,
    description,
  });
}

/**
 * =============================================================================
 *  Main Component — Payment
 * =============================================================================
 */
export default function Payment() {
  const router = useRouter();
  const { merchantId, sessionId } = useLocalSearchParams() as RouteParams;

  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  /**
   * ---------------------------------------------------------------------------
   * Handle Payment Submission
   * ---------------------------------------------------------------------------
   */
  async function handlePay() {
    if (!merchantId || !sessionId) {
      Alert.alert("Missing Data", "Merchant or session ID is missing.");
      return;
    }

    if (!amount || isNaN(Number(amount))) {
      Alert.alert("Invalid Amount", "Please enter a valid numeric amount.");
      return;
    }

    setLoading(true);

    try {
      const result = await submitPayment(
        merchantId,
        sessionId,
        Number(amount),
        description
      );

      if (result.success) {
        const next: Href = {
          pathname: "/payment-result",
          params: {
            amount,
            merchantId,
            sessionId,
          },
        };

        router.push(next);
        return;
      }

      Alert.alert("Payment Failed", result.message ?? "Unable to process payment.");
    } catch {
      Alert.alert("Network Error", "Unable to reach the payment server.");
    } finally {
      setLoading(false);
    }
  }

  /**
   * ---------------------------------------------------------------------------
   * Main UI
   * ---------------------------------------------------------------------------
   */
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Payment Details</Text>

      <Text style={styles.label}>Merchant ID: {merchantId}</Text>
      <Text style={styles.label}>Session ID: {sessionId}</Text>

      <TextInput
        style={styles.input}
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Description (optional)"
        value={description}
        onChangeText={setDescription}
      />

      <Button
        title={loading ? "Processing..." : "Pay Now"}
        onPress={handlePay}
        disabled={loading}
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
    padding: 20,
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginVertical: 10,
    borderRadius: 6,
    fontSize: 16,
  },
});
