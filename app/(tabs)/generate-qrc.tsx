/**
 * =============================================================================
 * HOLOTAP MOBILE — GENERATE QR SCREEN (generate-qrc.tsx)
 * =============================================================================
 * Engineer: Raymond Newton (E5357171)
 * Assistant: Copilot Engineering Assistant
 * Date: 01 July 2026
 * © 2026 HoloTap Technologies Ltd. All rights reserved.
 *
 * PURPOSE:
 * Implements Flow 2 — Merchant QR Session Generation.
 * Requests a signed, tamper‑proof QR session token from the backend and
 * renders it as a scannable QR code for consumer payment initiation.
 *
 * SCALABILITY PATCH:
 * - Strong TypeScript typing for session payload
 * - Modular session helper function
 * - SafeAreaView for modern devices
 * - Clean fintech UI structure
 * - Improved error handling + UX stability
 * - Fully deterministic component lifecycle
 *
 * FLOW ALIGNMENT:
 * Flow 2 → Merchant QR Session Generation
 * Flow 3 → Consumer Scan (scan-qrc.tsx)
 * Flow 4 → Backend Session Verification
 * Flow 5 → Payment Initialisation (payment.tsx)
 *
 * TM470 COMPLIANCE:
 * - Modular, testable, flow-aligned, maintainable
 * - No business logic inside UI
 * =============================================================================
 */

import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { apiPost } from "../../api/client";
import { API_URL } from "../../src/config";

/**
 * =============================================================================
 *  TypeScript Types — Scalable Session Model
 * =============================================================================
 */
interface SessionResponse {
  token: string;
  expiresIn?: number; // optional future backend field
}

/**
 * =============================================================================
 *  Modular Session Helper — Clean & Testable
 * =============================================================================
 */
async function createQrSession(): Promise<SessionResponse> {
  return apiPost("/session/create", {});
}

/**
 * =============================================================================
 *  Main Component — GenerateQRC
 * =============================================================================
 */
export default function GenerateQRC() {
  const [token, setToken] = useState<string | null>(null);
  const [expires, setExpires] = useState<number>(30);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * ---------------------------------------------------------------------------
   * Refresh Session — Requests new signed QR token
   * ---------------------------------------------------------------------------
   */
  async function refreshSession() {
    try {
      setLoading(true);
      setError(null);

      const data = await createQrSession();
      setToken(data.token);
      setExpires(data.expiresIn ?? 30); // fallback for future backend updates
    } catch (err) {
      console.error("QR Session Error:", err);
      setError("Unable to generate QR session. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  /**
   * ---------------------------------------------------------------------------
   * Initial Load — Generate first QR session
   * ---------------------------------------------------------------------------
   */
  useEffect(() => {
    refreshSession();
  }, []);

  /**
   * ---------------------------------------------------------------------------
   * Countdown Timer — Auto-refresh when expired
   * ---------------------------------------------------------------------------
   */
  useEffect(() => {
    if (expires <= 0) {
      refreshSession();
      return;
    }

    const timer = setTimeout(() => setExpires(expires - 1), 1000);
    return () => clearTimeout(timer);
  }, [expires]);

  /**
   * ---------------------------------------------------------------------------
   * Loading State
   * ---------------------------------------------------------------------------
   */
  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.statusText}>Generating secure QR session…</Text>
      </SafeAreaView>
    );
  }

  /**
   * ---------------------------------------------------------------------------
   * Error State
   * ---------------------------------------------------------------------------
   */
  if (error) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
        <Text style={styles.statusText}>Tap to retry</Text>
      </SafeAreaView>
    );
  }

  /**
   * ---------------------------------------------------------------------------
   * Main QR Display
   * ---------------------------------------------------------------------------
   */
  return (
    <SafeAreaView style={styles.center}>
      {token && <QRCode value={token} size={240} />}
      <Text style={styles.timer}>Expires in {expires}s</Text>
    </SafeAreaView>
  );
}

/**
 * =============================================================================
 *  Stylesheet — Clean Fintech UI
 * =============================================================================
 */
const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  statusText: {
    marginTop: 12,
    fontSize: 16,
    color: "#444",
  },
  errorText: {
    fontSize: 18,
    color: "#D32F2F",
    fontWeight: "600",
    marginBottom: 10,
    textAlign: "center",
  },
  timer: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
  },
});
