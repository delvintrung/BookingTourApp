import { Stack } from "expo-router";

export default function BookingLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="book"
        options={{
          title: "Booking",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
