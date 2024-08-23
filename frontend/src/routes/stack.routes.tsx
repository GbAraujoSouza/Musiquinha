import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Library from "../pages/Library";
import LikedSongs from "../pages/LikedSongs";
import Login from "../pages/Login";
import Register from "../pages/Register";
import TabRoutes from "./tab.routes";
import theme from "../theme";

const LibraryStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();

export function LibraryStackRoutes() {
  return (
    <LibraryStack.Navigator
      screenOptions={{
        headerShown: false,
        // title: "",
        statusBarStyle: "light",
        statusBarColor: theme.COLORS.BASE,
        // headerStyle: { backgroundColor: theme.COLORS.BASE },
        // headerTintColor: theme.COLORS.TEXT,
      }}
    >
      <LibraryStack.Screen name="Library" component={Library} />
      <LibraryStack.Screen name="LikedSongs" component={LikedSongs} />
    </LibraryStack.Navigator>
  );
}

export function AuthStackRoutes() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Register" component={Register} />
      <AuthStack.Screen name="Main" component={TabRoutes} />
    </AuthStack.Navigator>
  );
}
