import { Stack } from "expo-router";

export default function PaymentLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="pay"
        options={{
          title: "Payment",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
