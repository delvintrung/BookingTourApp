import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PaymentScreen = () => {
  const [selectedMethod, setSelectedMethod] = useState<"vnpay" | "cash">(
    "vnpay"
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center px-4 py-3 border-b border-gray-200">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-lg font-semibold mr-6">
          Phương thức thanh toán
        </Text>
      </View>

      <ScrollView className="flex-1">
        <View className="p-4">
          <Text className="text-base font-semibold mb-4 text-gray-700">
            Chọn phương thức thanh toán
          </Text>

          <TouchableOpacity
            onPress={() => setSelectedMethod("vnpay")}
            className={`flex-row items-center p-4 rounded-xl border-2 mb-3 ${
              selectedMethod === "vnpay"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 bg-white"
            }`}
          >
            <View className="w-16 h-16 bg-white rounded-lg items-center justify-center border border-gray-200">
              <Image
                source={{
                  uri: "https://cdn.haitrieu.com/wp-content/uploads/2022/10/Icon-VNPAY-QR.png",
                }}
                style={{ width: 40, height: 40 }}
                resizeMode="contain"
              />
            </View>
            <View className="flex-1 ml-4">
              <Text className="text-base font-semibold text-gray-900">
                Thanh toán VNPAY
              </Text>
              <Text className="text-sm text-gray-500 mt-1">
                ATM, Visa, Mastercard, JCB
              </Text>
            </View>
            <View
              className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
                selectedMethod === "vnpay"
                  ? "border-blue-500 bg-blue-500"
                  : "border-gray-300"
              }`}
            >
              {selectedMethod === "vnpay" && (
                <Ionicons name="checkmark" size={16} color="#fff" />
              )}
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setSelectedMethod("cash")}
            className={`flex-row items-center p-4 rounded-xl border-2 mb-3 ${
              selectedMethod === "cash"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 bg-white"
            }`}
          >
            <View className="w-16 h-16 bg-white rounded-lg items-center justify-center border border-gray-200">
              <Ionicons name="cash-outline" size={32} color="#10B981" />
            </View>
            <View className="flex-1 ml-4">
              <Text className="text-base font-semibold text-gray-900">
                Thanh toán tiền mặt
              </Text>
              <Text className="text-sm text-gray-500 mt-1">
                Thanh toán khi nhận vé
              </Text>
            </View>
            <View
              className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
                selectedMethod === "cash"
                  ? "border-blue-500 bg-blue-500"
                  : "border-gray-300"
              }`}
            >
              {selectedMethod === "cash" && (
                <Ionicons name="checkmark" size={16} color="#fff" />
              )}
            </View>
          </TouchableOpacity>

          <View className="mt-6 p-4 bg-gray-50 rounded-xl">
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Thông tin thanh toán
            </Text>
            <View className="flex-row justify-between mb-2">
              <Text className="text-sm text-gray-600">Tổng tiền tour</Text>
              <Text className="text-sm font-semibold text-gray-900">
                1.200.000đ
              </Text>
            </View>
            <View className="flex-row justify-between mb-2">
              <Text className="text-sm text-gray-600">Phí dịch vụ</Text>
              <Text className="text-sm font-semibold text-gray-900">0đ</Text>
            </View>
            <View className="h-px bg-gray-200 my-2" />
            <View className="flex-row justify-between">
              <Text className="text-base font-semibold text-gray-900">
                Tổng cộng
              </Text>
              <Text className="text-lg font-bold text-blue-600">
                1.200.000đ
              </Text>
            </View>
          </View>

          {selectedMethod === "cash" && (
            <View className="mt-4 p-4 bg-yellow-50 rounded-xl flex-row">
              <Ionicons name="information-circle" size={20} color="#F59E0B" />
              <Text className="flex-1 ml-2 text-sm text-gray-700">
                Vui lòng thanh toán đầy đủ khi nhận vé. Không chấp nhận hoàn
                tiền sau khi đã xuất vé.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      <View className="p-4 border-t border-gray-200">
        <TouchableOpacity className="bg-blue-600 py-4 rounded-xl">
          <Text className="text-white text-center text-base font-semibold">
            Xác nhận thanh toán
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PaymentScreen;
