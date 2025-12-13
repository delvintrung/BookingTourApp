import axiosClient from "@/api/customAxios";
import LoadingSpinner from "@/components/activity-indicator";
import { AuthContext } from "@/context/AuthProvider";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";

const loginSchema = z.object({
  username: z.string().min(1, "Vui lòng nhập họ tên"),
  password: z.string().min(6, "Mật khẩu phải ít nhất 6 ký tự"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setIsLoading(true);
      const response = await axiosClient.post("/v1/login", data);
      if (response.data.statusCode === 200) {
        const { accessToken, userLogin } = response.data.data;
        await login(accessToken, userLogin);
        ToastAndroid.showWithGravity(
          "Đăng nhập thành công!",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
        router.push("/");
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <SafeAreaView className="flex-1">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            className="px-6"
          >
            <View className="items-center mt-10 mb-8">
              <View className="w-20 h-20 bg-blue-600 rounded-2xl items-center justify-center mb-4 shadow-lg shadow-blue-300">
                <Ionicons name="airplane" size={40} color="white" />
              </View>
              <Text className="text-3xl font-bold text-gray-900">
                Welcome Back!
              </Text>
              <Text className="text-gray-500 text-base mt-2 text-center">
                Sign in to continue your journey
              </Text>
            </View>

            <View className="space-y-4">
              <View className="space-y-2">
                <Text className="text-gray-700 font-medium ml-1">
                  Email Address
                </Text>
                <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-xl px-4 h-14 focus:border-blue-500">
                  <Ionicons name="mail-outline" size={22} color="#9CA3AF" />
                  <Controller
                    control={control}
                    name="username"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        className="flex-1 ml-3 text-base text-gray-900"
                        placeholder="Enter your email address"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        keyboardType="email-address"
                        autoCapitalize="none"
                      />
                    )}
                  />
                </View>
              </View>

              <View className="space-y-2 mt-4">
                <Text className="text-gray-700 font-medium ml-1">Password</Text>
                <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-xl px-4 h-14 focus:border-blue-500">
                  <Ionicons
                    name="lock-closed-outline"
                    size={22}
                    color="#9CA3AF"
                  />
                  <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        className="flex-1 ml-3 text-base text-gray-900"
                        placeholder="Enter your password"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        secureTextEntry={!isPasswordVisible}
                      />
                    )}
                  />
                  <TouchableOpacity
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  >
                    <Ionicons
                      name={
                        isPasswordVisible ? "eye-off-outline" : "eye-outline"
                      }
                      size={22}
                      color="#6B7280"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity className="items-end mt-2">
                <Text className="text-blue-600 font-semibold">
                  Forgot Password?
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-blue-600 rounded-xl h-14 items-center justify-center mt-6 shadow-md shadow-blue-400"
                onPress={handleSubmit(onSubmit)}
              >
                <Text className="text-white text-lg font-bold">Sign In</Text>
              </TouchableOpacity>
            </View>

            <View className="flex-row items-center my-8">
              <View className="flex-1 h-[1px] bg-gray-200" />
              <Text className="mx-4 text-gray-400 font-medium">
                Or continue with
              </Text>
              <View className="flex-1 h-[1px] bg-gray-200" />
            </View>
            <TouchableOpacity className="flex-row items-center justify-center bg-white border border-gray-200 rounded-xl h-14 mb-4 relative">
              <AntDesign
                name="google"
                size={24}
                color="#DB4437"
                style={{ marginRight: 10 }}
              />
              <Text className="text-gray-800 text-lg font-semibold">
                Sign in with Google
              </Text>
            </TouchableOpacity>

            <View className="flex-row justify-center mb-10">
              <Text className="text-gray-500 text-base">
                Don't have an account?{" "}
              </Text>
              <TouchableOpacity onPress={() => router.push("/register")}>
                <Text className="text-blue-600 font-bold text-base">
                  Register
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
