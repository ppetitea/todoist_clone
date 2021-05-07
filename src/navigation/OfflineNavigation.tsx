import React from "react";
import { SCREEN_ONBOARDING } from "../constants/navigation";
import { IStackScreen } from "../models/navigation";
import OnboardingScreen from "../screens/OnboardingScreen/OnboardingScreen";
import StackNavigation from "./components/StackNavigation";

const listOfScreens: Array<IStackScreen> = [
  { component: OnboardingScreen, ...SCREEN_ONBOARDING },
];

const OfflineNavigation = () => {
  return <StackNavigation listOfScreens={listOfScreens} />;
};

export default OfflineNavigation;
