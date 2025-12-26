import TicketCard from "@/components/ui/TicketCard";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useMemo, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";

const informationBookingSchema = z.object({
  contactFullname: z.string().min(1),
  contactEmail: z.string().email(),
  contactPhone: z.string().min(10),
  contactAddress: z.string().min(1),
});

type InformationBookingValues = z.infer<typeof informationBookingSchema>;

export default function BookingScreen() {
  const { tour } = useLocalSearchParams<{ tour: string }>();
  const parsedTour = tour ? JSON.parse(tour) : null;
  const router = useRouter();

  const { control } = useForm<InformationBookingValues>({
    resolver: zodResolver(informationBookingSchema),
  });

  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["10%", "65%"], []);
  const [ticketType, setTicketType] = useState("standard");

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="flex-1 bg-white">
        <StatusBar style="auto" />

        <ScrollView
          contentContainerStyle={{ paddingBottom: 140 }}
          showsVerticalScrollIndicator={false}
        >
          <Image
            source={{ uri: parsedTour?.imageUrl }}
            style={{ width: "100%", height: 220 }}
          />

          <View className="p-4">
            <Text className="text-2xl font-bold">{parsedTour?.title}</Text>
            <Text className="text-gray-600 mt-1">{parsedTour?.location}</Text>
          </View>

          <View className="p-4 border-t border-gray-200">
            <Text className="text-lg font-semibold mb-3">
              Thông tin người đặt
            </Text>

            <Input
              icon="person-outline"
              placeholder="Họ và tên"
              control={control}
              name="contactFullname"
            />

            <Input
              icon="call-outline"
              placeholder="Số điện thoại"
              control={control}
              name="contactPhone"
            />

            <Input
              icon="mail-outline"
              placeholder="Email"
              control={control}
              name="contactEmail"
            />

            <Input
              icon="location-outline"
              placeholder="Địa chỉ"
              control={control}
              name="contactAddress"
            />
          </View>
        </ScrollView>

        <BottomSheet
          ref={sheetRef}
          snapPoints={snapPoints}
          index={0}
          enablePanDownToClose={false}
        >
          <BottomSheetView className="p-4 flex-1">
            <View className="items-center mb-3">
              <Text className="my-2 text-base font-semibold">Chọn loại vé</Text>
            </View>

            <TicketCard
              title="Vé tiêu chuẩn"
              price="1.200.000đ"
              desc="Không hoàn hủy • Check-in thường"
              selected={ticketType === "standard"}
              onPress={() => setTicketType("standard")}
            />

            <TicketCard
              title="Vé linh hoạt"
              price="1.450.000đ"
              desc="Đổi lịch miễn phí • Hoàn 80%"
              selected={ticketType === "flex"}
              onPress={() => setTicketType("flex")}
            />

            <TicketCard
              title="Vé VIP"
              price="1.800.000đ"
              desc="Hoàn 100% • Ưu tiên check-in"
              selected={ticketType === "vip"}
              onPress={() => setTicketType("vip")}
            />

            <TouchableOpacity
              className="mt-auto bg-blue-600 py-4 rounded-xl"
              onPress={() => router.push("/payment/pay")}
            >
              <Text className="text-white text-center text-base font-semibold">
                Tiếp tục thanh toán
              </Text>
            </TouchableOpacity>
          </BottomSheetView>
        </BottomSheet>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

function Input({ icon, placeholder, control, name }: any) {
  return (
    <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-xl px-4 h-14 mb-3">
      <Ionicons name={icon} size={20} color="#9CA3AF" />
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <TextInput
            className="flex-1 ml-3 text-base"
            placeholder={placeholder}
            value={value}
            onChangeText={onChange}
          />
        )}
      />
    </View>
  );
}
