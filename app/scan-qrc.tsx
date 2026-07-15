

/**
 * =============================================================================
 * ENGINEERING HEADER — QR SCANNER SCREEN
 * =============================================================================
 * Author: Raymond Newton
 * Date: 29 June 2026
 * File: scan-qr.tsx
 *
 * -----------------------------------------------------------------------------
 * PURPOSE
 * -----------------------------------------------------------------------------
 * This screen handles the consumer-facing QR scanning flow. It opens the device
 * camera, scans merchant QR codes, extracts the encoded session token, and sends
 * it to the backend for verification. Once validated, the screen navigates to
 * the Payment screen with the merchantId and sessionId required for payment.
 *
 * -----------------------------------------------------------------------------
 * ARCHITECTURE NOTES
 * -----------------------------------------------------------------------------
 * - Uses Expo Camera (CameraView) for scanning QR codes.
 * - Uses Expo Router for navigation to the Payment screen.
 * - Uses useCameraPermissions() to request and manage camera access.
 * - Scanning is throttled using a `scanned` boolean to prevent duplicate scans.
 * - Backend endpoint `/api/qr/verify` validates the QR token and returns
 *   merchantId + sessionId.
 * - Navigation passes parameters via Expo Router query params.
 *
 * -----------------------------------------------------------------------------
 * FLOW ALIGNMENT
 * -----------------------------------------------------------------------------
 * Flow 3: Merchant generates QR code
 *   - Merchant app produces a signed token encoded into a QR code.
 *
 * Flow 4: Consumer scans QR code
 *   - This screen opens the camera and reads the QR token.
 *
 * Flow 5: Session Verification
 *   - The scanned token is POSTed to `/api/qr/verify`.
 *   - Backend returns merchantId + sessionId.
 *
 * Flow 6: Payment Initialisation
 *   - Navigation to `/payment` occurs with validated parameters.
 *
 * -----------------------------------------------------------------------------
 * ENGINEERING NOTES
 * -----------------------------------------------------------------------------
 * - The `scanned` flag prevents multiple rapid scans from triggering duplicate
 *   backend requests or navigation events.
 * - Error handling is intentionally simple (alert-based) during development.
 * - The backend IP address is currently hardcoded for local testing; this will
 *   be replaced with environment configuration in production.
 * - The screen is designed to be lightweight and responsive, avoiding expensive
 *   re-renders and maintaining predictable state transitions.
 * - Camera permission flow is handled automatically on mount.
 *
 * -----------------------------------------------------------------------------
 * TESTING NOTES
 * -----------------------------------------------------------------------------
 * - Manual testing: verify scanning behaviour with valid and invalid QR codes.
 * - API testing: confirm backend returns correct merchantId/sessionId.
 * - Permission testing: confirm camera permission prompts appear correctly.
 * - Navigation testing: confirm router pushes to `/payment` with correct params.
 *
 * =============================================================================
 */










import { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { API_URL } from "../src/config";



export default function ScanQR() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);


  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  const handleScan = async (data: string) => {
    if (scanned) return;
    setScanned(true);

    try {
     const response = await fetch("http://192.168.1.205:3000/session/verify", {

        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: data }),
      });

      const result = await response.json();

      if (response.ok) {
        // cast to any to satisfy expo-router route typing for dynamic routes
        router.push({
          pathname: "/payment",
          params: {
            merchantId: result.merchantId,
            sessionId: result.sessionId,
          },
        } as any);
      } else {
        alert(result.message || "Invalid QR code");
        setScanned(false);
      }
    } catch {
      alert("Network error");
      setScanned(false);
    }
  };

  if (!permission) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>Camera permission is required</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        onBarcodeScanned={({ data }) => handleScan(data)}
      />
      <Text style={styles.scanText}>Scan Merchant QR Code</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  camera: { flex: 1 },
  scanText: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: { fontSize: 16 },
});
