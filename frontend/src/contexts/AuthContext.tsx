import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";
import { UserProfile } from "../models/user";
import AuthService from "../services/AuthService";
// import { toast } from "react-toastify";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Text } from "react-native";

interface AuthContextValue {
  user: UserProfile | null;
  token: string | null;

  isSignedIn: () => boolean;
  registerUser: (email: string, name: string, password: string) => void;
  loginUser: (email: string, password: string) => void;
  logout: () => void;
}
//
// export interface RootStackParamList {
//   Register: undefined;
//   Login: undefined;
//   Home: undefined;
// };

const AuthContext = createContext<AuthContextValue | null>(null);

const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const navigation = useNavigation();

  const [authorizationToken, setAuthorizationToken] = useState<string | null>(
    null,
  );
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    const fetchAsyncStorageData = async () => {
      const user = await AsyncStorage.getItem("user");
      const token = await AsyncStorage.getItem("token");

      if (user && token) {
        setUser(JSON.parse(user));
        setAuthorizationToken("Bearer ".concat(token));
      }

      setIsReady(true);
    };

    fetchAsyncStorageData();
  }, []);

  const registerUser = async (
    email: string,
    name: string,
    password: string,
  ) => {
    await AuthService.register({ name, email, password })
      .then((response) => {
        if (response?.status === 201) {
          // toast.success("Successfully Registered");
          navigation.navigate("Login" as never);
        }
      })
      .catch((e) => console.log("Server error ocurred"));
  };

  const loginUser = async (email: string, password: string) => {
    await AuthService.login({ email, password })
      .then(async (response) => {
        if (response) {
          await AsyncStorage.setItem("token", response.data.token);
          await AsyncStorage.setItem(
            "user",
            JSON.stringify(response.data.user),
          );

          setAuthorizationToken(response.data.token);
          setUser(response.data.user);

          // toast.success("Login Success!");
          // navigation.navigate("Home" as never);
          navigation.navigate("Main" as never);
        }
      })
      .catch((e) => console.log("Server error ocurred: "+e));
  };

  const isLoggedIn = () => !!user;

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
    setUser(null);
    setAuthorizationToken("");
    navigation.navigate("Login" as never);
  };

  return (
    <AuthContext.Provider
      value={{
        loginUser,
        registerUser,
        user,
        token: authorizationToken,
        logout,
        isSignedIn: isLoggedIn,
      }}
    >
      {isReady ? children : <Text>Loading...</Text>}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) throw new Error("AuthContext must be used inside provider");
  return context;
};

