import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { NAVIGATION_OFFLINE, NAVIGATION_SECURE } from "../constants/navigation";
import { IStackNavigation } from "../models/navigation";
import OfflineNavigation from "./OfflineNavigation";
import SecureNavigation from "./SecureNavigation";

const Stack = createStackNavigator();

const SUBNAVIGATION_LIST: Array<IStackNavigation> = [
  { ...NAVIGATION_SECURE, component: SecureNavigation },
  { ...NAVIGATION_OFFLINE, component: OfflineNavigation },
];

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {SUBNAVIGATION_LIST.map((subNavigation: IStackNavigation) => {
          return (
            <Stack.Screen
              key={subNavigation.key}
              name={subNavigation.key}
              component={subNavigation.component}
              options={options.noHeader}
            />
          );
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const options = {
  noHeader: { headerShown: false },
};

export default AppNavigation;

// class Screen {
//   key: string;
//   label: string;
//   component: ComponentType;
//   constructor(key: string, label: string, component: ComponentType) {
//     this.key = key;
//     this.label = label;
//     this.component = component;
//   }
// }
