
/**
 * ============================================================
 *  HoloTap Mobile — Generate QR Screen (generate-qrc.tsx)
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Author: Raymond Newton
 *  Date: 24 June 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  Implements Flow 2 of the HoloTap Mobile architecture:
 *  Merchant QR Session Generation. This screen requests a
 *  signed QR session token from the HoloTap API and renders
 *  it as a scannable QR code for consumer payment initiation.
 *
 *  Architecture Notes:
 *  - Pure React Native + Expo Router (no web routing).
 *  - Uses the /api/createQrSession helper for backend calls.
 *  - QR rendered using react-native-qrcode-svg.
 *  - Token stored in local component state only (no persistence).
 *  - Error and loading states fully handled for UX stability.
 *
 *  Engineering Notes:
 *  - All async operations wrapped in try/catch for resilience.
 *  - setQrToken replaces legacy setToken naming for clarity.
 *  - No top-level await; all awaits inside async functions.
 *  - Ready for extension with countdown timer + auto-refresh.
 *  - Fully TM470‑compliant: modular, testable, and flow-aligned.
 *
 * ============================================================
 */






import { createQrSession } from "@/api";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";

export default function GenerateQRScreen() {
  const [loading, setLoading] = useState(false);
  const [qrToken, setQrToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateQR = async () => {
    try {
      setLoading(true);
      setError(null);
      setQrToken(null);

      // Call your API helper instead of raw fetch
      const data = await createQrSession("MERCHANT_123");

      if (!data || !data.token) {
        throw new Error("Invalid response from server");
      }

      setQrToken(data.token);
    } catch (err: any) {
      setError(err.message || "Failed to generate QR");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Generate Payment QR</Text>

      {loading && <ActivityIndicator size="large" color="#007AFF" />}

      {error && <Text style={styles.error}>{error}</Text>}

      {qrToken && (
        <View style={styles.qrContainer}>
          <QRCode value={qrToken} size={220} />
          <Text style={styles.tokenLabel}>Session Token:</Text>
          <Text style={styles.token}>{qrToken}</Text>
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={generateQR}>
        <Text style={styles.buttonText}>Generate QR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F5F9FF",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  qrContainer: {
    alignItems: "center",
    marginVertical: 20,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 3,
  },
  tokenLabel: {
    marginTop: 10,
    fontSize: 14,
    color: "#555",
  },
  token: {
    fontSize: 12,
    color: "#333",
    marginTop: 4,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});
