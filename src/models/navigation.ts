import { StackNavigationOptions } from "@react-navigation/stack";
import { ComponentType } from "react";

export interface IStackScreen {
  key: string;
  label: string;
  component: ComponentType;
  options: undefined | StackNavigationOptions;
}

export interface IStackNavigation {
  key: string;
  screens: Array<{ key: string; label: string }>;
  component: ComponentType;
}
