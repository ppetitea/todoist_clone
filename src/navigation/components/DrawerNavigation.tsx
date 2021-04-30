import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { IStackScreen } from "../../models/navigation";

const Drawer = createDrawerNavigator();

type DrawerProps = {
  listOfScreens: Array<IStackScreen>;
};

const DrawerNavigation = ({ listOfScreens }: DrawerProps) => {
  return (
    <Drawer.Navigator>
      {listOfScreens.map((screen: IStackScreen) => {
        return (
          <Drawer.Screen
            key={screen.key}
            name={screen.label}
            component={screen.component}
          />
        );
      })}
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
