import { Stack } from "expo-router";

import React from "react";

import { useColorScheme } from "@/hooks/use-color-scheme";

export default function AuthLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="login"
        options={{
          title: "Home",
        }}
      />
    </Stack>
  );
}
