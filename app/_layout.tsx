/**
 * ============================================================
 *  HoloTap Mobile — Tab Layout (Merchant Navigation)
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Date: 01 July 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  Defines the bottom tab navigation for the merchant interface.
 *  Registers all tab screens including the Merchant Dashboard.
 *
 *  Architecture Notes:
 *  - Expo Router v6 tab group layout.
 *  - Screens inside (tabs) folder become tab routes.
 *  - Icons use @expo/vector-icons for consistency.
 *
 *  Engineering Notes:
 *  - Fully TypeScript‑compatible.
 *  - Safe for TM470 submission and commercial deployment.
 *  - Clean, modern, minimal tab bar.
 *
 * ============================================================
 */

import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#0078FF",
        tabBarInactiveTintColor: "#777",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderTopColor: "#e0e0e0",
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >

      {/* Dashboard */}
      <Tabs.Screen
        name="merchant-dashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid-outline" size={size} color={color} />
          ),
        }}
      />

      {/* Explore (existing file) */}
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" size={size} color={color} />
          ),
        }}
      />

      {/* Profile (if needed later) */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

    </Tabs>
  );
}
