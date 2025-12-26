import { Tour } from "@/types";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const mockTour: Tour = {
  id: 1,
  title: "Sample Tour",
  shortDesc: "This is a sample tour description.",
  longDesc: "This is a detailed description of the sample tour.",
  imageUrl: "https://example.com/image.jpg",
  price: 100,
  rating: 4.5,
  duration: "3 days",
  tourDetails: [],
  createdAt: new Date().toString(),
  updatedAt: new Date().toString(),
};

const TourSuggest = () => {
  const router = useRouter();
  return (
    <View className="flex-row items-center justify-between h-24 p-4 ">
      <Image
        source={{ uri: mockTour.imageUrl }}
        className="w-20 h-20 rounded-lg"
      />
      <View>
        <Text>{mockTour.title}</Text>
        <Text className="text-gray-500">{mockTour.shortDesc}</Text>
      </View>
      <View>
        <Text className="text-blue-500 font-bold">${mockTour.price}</Text>
      </View>
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: "/tour/detail/[id]",
            params: { id: mockTour.id.toString() },
          })
        }
      >
        <AntDesign
          name="right"
          size={24}
          color="black"
          className="opacity-60"
        />
      </TouchableOpacity>
    </View>
  );
};

export default TourSuggest;
