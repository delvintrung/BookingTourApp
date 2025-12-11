import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Alert,
  Image,
  Linking,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabTwoScreen() {
  const [location, setLocation] =
    useState<Location.LocationObjectCoords | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [passengerOptionSelected, setPassengerOptionSelected] = useState("");

  // Define hash object for passenger options
  const data = [
    { key: "1", value: "1 Passenger" },
    { key: "2", value: "2 Passengers" },
    { key: "3", value: "More than 2 Passengers" },
  ];

  const handleGetLocation = async () => {
    setLoading(true);
    setErrorMsg(null);

    try {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setErrorMsg("Quyền truy cập bị từ chối!");
        Alert.alert(
          "Cần quyền truy cập",
          "Vui lòng vào Cài đặt > Quyền riêng tư để bật vị trí cho ứng dụng.",
          [
            { text: "Hủy", style: "cancel" },
            { text: "Mở Cài đặt", onPress: () => Linking.openSettings() },
          ]
        );
        setLoading(false);
        return;
      }

      // 2. Lấy vị trí (Get Position)
      // accuracy: Location.Accuracy.High giúp lấy chính xác hơn (nhưng tốn pin hơn chút)
      let currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      console.log("Current Location:", location);

      setLocation(currentLocation.coords);
    } catch (error) {
      setErrorMsg("Không thể lấy vị trí. Hãy kiểm tra xem GPS đã bật chưa.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={["#09448A", "#3865E0"]}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      className="w-full h-full justify-center items-center relative"
    >
      <SafeAreaView className="flex-col items-center gap-5">
        <StatusBar style="light" />
        <View className="relative">
          <Image
            className="absolute top-[-190px] left-[-190px] opacity-70"
            source={require("../../assets/icons/plane-line.png")}
          ></Image>
          <Image
            className="absolute w-[30px] h-[30px] top-[270px] rotate-[-15deg] "
            source={require("../../assets/icons/plane.png")}
          ></Image>
        </View>
        <View className="w-[193px] mb-10">
          <View className="flex-row items-center mb-2">
            <Text className="text-white text-4xl font-extrabold tracking-tight">
              Booking
            </Text>
            <Text className="text-[#6BA3F9] text-4xl font-extrabold">.com</Text>
          </View>
          <Text className="text-white text-lg font-medium opacity-90">
            Search for cheap hotels
          </Text>
        </View>

        <View className="mb-10 items-center">
          <View className="w-20 h-20 bg-blue-100 rounded-full items-center justify-center mb-4">
            <Ionicons name="location" size={40} color="#3B82F6" />
          </View>

          {location ? (
            <View className="items-center">
              <Text className="text-xl font-bold text-gray-800">
                Vị trí của bạn:
              </Text>
              <Text className="text-black mt-2">
                Vĩ độ: {location.latitude}
              </Text>
              <Text className="text-black">Kinh độ: {location.longitude}</Text>
            </View>
          ) : (
            <Text className="text-gray-500 text-center">
              {errorMsg || "Chưa có dữ liệu vị trí.\nHãy nhấn nút bên dưới."}
            </Text>
          )}
        </View>

        <View className="px-4 gap-y-3 py-16">
          <View className="bg-white rounded-xl flex-row items-center p-4 h-14 w-[345px]">
            <Ionicons name="location-sharp" size={24} color="#4B5563" />
            <TextInput
              placeholder="Tallinn"
              placeholderTextColor="#000"
              className="flex-1 ml-3 text-base font-semibold text-black"
            />
            <TouchableOpacity onPress={handleGetLocation} disabled={loading}>
              <Ionicons name="locate" size={24} color="#3A63E8" />
            </TouchableOpacity>
          </View>

          <SelectList
            placeholder="Select quantity of passenger"
            setSelected={(val: string) => setPassengerOptionSelected(val)}
            data={data}
            fontFamily="lato"
            save="value"
            search={false}
            dropdownItemStyles={{
              backgroundColor: "white",
            }}
            arrowicon={
              <Ionicons name="chevron-down" size={20} color="#9CA3AF" />
            }
            dropdownTextStyles={{
              color: "black",
              fontSize: 16,
            }}
            dropdownStyles={{
              backgroundColor: "white",
            }}
            boxStyles={{
              borderBlockColor: undefined,
              backgroundColor: "white",
            }}
          />

          <TouchableOpacity
            activeOpacity={0.8}
            className="mt-4 bg-[#FD8D14] rounded-xl py-4 items-center justify-center shadow-sm"
          >
            <Text className="text-white text-lg font-bold">Find Tour</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
