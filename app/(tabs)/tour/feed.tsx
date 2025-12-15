import { getTours } from "@/api/tourApi";
import TourCard from "@/components/ui/TourCard";
import { Tour } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const FeedScreen = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [tours, setTours] = useState<Tour[]>([]);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["tours"],
    queryFn: getTours,
  });
  useEffect(() => {
    if (data) {
      setTours(data);
    }
  }, [data]);

  if (isLoading) {
    return <ActivityIndicator color="blue" size="large" />;
  }
  return (
    <SafeAreaView className="flex-1">
      <StatusBar style="auto" />
      <View className="flex-1 bg-gray-100 items-center pt-4">
        <View className="relative">
          <TextInput
            className="bg-white w-[343px] h-[40px] rounded-xl pr-4 pl-10 font-bold text-gray-500"
            placeholder="Search tours"
            value={search}
            onChangeText={(val) => setSearch(val)}
          />
          <Ionicons
            className="absolute top-0 p-2"
            name="search-outline"
            size={24}
            color="gray"
          />
        </View>

        <ScrollView style={{ flex: 1 }}>
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default FeedScreen;
