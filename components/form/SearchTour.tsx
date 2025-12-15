import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";

interface SearchRequest {
  searchText: string;
  passengerOption: number;
  selectDate: Date;
}

const SearchTour = () => {
  const [searchRequest, setSearchRequest] = useState<SearchRequest>({
    searchText: "",
    passengerOption: 1,
    selectDate: new Date(),
  });
  const [openDatePicker, setOpenDatePicker] = useState<boolean>(false);
  const data = [
    { key: "1", value: "1" },
    { key: "2", value: "2" },
    { key: "3", value: "> 2" },
  ];
  return (
    <View className="flex-1 w-full absolute left-5 top-1/2">
      <View className="w-[90%] h-[50px] bg-white flex-row items-center px-3 mt-4 rounded-md">
        <TextInput
          value={searchRequest.searchText}
          defaultValue={searchRequest.searchText}
          onChangeText={(newText) =>
            setSearchRequest({ ...searchRequest, searchText: newText })
          }
          placeholder="Tìm kiếm nơi muốn đến của bạn"
        />
      </View>
      <View className="flex-row items-center justify-start mt-4 gap-2">
        <TouchableOpacity onPress={() => setOpenDatePicker(true)}>
          <View className="bg-white h-10 px-3 rounded-md flex-row items-center gap-2 ">
            <Ionicons name="calendar-clear-outline" size={16} color="black" />
            <Text className="text-gray-500">
              {searchRequest.selectDate.toDateString() || "Choose Date"}
            </Text>
          </View>
        </TouchableOpacity>
        <View className="bg-white h-10 px-3 rounded-md flex-row items-center z-50 w-[80px]">
          <Ionicons name="person-outline" size={16} color="black" />
          <SelectList
            data={data}
            save="value"
            search={false}
            setSelected={(val: string) =>
              setSearchRequest({
                ...searchRequest,
                passengerOption: Number(val === "> 2" ? 3 : val),
              })
            }
            boxStyles={{
              backgroundColor: "transparent",
              borderWidth: 0,
              width: "100%",
            }}
            dropdownStyles={{
              width: "100%",
              borderWidth: 0,
              elevation: 4,
              backgroundColor: "white",
            }}
          />
        </View>

        <TouchableOpacity>
          <View className="bg-white h-10 px-3 rounded-md flex-row items-center gap-2">
            <Text className="font-bold ">Filters</Text>
          </View>
        </TouchableOpacity>
      </View>
      {openDatePicker && (
        <DateTimePicker
          value={searchRequest.selectDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || searchRequest.selectDate;
            setOpenDatePicker(false);
            setSearchRequest({ ...searchRequest, selectDate: currentDate });
          }}
        />
      )}
    </View>
  );
};

export default SearchTour;
