import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface MenuItemProps {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  text: string;
  showBorder?: boolean;
}

const MenuItem = ({ icon, text, showBorder = true }: MenuItemProps) => (
  <TouchableOpacity
    className={`flex-row items-center p-4 ${showBorder ? "border-b border-gray-100" : ""}`}
  >
    <View className="w-8">
      <Ionicons name={icon} size={22} color="#6B7280" />
    </View>

    <Text className="flex-1 text-base text-gray-700 ml-2">{text}</Text>

    <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
  </TouchableOpacity>
);

export default function ProfileScreen() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />

      <SafeAreaView edges={["top"]} className="flex-1">
        {isLogin ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="px-5 pb-6 bg-white">
              <Text className="text-3xl font-bold text-black mt-2 mb-6">
                Profile
              </Text>

              <View className="flex-row items-center mb-8">
                <Image
                  source={{ uri: "https://i.pravatar.cc/150?img=68" }}
                  className="w-16 h-16 rounded-full"
                />
                <View className="ml-4 flex-1">
                  <View className="flex-row justify-between items-center">
                    <Text className="text-xl font-bold text-gray-900">
                      Delvin Trung
                    </Text>
                    <Ionicons
                      name="chevron-forward"
                      size={20}
                      color="#3B82F6"
                    />
                  </View>
                  <Text className="text-gray-400 text-sm">
                    Add your contact data
                  </Text>
                </View>
              </View>

              <View>
                <Text className="text-lg font-bold text-gray-900 mb-3">
                  Documentation
                </Text>

                <View className="flex-row items-center mb-4">
                  <View className="w-12 h-12 bg-gray-100 rounded-lg items-center justify-center">
                    <Ionicons name="person" size={24} color="#D1D5DB" />
                  </View>
                  <View className="ml-3">
                    <Text className="font-semibold text-gray-800">
                      Name Surname
                    </Text>
                    <Text className="text-gray-400 text-xs">
                      + Add your passport information
                    </Text>
                  </View>
                </View>
                <TouchableOpacity className="bg-[#007AFF] self-start px-4 py-2 rounded-lg">
                  <Text className="text-white font-bold text-xs uppercase">
                    All Documents
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View className="bg-gray-100 pt-6 pb-10 px-4 min-h-screen">
              <Text className="text-base font-bold text-gray-900 mb-2 ml-2">
                Settings
              </Text>
              <View className="bg-white rounded-2xl overflow-hidden mb-6 shadow-sm">
                <MenuItem icon="person-outline" text="Manage my account" />
                <MenuItem
                  icon="lock-closed-outline"
                  text="Privacy and safety"
                />
                <MenuItem icon="videocam-outline" text="Registration" />
                <MenuItem icon="wallet-outline" text="Balance" />
                <MenuItem icon="share-social-outline" text="Links" />
                <MenuItem icon="grid-outline" text="Codes" showBorder={false} />
              </View>

              <Text className="text-base font-bold text-gray-900 mb-2 ml-2">
                Advises
              </Text>
              <View className="bg-white rounded-2xl overflow-hidden mb-6 shadow-sm">
                <MenuItem icon="ticket-outline" text="My Tickets" />
                <MenuItem
                  icon="help-buoy-outline"
                  text="Support"
                  showBorder={false}
                />
              </View>

              <View className="bg-white rounded-2xl overflow-hidden mb-8 shadow-sm">
                <MenuItem icon="airplane-outline" text="Aviacompanies" />
                <MenuItem
                  icon="star-outline"
                  text="Rate us"
                  showBorder={false}
                />
              </View>

              <Text className="text-center text-gray-400 text-sm mb-10">
                2.20.21
              </Text>
            </View>
          </ScrollView>
        ) : (
          <View className="flex-1 bg-white items-center justify-center p-6">
            <View className="w-32 h-32 bg-blue-50 rounded-full items-center justify-center mb-8">
              <Ionicons name="person" size={60} color="#3B82F6" />
            </View>

            <Text className="text-2xl font-bold text-gray-900 mb-3 text-center">
              Bạn chưa đăng nhập
            </Text>

            <Text className="text-gray-500 text-center text-base mb-10 px-4">
              Hãy đăng nhập để quản lý đặt phòng, xem ưu đãi và đồng bộ dữ liệu
              của bạn.
            </Text>

            <View className="w-full gap-y-4">
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => router.push("/login")}
                className="w-full bg-[#3B82F6] py-4 rounded-xl shadow-md shadow-blue-200"
              >
                <Text className="text-white text-center font-bold text-lg">
                  Đăng nhập / Đăng ký
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.push("/login")}
                className="padding-2"
              >
                <Text className="text-gray-400 text-center font-medium">
                  Tôi cần trợ giúp?
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}
