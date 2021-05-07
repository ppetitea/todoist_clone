export const SCREEN_ONBOARDING = {
  key: "SCREEN_ONBOARDING",
  label: "Welcome",
  options: { headerShown: false },
};
export const SCREEN_LOGIN = {
  key: "SCREEN_LOGIN",
  label: "Login",
  options: { headerShown: false },
};
export const SCREEN_SIGNIN = {
  key: "SCREEN_SIGNIN",
  label: "Signin",
  options: { headerShown: false },
};

export const NAVIGATION_OFFLINE = {
  key: "NAVIGATION_OFFLINE",
  screens: [SCREEN_ONBOARDING, SCREEN_LOGIN, SCREEN_SIGNIN],
};

export const SCREEN_HOME = { key: "SCREEN_HOME", label: "Home" };

export const NAVIGATION_SECURE = {
  key: "NAVIGATION_SECURE",
  screens: [SCREEN_HOME],
};