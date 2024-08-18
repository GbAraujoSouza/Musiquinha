import { StatusBar } from "expo-status-bar";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useEffect } from "react";

import { ThemeProvider } from "styled-components/native";
import theme from "./src/theme";
import Routes from "./src/routes";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, error] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded) {
    return null;
  }

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <StatusBar translucent backgroundColor={theme.COLORS.BASE} />
        <SafeAreaView style={{ flex: 1 }}>
          <Routes />
        </SafeAreaView>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
