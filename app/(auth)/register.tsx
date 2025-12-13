import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
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

import axiosClient from "@/api/customAxios";
import LoadingSpinner from "@/components/activity-indicator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const registerSchema = z
  .object({
    fullname: z.string().min(1, "Vui lòng nhập họ tên"),
    email: z.string().email("Email không hợp lệ").min(1, "Vui lòng nhập email"),
    password: z.string().min(6, "Mật khẩu phải ít nhất 6 ký tự"),
    confirmPassword: z.string().min(1, "Vui lòng nhập lại mật khẩu"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu nhập lại không khớp",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    if (!agreeToTerms) {
      ToastAndroid.showWithGravity(
        "Vui lòng đồng ý với điều khoản sử dụng",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      return;
    }
    try {
      setIsLoading(true);
      const response = await axiosClient.post("/v1/auth/register", data);
      if (response.data.statusCode === 200) {
        ToastAndroid.showWithGravity(
          "Đăng ký thành công! Vui lòng đăng nhập.",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );

        router.push("/login");
      }
    } catch (error) {
      console.error("Register error:", error);
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
            <View className="items-center mt-8 mb-6">
              <View className="w-20 h-20 bg-blue-600 rounded-2xl items-center justify-center mb-4 shadow-lg shadow-blue-300">
                <Ionicons name="airplane" size={40} color="white" />
              </View>
              <Text className="text-3xl font-bold text-gray-900">
                Create Account
              </Text>
              <Text className="text-gray-500 text-base mt-2 text-center">
                Join us for amazing travel experiences
              </Text>
            </View>

            <View className="space-y-4">
              <View className="space-y-2">
                <Text className="text-gray-700 font-medium ml-1">
                  Full Name
                </Text>
                <View
                  className={`flex-row items-center bg-gray-50 border rounded-xl px-4 h-14 ${errors.fullname ? "border-red-500" : "border-gray-200"}`}
                >
                  <Ionicons name="person-outline" size={22} color="#9CA3AF" />
                  <Controller
                    control={control}
                    name="fullname"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        className="flex-1 ml-3 text-base text-gray-900"
                        placeholder="Enter your full name"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        autoCapitalize="words"
                      />
                    )}
                  />
                </View>
                {errors.fullname && (
                  <Text className="text-red-500 text-xs ml-1">
                    {errors.fullname.message}
                  </Text>
                )}
              </View>

              <View className="space-y-2">
                <Text className="text-gray-700 font-medium ml-1">
                  Email Address
                </Text>
                <View
                  className={`flex-row items-center bg-gray-50 border rounded-xl px-4 h-14 ${errors.email ? "border-red-500" : "border-gray-200"}`}
                >
                  <Ionicons name="mail-outline" size={22} color="#9CA3AF" />
                  <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        className="flex-1 ml-3 text-base text-gray-900"
                        placeholder="name@example.com"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        keyboardType="email-address"
                        autoCapitalize="none"
                      />
                    )}
                  />
                </View>
                {errors.email && (
                  <Text className="text-red-500 text-xs ml-1">
                    {errors.email.message}
                  </Text>
                )}
              </View>

              <View className="space-y-2">
                <Text className="text-gray-700 font-medium ml-1">Password</Text>
                <View
                  className={`flex-row items-center bg-gray-50 border rounded-xl px-4 h-14 ${errors.password ? "border-red-500" : "border-gray-200"}`}
                >
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
                {errors.password && (
                  <Text className="text-red-500 text-xs ml-1">
                    {errors.password.message}
                  </Text>
                )}
              </View>

              <View className="space-y-2">
                <Text className="text-gray-700 font-medium ml-1">
                  Confirm Password
                </Text>
                <View
                  className={`flex-row items-center bg-gray-50 border rounded-xl px-4 h-14 ${errors.confirmPassword ? "border-red-500" : "border-gray-200"}`}
                >
                  <Ionicons
                    name="lock-closed-outline"
                    size={22}
                    color="#9CA3AF"
                  />
                  <Controller
                    control={control}
                    name="confirmPassword"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        className="flex-1 ml-3 text-base text-gray-900"
                        placeholder="Confirm your password"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        secureTextEntry={!isConfirmPasswordVisible}
                      />
                    )}
                  />
                  <TouchableOpacity
                    onPress={() =>
                      setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                    }
                  >
                    <Ionicons
                      name={
                        isConfirmPasswordVisible
                          ? "eye-off-outline"
                          : "eye-outline"
                      }
                      size={22}
                      color="#6B7280"
                    />
                  </TouchableOpacity>
                </View>
                {errors.confirmPassword && (
                  <Text className="text-red-500 text-xs ml-1">
                    {errors.confirmPassword.message}
                  </Text>
                )}
              </View>

              <TouchableOpacity
                className="flex-row items-center mt-2"
                onPress={() => setAgreeToTerms(!agreeToTerms)}
              >
                <View
                  className={`w-5 h-5 rounded border-2 items-center justify-center ${
                    agreeToTerms
                      ? "bg-blue-600 border-blue-600"
                      : "border-gray-300"
                  }`}
                >
                  {agreeToTerms && (
                    <Ionicons name="checkmark" size={16} color="white" />
                  )}
                </View>
                <Text className="text-gray-600 text-sm ml-3">
                  I agree to the{" "}
                  <Text className="text-blue-600 font-semibold">
                    Terms & Conditions
                  </Text>
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-blue-600 rounded-xl h-14 items-center justify-center mt-6 shadow-md shadow-blue-400"
                onPress={handleSubmit(onSubmit)}
              >
                <Text className="text-white text-lg font-bold">
                  Create Account
                </Text>
              </TouchableOpacity>
            </View>
            <View className="flex-row items-center my-8">
              <View className="flex-1 h-[1px] bg-gray-200" />
              <Text className="mx-4 text-gray-400 font-medium">
                Or sign up with
              </Text>
              <View className="flex-1 h-[1px] bg-gray-200" />
            </View>

            <TouchableOpacity className="flex-row items-center justify-center bg-white border border-gray-200 rounded-xl h-14 mb-4">
              <AntDesign
                name="google"
                size={24}
                color="#DB4437"
                style={{ marginRight: 10 }}
              />
              <Text className="text-gray-800 text-lg font-semibold">
                Sign up with Google
              </Text>
            </TouchableOpacity>
            <View className="flex-row justify-center mb-10">
              <Text className="text-gray-500 text-base">
                Already have an account?{" "}
              </Text>
              <TouchableOpacity onPress={() => router.push("/login")}>
                <Text className="text-blue-600 font-bold text-base">
                  Log In
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
