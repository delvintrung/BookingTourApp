import { getTourById } from "@/api/tourApi";
import TourSuggest from "@/components/ui/TourSuggest";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  ScrollView,
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
  const router = useRouter();

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
          <ScrollView nestedScrollEnabled={true} className="p-4">
            <Text className="text-lg font-bold mb-2">Overview</Text>
            <Text className="text-gray-600 leading-6">{tour?.shortDesc}</Text>
          </ScrollView>
        );
      case "detail":
        return (
          <ScrollView nestedScrollEnabled={true} className="p-4">
            <Text className="text-lg font-bold mb-4">Thông Tin Chi Tiết</Text>

            <View className="mb-4">
              <Text className="text-sm font-bold text-gray-700 mb-2">
                Mô Tả Chi Tiết
              </Text>
              <Text className="text-gray-600 leading-6">{tour?.longDesc}</Text>
            </View>

            {tour?.tourDetails && tour.tourDetails.length > 0 && (
              <View className="mb-4">
                <Text className="text-sm font-bold text-gray-700 mb-2">
                  Lịch Trình
                </Text>
                {tour.tourDetails.map((detail) => (
                  <View
                    key={detail.id}
                    className="mb-4 p-3 bg-gray-50 rounded-lg"
                  >
                    <View className="flex-row items-center mb-2">
                      <Ionicons name="calendar" size={16} color="#6B7280" />
                      <Text className="ml-2 font-bold text-gray-800">
                        {new Date(detail.startDay).toLocaleDateString("vi-VN")}{" "}
                        - {new Date(detail.endDay).toLocaleDateString("vi-VN")}
                      </Text>
                    </View>
                    <View className="flex-row items-center mb-2">
                      <Ionicons name="location" size={16} color="#6B7280" />
                      <Text className="ml-2 text-gray-600">
                        {detail.startLocation}
                      </Text>
                    </View>
                    <View className="flex-row items-center mb-2">
                      <Ionicons name="people" size={16} color="#6B7280" />
                      <Text className="ml-2 text-gray-600">
                        Chỗ còn lại: {detail.remainingSeats}/{detail.capacity}
                      </Text>
                    </View>

                    {detail.itineraries && detail.itineraries.length > 0 && (
                      <View className="mt-3 border-t border-gray-200 pt-3">
                        <Text className="font-bold text-sm text-gray-700 mb-2">
                          Chi Tiết Chuyến Đi:
                        </Text>
                        {detail.itineraries.map((itinerary, idx) => (
                          <View key={itinerary.id} className="ml-4 mb-2">
                            <Text className="font-bold text-sm text-gray-800">
                              Ngày {idx + 1}: {itinerary.title}
                            </Text>
                            <Text className="text-xs text-gray-600 mt-1">
                              {itinerary.content}
                            </Text>
                          </View>
                        ))}
                      </View>
                    )}
                  </View>
                ))}
              </View>
            )}
          </ScrollView>
        );
      case "comment":
        return (
          <View className="p-4 flex-1">
            <Text className="text-lg font-bold mb-2">Comment</Text>
            <ScrollView nestedScrollEnabled={true} className="flex-1">
              {tour?.reviews?.length! > 0 ? (
                tour?.reviews?.map((review) => (
                  <View
                    key={review.id}
                    className="mb-4 p-3 border rounded-lg bg-gray-50"
                  >
                    <View className="flex-row items-center justify-between mb-2">
                      <View className="flex-row items-center">
                        <Ionicons
                          name="person-circle"
                          size={24}
                          color="#6B7280"
                        />
                        <Text className="ml-2 font-bold">
                          {review.reviewerName}
                        </Text>
                      </View>
                      <View className="flex-row items-center ml-4">
                        <Text className="font-bold text-yellow-600 mr-1">
                          {review.rating}
                        </Text>
                        <Ionicons name="star" size={16} color="#CA8A04" />
                      </View>
                    </View>
                    <Text>{review.content}</Text>
                  </View>
                ))
              ) : (
                <Text className="text-gray-500">Chưa có đánh giá</Text>
              )}
            </ScrollView>
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
      <View className="flex-1">
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <View className="h-[300px]">
            <ImageBackground
              source={{ uri: tour?.imageUrl }}
              className="h-full w-full"
              resizeMode="cover"
            />
          </View>

          <View className="bg-white rounded-t-3xl -mt-6 pt-6">
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
                <Text className="text-gray-400 text-xs ml-2">
                  *Estimated Cost
                </Text>
              </View>
            </View>

            <View className="h-[400px]">
              <TabView
                navigationState={{ index: indexTab, routes }}
                renderScene={renderScene}
                onIndexChange={setIndexTab}
                initialLayout={{ width: layout.width }}
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

            <View className="px-4 py-4 pb-24">
              <Text className="text-lg font-bold mb-3">Suggested Tours</Text>
              <TourSuggest />
              <TourSuggest />
              <TourSuggest />
            </View>
          </View>
        </ScrollView>

        <View className="absolute bottom-0 left-0 right-0 p-4 border-t flex-row justify-between items-center bg-white shadow-lg">
          <View className="flex-1 mr-3 border-2 border-blue-500 rounded-full py-3 items-center">
            <Text className="text-blue-500 font-bold">Price Details</Text>
          </View>
          <TouchableOpacity
            className="flex-[2] bg-blue-500 rounded-full py-3.5 items-center shadow-sm"
            onPress={() =>
              router.push({
                pathname: `/booking/book`,
                params: { tour: JSON.stringify(tour) },
              })
            }
          >
            <Text className="text-white font-bold text-lg">Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DetailTourScreen;
