import React from "react";
import { ActivityIndicator, View } from "react-native";

const LoadingSpinner = () => {
  return (
    <View className="w-screen h-screen flex items-center justify-center">
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

export default LoadingSpinner;
