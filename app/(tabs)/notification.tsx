import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, Text, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const NotificationScreen = () => {
  const inset = useSafeAreaInsets();
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="auto" />

      <View className={`w-full h-[${105 - inset.top}px]`}>
        <Text className="text-4xl p-5">Notification</Text>
      </View>
      <View className="bg-[#E5E5E5] w-full h-full flex-1 items-center justify-center">
        <View>
          <Image
            source={require("../../assets/images/NotNotify.png")}
            className="w-[188px] h-[161px] mb-5"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NotificationScreen;
