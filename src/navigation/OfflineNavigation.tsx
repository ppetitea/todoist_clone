import React from "react";
import {
  SCREEN_LOGIN,
  SCREEN_ONBOARDING,
  SCREEN_SIGNIN,
} from "../constants/navigation";
import { IStackScreen } from "../models/navigation";
import LoginScreen from "../screens/LoginScreen";
import OnboardingScreen from "../screens/OnboardingScreen/OnboardingScreen";
import SigninScreen from "../screens/SigninScreen";
import StackNavigation from "./components/StackNavigation";

const listOfScreens: Array<IStackScreen> = [
  { component: OnboardingScreen, ...SCREEN_ONBOARDING },
  { component: LoginScreen, ...SCREEN_LOGIN },
  { component: SigninScreen, ...SCREEN_SIGNIN },
];

const OfflineNavigation = () => {
  return <StackNavigation listOfScreens={listOfScreens} />;
};

export default OfflineNavigation;
