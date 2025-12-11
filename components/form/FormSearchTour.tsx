import React, { useState } from "react";
import { TextInput, View } from "react-native";

const FormSearchTour = () => {
  const [searchText, setSearchText] = useState<string>("");
  return (
    <View className="w-[90%] h-[50px] bg-white flex-row items-center px-3 mt-4 rounded-md">
      <TextInput
        value={searchText}
        defaultValue={searchText}
        onChangeText={(newText) => setSearchText(newText)}
        placeholder="Tìm kiếm nơi muốn đến của bạn"
      />
    </View>
  );
};

export default FormSearchTour;
