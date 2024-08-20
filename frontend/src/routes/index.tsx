import { NavigationContainer } from "@react-navigation/native";
import TabRoutes from "./tab.routes";
import { useAuth } from "../contexts/AuthContext";
import { AuthStackRoutes, LibratyStackRoutes } from "./stack.routes";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function Routes() {
  const { isSignedIn } = useAuth();
  const RootStack = createNativeStackNavigator();

  return (
    <LibratyStackRoutes />
  );
}
