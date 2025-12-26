import { Tour } from "@/types";
import { router } from "expo-router";
import React from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";

const TourCard = ({ tour }: { tour: Tour }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        router.push({
          pathname: "/tour/detail/[id]",
          params: { id: tour.id.toString() },
        })
      }
      className="mt-2"
    >
      <View className="w-[343px] h-[216px]">
        <ImageBackground
          className="object-cover w-full h-full rounded-xl overflow-hidden py-2"
          source={{ uri: tour.imageUrl }}
        >
          <View className="flex-row items-center justify-between mt-auto">
            <View className="w-1/2">
              <Text className="text-white text-lg font-bold px-4 pt-4">
                {tour.title}
              </Text>
              <Text className="text-white text-xs font-bold px-4">
                {tour.shortDesc}
              </Text>
              <Text className="text-white px-4">{tour.duration}</Text>
            </View>
            <View className="bg-white rounded-bl-xl rounded-tr-xl px-3 py-1 m-4 h-12">
              <Text className="text-blue-500 font-bold">
                {tour.tourDetails?.[0]?.tourPrices?.[0]?.price?.toLocaleString(
                  "vi-VN",
                  {
                    style: "currency",
                    currency: "VND",
                  }
                ) ??
                  `${tour.price?.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}`}
              </Text>
              <Text className="text-gray-500 text-xs">per person</Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

export default TourCard;
