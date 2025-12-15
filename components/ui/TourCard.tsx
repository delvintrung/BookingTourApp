import { Tour } from "@/types";
import { router } from "expo-router";
import React from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";

export const mockTour: Tour = {
  id: 1,
  title: "Beautiful Beach Tour",
  shortDesc:
    "Khám phá thị trấn trong sương, chinh phục nóc nhà Đông Dương và tìm hiểu văn hóa bản địa độc đáo.",
  longDesc:
    "Trải nghiệm cái lạnh đặc trưng của vùng cao Tây Bắc, có thể có tuyết rơi vào mùa đông. Chinh phục đỉnh Fansipan bằng cáp treo hoặc leo núi (trekking) cho người thích mạo hiểm. Tham quan bản Cát Cát của người H'mong, ngắm ruộng bậc thang vàng óng. Thưởng thức đồ nướng nóng hổi, thắng cố và lẩu cá hồi Sapa. Săn mây trên đỉnh núi, không khí lãng mạn phù hợp cho các cặp đôi.",
  duration: "3 ngày 2 đêm",
  capacity: undefined,
  imageUrl:
    "https://my-photo-bucket-tour.s3.us-east-2.amazonaws.com/tour/canh-dep-sapa_1724833818.jpg",
  location: "Lào Cai, Việt Nam",
  price: 2500000,
  rating: 4.8,
  createdAt: "2023-10-01T10:00:00Z",
  updatedAt: "2023-10-05T12:00:00Z",
};

const TourCard = ({ tour }: { tour: Tour }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        router.push({
          pathname: "/(tabs)/tour/detail/[id]",
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
