import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Library from "../pages/Library";
import LikedSongs from "../pages/LikedSongs";
import Login from "../pages/Login";
import Register from "../pages/Register";

const LibraryStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();

export function LibratyStackRoutes() {
  return (
    <LibraryStack.Navigator screenOptions={{ headerShown: false }}>
      <LibraryStack.Screen name="Library" component={Library} />
      <LibraryStack.Screen
        name="LikedSongs"
        component={LikedSongs}
        options={{ headerShown: true ,title: "Liked Songs", headerStyle}}
      />
    </LibraryStack.Navigator>
  );
}

export function AuthStackRoutes() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Register" component={Register} />
    </AuthStack.Navigator>
  );
}
