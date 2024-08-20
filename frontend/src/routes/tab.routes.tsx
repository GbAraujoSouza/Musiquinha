import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { icons } from "../constants";

import Home from "../pages/Home";
import Search from "../pages/Search";
import { View, StyleSheet } from "react-native";
import theme from "../theme";
import { SvgProps } from "react-native-svg";
import { BlurView } from "expo-blur";
import { LibratyStackRoutes } from "./stack.routes";

const Tab = createBottomTabNavigator();

interface TabIconProps {
  icon: keyof typeof icons;
  color: string;
  focused: boolean;
}

const TabIcon = ({ icon, color }: TabIconProps) => {
  const IconComponent = icons[icon] as React.FC<SvgProps>;

  return (
    <View>
      <IconComponent fill={color} />
    </View>
  );
};

export default function TabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.COLORS.BLUE,
        tabBarInactiveTintColor: theme.COLORS.TEXT,
        tabBarLabelStyle: {
          fontFamily: theme.FONT_FAMILY.POPPINS.SEMIBOLD,
          fontSize: 12,
        },
        tabBarStyle: {
          position: "absolute",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderTopWidth: 0,
          paddingTop: 8,
          backgroundColor: theme.COLORS.BASE,
        },
        // tabBarBackground: () => (
        //   <BlurView
        //     intensity={75}
        //     style={{
        //       ...StyleSheet.absoluteFillObject,
        //       overflow: "hidden"
        //     }}
        //   />
        // ),
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon icon="home" color={color} focused={focused} />
          ),
        }}
      />

      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon icon="search" color={color} focused={focused} />
          ),
        }}
      />

      <Tab.Screen
        name="Library"
        component={LibratyStackRoutes}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon icon="library" color={color} focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
