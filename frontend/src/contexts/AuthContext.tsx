import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";

interface Data {
  token: string;
  setToken: any;
  isSignedIn: boolean;
}

export const AuthContext = createContext<Data>({} as Data);

const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [authorization, setAuthorization] = useState<string>("");
  const [checkLogIn, setCheckLogIn] = useState<boolean>(false);

  const userToken = async () => {
    let token = "";

    try {
      const value = await AsyncStorage.getItem("token");

      if (value) {
        token = "Bearer ".concat(value);
        return token;
      }
    } catch (error) {
      console.log("Sem Token");
    }

    return token;
  };

  const chekIsLoggedIn = () => {
    authorization ? setCheckLogIn(true) : setCheckLogIn(false);
  };

  useEffect(() => {
    userToken().then((value) => {
      setAuthorization(value);
    });
  }, []);

  useEffect(() => {
    chekIsLoggedIn();
  }, [authorization, chekIsLoggedIn]);

  return (
    <AuthContext.Provider
      value={{
        token: authorization,
        setToken: setAuthorization,
        isSignedIn: checkLogIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
