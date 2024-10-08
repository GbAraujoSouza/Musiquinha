import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Library from "../pages/Library";
import LikedSongs from "../pages/LikedSongs";
import Login from "../pages/Login";
import Register from "../pages/Register";
import TabRoutes from "./tab.routes";
import PlaylistDetails from "../pages/PlaylistDetails";

const LibraryStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();

export function LibraryStackRoutes() {
  return (
    <LibraryStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <LibraryStack.Screen name="LibraryScreen" component={Library} />
      <LibraryStack.Screen name="LikedSongs" component={LikedSongs} />
      <LibraryStack.Screen name="PlaylistDetails" component={PlaylistDetails} />
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
