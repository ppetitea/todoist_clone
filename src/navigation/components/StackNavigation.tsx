import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { IStackScreen } from "../../models/navigation";
import palette from "../../constants/palette";
import { StyleSheet } from "react-native";
import { useTheme } from "../hooks/ThemeContext";
const Stack = createStackNavigator();

type StackNavigationProps = {
  listOfScreens: Array<IStackScreen>;
};

const StackNavigation = ({ listOfScreens }: StackNavigationProps) => {
  const theme = useTheme();
  return (
    <Stack.Navigator>
      {listOfScreens.map((screen: IStackScreen) => {
        return (
          <Stack.Screen
            key={screen.key}
            name={screen.label}
            component={screen.component}
            options={{
              ...screen.options,
              headerStyle: {
                ...styles.headerStyle,
                backgroundColor: theme.bar,
              },
              headerTitleStyle: {
                color: theme.text1,
              },
            }}
          />
        );
      })}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    height: 80,
    elevation: 10,
  },
});

export default StackNavigation;
