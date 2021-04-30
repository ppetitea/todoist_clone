import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { IStackScreen } from "../../models/navigation";
import palette from "../../constants/palette";
const Stack = createStackNavigator();

type StackNavigationProps = {
  listOfScreens: Array<IStackScreen>;
};

const StackNavigation = ({ listOfScreens }: StackNavigationProps) => {
  return (
    <Stack.Navigator>
      {listOfScreens.map((screen: IStackScreen) => {
        return (
          <Stack.Screen
            key={screen.key}
            name={screen.label}
            component={screen.component}
            options={{
              headerStyle: {
                height: 80, // Specify the height of your custom header
                backgroundColor: palette.dark.surface2,
                elevation: 10,
              },
              headerTitleStyle: {
                color: palette.light.text1,
              },
            }}
          />
        );
      })}
    </Stack.Navigator>
  );
};

export default StackNavigation;
