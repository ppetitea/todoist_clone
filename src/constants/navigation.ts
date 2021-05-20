export const SCREEN_ONBOARDING = {
  key: "SCREEN_ONBOARDING",
  label: "Welcome",
  options: { headerShown: false },
};

export const NAVIGATION_OFFLINE = {
  key: "NAVIGATION_OFFLINE",
  screens: [SCREEN_ONBOARDING],
};

export const SCREEN_HOME = { key: "SCREEN_HOME", label: "Home" };
export const SCREEN_TODAY = { key: "SCREEN_TODAY", label: "Aujourd'hui" };
export const SCREEN_DEVELOP = { key: "SCREEN_DEVELOP", label: "Develop" };

export const NAVIGATION_SECURE = {
  key: "NAVIGATION_SECURE",
  screens: [SCREEN_DEVELOP, SCREEN_TODAY],
};
