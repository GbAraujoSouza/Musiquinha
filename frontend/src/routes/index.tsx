import { AuthStackRoutes, LibratyStackRoutes } from "./stack.routes";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Routes = () => {
  const RootStack = createNativeStackNavigator();

  return (
    <LibratyStackRoutes />
  );
}

export default Routes;
