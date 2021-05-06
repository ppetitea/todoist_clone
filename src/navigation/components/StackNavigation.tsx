import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { IStackScreen } from "../../models/navigation";
import palette from "../../constants/palette";
import { StyleSheet } from "react-native";
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
            options={{ ...screen.options, ...styles }}
          />
        );
      })}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    height: 80,
    backgroundColor: palette.dark.surface2,
    elevation: 10,
  },
  headerTitleStyle: {
    color: palette.light.text1,
  },
});

export default StackNavigation;
