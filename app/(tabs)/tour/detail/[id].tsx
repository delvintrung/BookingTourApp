import { getTourById } from "@/api/tourApi";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TabBar, TabView } from "react-native-tab-view";

type Route = {
  key: string;
  title: string;
};

const DetailTourScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: tour, isLoading } = useQuery({
    queryKey: ["tour", id],
    queryFn: () => getTourById(Number(id)),
  });

  const layout = useWindowDimensions();
  const [indexTab, setIndexTab] = useState<number>(0);

  const [routes] = useState<Route[]>([
    { key: "overview", title: "Overview" },
    { key: "detail", title: "Detail" },
    { key: "comment", title: "Comment" },
  ]);

  const renderScene = ({ route }: { route: Route }) => {
    switch (route.key) {
      case "overview":
        return (
          <View className="p-4">
            <Text className="text-lg font-bold mb-2">Overview</Text>
            <Text className="text-gray-600 leading-6">{tour?.shortDesc}</Text>
          </View>
        );
      case "detail":
        return (
          <View className="p-4">
            <Text className="text-lg font-bold mb-2">Detail</Text>
            <Text className="text-gray-600 leading-6">{tour?.longDesc}</Text>
          </View>
        );
      case "comment":
        return (
          <View className="p-4">
            <Text className="text-lg font-bold mb-2">Comment</Text>
            <Text className="text-gray-500">Chưa có đánh giá</Text>
          </View>
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <ActivityIndicator color="blue" size="large" style={{ marginTop: 50 }} />
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "left", "right"]}>
      <View className="h-[40%]">
        <ImageBackground
          source={{ uri: tour?.imageUrl }}
          className="h-full w-full object-cover"
        />
      </View>

      <View className="flex-1 bg-white rounded-t-3xl -mt-6 pt-6 overflow-hidden">
        <View className="px-4 pb-4">
          <View className="flex-row justify-between items-start mb-2">
            <Text className="text-2xl font-extrabold flex-1 mr-2">
              {tour?.location}
            </Text>
            <Text className="text-blue-500 font-bold text-xl">
              {tour?.tourDetails?.[0]?.tourPrices?.[0]?.price?.toLocaleString(
                "vi-VN",
                {
                  style: "currency",
                  currency: "VND",
                }
              )}
            </Text>
          </View>

          <View className="flex-row items-center">
            <Text className="font-bold text-yellow-600 mr-1">
              {tour?.rating || 4.5}
            </Text>
            <Ionicons name="star" size={16} color="#CA8A04" />
            <Text className="text-gray-400 text-xs ml-2">*Estimated Cost</Text>
          </View>
        </View>

        <TabView
          navigationState={{ index: indexTab, routes }}
          renderScene={renderScene}
          onIndexChange={setIndexTab}
          initialLayout={{ width: layout.width }}
          style={{ flex: 1 }}
          renderTabBar={(props) => (
            <TabBar
              {...props}
              style={{
                backgroundColor: "white",
                elevation: 0,
                borderBottomWidth: 1,
                borderBottomColor: "#f3f4f6",
              }}
              indicatorStyle={{ backgroundColor: "#FD8D14", height: 3 }}
              activeColor="#111827"
              inactiveColor="#9CA3AF"
              // @ts-ignore
              renderLabel={({ route, focused, color }: any) => (
                <Text
                  style={{
                    color: color,
                    fontSize: 14,
                    fontWeight: focused ? "700" : "500",
                    textTransform: "uppercase",
                  }}
                >
                  {route.title}
                </Text>
              )}
            />
          )}
        />
      </View>

      <View className="p-4 border-t flex-row justify-between items-center bg-white shadow-lg">
        <View className="flex-1 mr-3 border-2 border-blue-500 rounded-full py-3 items-center">
          <Text className="text-blue-500 font-bold">Price Details</Text>
        </View>
        <TouchableOpacity className="flex-[2] bg-blue-500 rounded-full py-3.5 items-center shadow-sm">
          <Text className="text-white font-bold text-lg">Book Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DetailTourScreen;
