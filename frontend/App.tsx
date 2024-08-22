import { StatusBar } from "expo-status-bar";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useCallback, useEffect, useState } from "react";

import { ThemeProvider } from "styled-components/native";
import theme from "./src/theme";
import Routes from "./src/routes";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SafeAreaView } from "react-native";
// import "react-toastify/dist/ReactToastify.css";
import { NavigationContainer } from "@react-navigation/native";
import AuthProvider from "./src/contexts/AuthContext";
// import { ToastContainer } from "react-toastify";
import { useSetupTrackPlayer } from "./src/hooks/useSetupTrackPlayer";
import { useLogTrackPlayerState } from "./src/hooks/useLogTrackPlayerState";
import FloatingPlayer from "./src/components/FloatingPlayer";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isPlayerReady, setIsPlayerReady] = useState<boolean>(false);

  const handleTrackPlayerLoaded = useCallback(() => {
    setIsPlayerReady(true);
  }, []);

  useSetupTrackPlayer({
    onLoad: handleTrackPlayerLoaded,
  });

  useLogTrackPlayerState();

  const [fontsLoaded, error] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded && isPlayerReady) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error, isPlayerReady]);

  if (!fontsLoaded && !isPlayerReady) {
    return null;
  }

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: "#000"}}>
          <Routes />
        </SafeAreaView>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
