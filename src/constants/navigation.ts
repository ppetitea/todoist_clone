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

export const NAVIGATION_SECURE = {
  key: "NAVIGATION_SECURE",
  screens: [SCREEN_HOME],
};
