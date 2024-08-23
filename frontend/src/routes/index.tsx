import { NavigationContainer } from "@react-navigation/native";
import { AuthStackRoutes, LibraryStackRoutes } from "./stack.routes";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthProvider, { useAuth } from "../contexts/AuthContext";
import FloatingPlayer from "../components/FloatingPlayer";
import TabRoutes from "./tab.routes";
import { FavoritesProvider } from "../contexts/FavoritesContext";
import { PlaylistsProvider } from "../contexts/PlaylistContext";
import { StatusBar } from "react-native";
import theme from "../theme";

const Routes = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <PlaylistsProvider>
          <FavoritesProvider>
            <AppRoutes />
            <StatusBar
              barStyle="light-content"
              backgroundColor={theme.COLORS.BASE}
            />
          </FavoritesProvider>
        </PlaylistsProvider>
      </AuthProvider>
    </NavigationContainer>
  );
};

const AppRoutes = () => {
  const { isSignedIn } = useAuth();

  return isSignedIn() ? (
    <>
      <TabRoutes />
      <FloatingPlayer />
    </>
  ) : (
    <AuthStackRoutes />
  );
};

export default Routes;
