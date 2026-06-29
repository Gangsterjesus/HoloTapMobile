/**
 * =============================================================================
 * ENGINEERING HEADER — PAYMENT SCREEN
 * =============================================================================
 * Author: Raymond Newton
 * Date: 29 June 2026
 * File: payment.tsx
 *
 * -----------------------------------------------------------------------------
 * PURPOSE
 * -----------------------------------------------------------------------------
 * This screen handles the consumer-facing payment flow after a QR code scan.
 * It receives the merchantId and sessionId from Expo Router query parameters,
 * displays them for verification, and allows the user to enter a payment amount
 * and optional description. The screen then submits the payment request to the
 * backend API and displays the result to the user.
 *
 * -----------------------------------------------------------------------------
 * ARCHITECTURE NOTES
 * -----------------------------------------------------------------------------
 * - This screen is part of the QR → Session → Payment pipeline.
 * - Parameters are passed via Expo Router using useLocalSearchParams().
 * - The backend expects a POST request containing merchantId, sessionId,
 *   amount, and description.
 * - The screen uses React Native primitives (View, Text, TextInput, Button)
 *   to ensure compatibility with Expo SDK 56 and React Native 0.86.
 * - Navigation is intentionally minimal; success/failure screens can be added
 *   later once backend transaction states are finalised.
 *
 * -----------------------------------------------------------------------------
 * FLOW ALIGNMENT
 * -----------------------------------------------------------------------------
 * Flow 5: QR Scan → Session Verification
 *   - The scan-qr.tsx screen verifies the QR token and navigates here.
 *
 * Flow 6: Payment Initialisation
 *   - This screen receives merchantId and sessionId and prepares the payment.
 *
 * Flow 7: Payment Submission
 *   - User enters amount and description.
 *   - The screen sends a POST request to /api/payment/process.
 *
 * Flow 8: Payment Result
 *   - Displays success/failure based on backend response.
 *   - Future enhancement: navigate to dedicated success/failure screens.
 *
 * -----------------------------------------------------------------------------
 * ENGINEERING NOTES
 * -----------------------------------------------------------------------------
 * - Input validation is intentionally minimal at this stage; backend performs
 *   final validation. Client-side validation will be added once UX flows are
 *   finalised.
 * - Error handling is intentionally simple (alert-based) to keep the flow
 *   lightweight during development.
 * - The screen assumes backend availability at the configured IP address.
 *   This will be replaced with environment-based configuration in production.
 * - The component is structured to avoid unnecessary re-renders and maintain
 *   predictable state transitions.
 *
 * -----------------------------------------------------------------------------
 * TESTING NOTES
 * -----------------------------------------------------------------------------
 * - Manual testing: verify navigation from scan-qr.tsx with valid/invalid QR.
 * - API testing: confirm backend returns correct success/failure JSON.
 * - UI testing: confirm amount and description fields accept input correctly.
 * - Router testing: confirm merchantId and sessionId appear correctly.
 *
 * =============================================================================
 */







import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";

export default function Payment() {
  const { merchantId, sessionId } = useLocalSearchParams();
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  async function handlePay() {
    if (!amount || isNaN(Number(amount))) {
      Alert.alert("Invalid Amount", "Please enter a valid numeric amount.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://192.168.1.205:3000/payment/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          merchantId,
          sessionId,
          amount: Number(amount),
          description,
        }),
      });

      const data = await res.json();

      if (data.success) {
        Alert.alert("Payment Successful", "Your payment has been processed.");
      } else {
        Alert.alert("Payment Failed", data.message || "Unable to process payment.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Network Error", "Unable to reach the payment server.");
    }

    setLoading(false);
  }

  return (
    <View style={styles.container}>
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
    </View>
  );
}

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