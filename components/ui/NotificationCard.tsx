import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import type { NotificationCardProps } from "../../types";

const mockNotificationCardProps: NotificationCardProps = {
  header: "LED • TLL",
  title: "St. Petersburg - Tallinn",
  price: "452 USD",
  dateInfo: "20 Aug - 4 Sep • 1 passenger",
};

const NotificationCard = () => {
  return (
    <View className="w-[90%] h-[250px] relative mt-2">
      <Text className="text-sm text-gray-400">
        {mockNotificationCardProps.header}
      </Text>
      <Text className="font-bold text-2xl mb-8">
        {mockNotificationCardProps.title}
      </Text>
      <View className="h-[150px] bg-white rounded-lg p-4">
        <View className="w-full h-[80px]">
          <Text className="text-[#007AFF] font-extrabold text-3xl">
            {mockNotificationCardProps.price}
          </Text>
          <Text className="text-[#A3A3A3] mt-2">
            {mockNotificationCardProps.dateInfo}
          </Text>
        </View>
        <View className="bg-[#7B61FF] w-[90px] h-8 rounded-2xl absolute top-[-15px] left-3">
          <Text className="text-white text-center pt-1 font-bold">
            Best Price
          </Text>
        </View>
        <View className="w-full h-[1px] bg-gray-300 my-2"></View>

        <View className="flex-row items-center justify-around">
          <TouchableOpacity className="flex-row items-center gap-2">
            <Ionicons name="settings-sharp" size={24} color="#ABB9CD" />
            <Text className="text-[#ABB9CD]">Settings</Text>
          </TouchableOpacity>
          <View className="w-[1px] bg-gray-500 h-6"></View>
          <TouchableOpacity className="flex-row items-center gap-2">
            <Ionicons name="trash-outline" size={24} color="#ABB9CD" />
            <Text className="text-[#ABB9CD]">Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default NotificationCard;
