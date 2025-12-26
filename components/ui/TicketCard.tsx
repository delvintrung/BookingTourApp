import { Text, TouchableOpacity, View } from "react-native";

export default function TicketCard({
  title,
  price,
  desc,
  selected,
  onPress,
}: any) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        borderWidth: 2,
        borderColor: selected ? "#2563eb" : "#e5e7eb",
        borderRadius: 14,
        padding: 14,
        marginBottom: 12,
        backgroundColor: selected ? "#eff6ff" : "#fff",
      }}
    >
      <View className="flex-row justify-between">
        <Text className="text-base font-semibold">{title}</Text>
        <Text className="text-base font-bold">{price}</Text>
      </View>
      <Text className="text-gray-500 mt-1">{desc}</Text>
    </TouchableOpacity>
  );
}
