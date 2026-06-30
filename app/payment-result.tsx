/**
 * =============================================================================
 * PAYMENT RESULT SCREEN — HOLOTAP FLOW 8
 * =============================================================================
 * Shows animated hologram confirmation after a successful payment.
 * Includes:
 *  - Reanimated hologram pulse
 *  - Transaction summary card
 *  - Auto-return navigation
 *
 * =============================================================================
 */

import { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { router, useLocalSearchParams } from "expo-router";

export default function PaymentResult() {
  const { amount, merchantId } = useLocalSearchParams();

  // Hologram pulse animation
  const pulse = useSharedValue(1);


   
 
useEffect(() => {
  pulse.value = withRepeat(
    withTiming(1.25, {
      duration: 1200,
      easing: Easing.inOut(Easing.ease),
    }),
    -1,
    true
  );

  const timer = setTimeout(() => {
    router.replace("/");
  }, 4000);

  return () => clearTimeout(timer);
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);



  const hologramStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.hologram, hologramStyle]}>
        <Text style={styles.hologramText}>HOLOTAP VERIFIED</Text>
      </Animated.View>

      <View style={styles.card}>
        <Text style={styles.title}>Payment Complete</Text>
        <Text style={styles.detail}>Merchant: {merchantId}</Text>
        <Text style={styles.detail}>Amount: £{amount}</Text>
        <Text style={styles.detail}>Status: Success</Text>
      </View>

      <Text style={styles.footer}>Returning to home...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  hologram: {
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 3,
    borderColor: "#00eaff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 234, 255, 0.15)",
    marginBottom: 40,
  },
  hologramText: {
    color: "#00eaff",
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: 2,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    width: "90%",
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 10,
  },
  detail: {
    fontSize: 16,
    marginVertical: 4,
  },
  footer: {
    color: "#888",
    marginTop: 10,
  },
});
