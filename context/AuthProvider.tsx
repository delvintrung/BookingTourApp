import { User } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";

interface AuthContextType {
  isLoading: boolean;
  userToken: string | null;
  userInfo: User | null;
  setUserToken: (token: string | null) => void;
  setUserInfo: (user: User | null) => void;
  login: (token: string, user: User) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  isLoading: true,
  userToken: null,
  userInfo: null,
  setUserToken: () => {},
  setUserInfo: () => {},
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<User | null>(null);

  const login = async (token: string, user: User) => {
    setIsLoading(true);
    await AsyncStorage.setItem("userToken", token);
    await AsyncStorage.setItem("userInfo", JSON.stringify(user));

    setUserToken(token);
    setUserInfo(user);
    setIsLoading(false);
  };

  const logout = async () => {
    setIsLoading(true);
    await AsyncStorage.removeItem("userToken");
    await AsyncStorage.removeItem("userInfo");
    setUserToken(null);
    setUserInfo(null);
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let token = await AsyncStorage.getItem("userToken");
      let user = await AsyncStorage.getItem("userInfo");

      if (token) {
        setUserToken(token);
        setUserInfo(JSON.parse(user!));
      }
    } catch (e) {
      console.log(`Lỗi check login: ${e}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userToken,
        userInfo,
        setUserToken,
        setUserInfo,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
