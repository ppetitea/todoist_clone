import React from "react";
import { SCREEN_LOGIN, SCREEN_SIGNIN } from "../constants/navigation";
import { IStackScreen } from "../models/navigation";
import LoginScreen from "../screens/LoginScreen";
import SigninScreen from "../screens/SigninScreen";
import StackNavigation from "./components/StackNavigation";

const SCREEN_LIST: Array<IStackScreen> = [
  { ...SCREEN_LOGIN, component: LoginScreen, options: undefined },
  { ...SCREEN_SIGNIN, component: SigninScreen, options: undefined },
];

const OfflineNavigation = () => {
  return <StackNavigation listOfScreens={SCREEN_LIST} />;
};

export default OfflineNavigation;
