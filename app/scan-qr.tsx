import { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";

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
      const response = await fetch("http://192.168.1.205:3000/api/qr/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: data }),
      });

      const result = await response.json();

      if (response.ok) {
        router.push({
          pathname: "/payment",
          params: {
            merchantId: result.merchantId,
            sessionId: result.sessionId,
          },
        });
      } else {
        alert(result.message || "Invalid QR code");
        setScanned(false);
      }
    } catch (err) {
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
