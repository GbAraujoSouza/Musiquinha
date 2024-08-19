import { NavigationContainer } from "@react-navigation/native";
import TabRoutes from "./tab.routes";
import { useAuth } from "../contexts/AuthContext";
import { AuthStackRoutes } from "./stack.routes";

export default function Routes() {
  const { isSignedIn } = useAuth();
  return <>{isSignedIn() ? <TabRoutes /> : <AuthStackRoutes />}</>;
}
