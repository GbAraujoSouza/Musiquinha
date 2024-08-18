import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Library from "../pages/Library";
import LikedSongs from "../pages/LikedSongs";

const LibraryStack = createNativeStackNavigator();

export function LibratyStackRoutes() {
  return (
    <LibraryStack.Navigator screenOptions={{ headerShown: false }}>
      <LibraryStack.Screen name="Library" component={Library} />
      <LibraryStack.Screen name="LikedSongs" component={LikedSongs} />
    </LibraryStack.Navigator>
  );
}
