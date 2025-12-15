import NotificationCard from "@/components/ui/NotificationCard";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const NotificationScreen = () => {
  const inset = useSafeAreaInsets();
  const [hasNotify, setHasNotify] = useState(false);
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="auto" />

      <View className={`w-full h-[${105 - inset.top}px]`}>
        <Text className="text-4xl p-5">Notification</Text>
      </View>
      {hasNotify ? (
        <View className="bg-[#E5E5E5] w-full h-screen flex-1 items-center justify-center">
          <View>
            <Image
              source={require("../../assets/images/NotNotify.png")}
              className="w-[188px] h-[161px] mb-5"
            />
          </View>
        </View>
      ) : (
        <ScrollView
          style={{ flex: 1, backgroundColor: "#F5F5F5" }}
          contentContainerStyle={{ alignItems: "center", paddingBottom: 20 }}
        >
          <NotificationCard />
          <NotificationCard />
          <NotificationCard />
          <NotificationCard />
          <NotificationCard />
          <NotificationCard />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default NotificationScreen;
