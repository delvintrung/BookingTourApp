import { Stack } from "expo-router";

export default function TourLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="detail/[id]"
        options={{
          title: "Tour Detail",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
