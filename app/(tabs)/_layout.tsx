/**
 * =============================================================================
 *  HoloTap Mobile — Tab Layout (Full Merchant Module Registration)
 * =============================================================================
 *  Engineer:      Raymond Newton — HoloTap Engineering Team
 *  Assistant:     Copilot Engineering Assistant
 *  File:          app/(tabs)/_layout.tsx
 *  Date:          15 July 2026
 * =============================================================================
 */

import { Tabs } from "expo-router";
import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >

      {/* Merchant Dashboard */}
      <Tabs.Screen
        name="merchant-dashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="square.grid.2x2.fill" color={color} />
          ),
        }}
      />

      {/* Generate QR Code */}
      <Tabs.Screen
        name="generate-qrc"
        options={{
          title: "QR Code",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="qrcode" color={color} />
          ),
        }}
      />

      {/* Live Payments */}
      <Tabs.Screen
        name="live-payments"
        options={{
          title: "Payments",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="creditcard.fill" color={color} />
          ),
        }}
      />

      {/* Refund */}
      <Tabs.Screen
        name="refund"
        options={{
          title: "Refund",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="arrow.uturn.left.circle.fill" color={color} />
          ),
        }}
      />

      {/* Settlement */}
      <Tabs.Screen
        name="settlement"
        options={{
          title: "Settlement",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="banknote.fill" color={color} />
          ),
        }}
      />

      {/* Settings */}
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="gearshape.fill" color={color} />
          ),
        }}
      />

      {/* Diagnostics — ⭐ NEWLY REGISTERED ⭐ */}
      <Tabs.Screen
        name="diagnostics"
        options={{
          title: "Diagnostics",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="wrench.fill" color={color} />
          ),
        }}
      />

      {/* Home */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />

      {/* Explore */}
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
        }}
      />

    </Tabs>
  );
}
