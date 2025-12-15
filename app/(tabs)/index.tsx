import SearchTour from "@/components/form/SearchTour";
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import "../global.css";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 bg-white">
          <ImageBackground
            className="w-full h-1/2 relative items-center"
            style={{ paddingTop: insets.top }}
            source={require("../../assets/UI/banner.webp")}
          >
            <Text className="mt-14 text-white text-4xl w-[246px] font-bold">
              Search for cheap airline tickets
              <Text className="font-bold text-orange-500"> BookingTour</Text>
            </Text>
            <SearchTour />
          </ImageBackground>

          <View className="p-4 mt-4">
            <Text className="text-3xl font-bold">Recently viewed</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
