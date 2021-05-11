import {
  firebaseDevConfig,
  googleDevConfig,
  facebookDevConfig,
} from "./config.local";

const firebaseConfig = firebaseDevConfig;
const googleConfig = {
  expoClientId: googleDevConfig.expoClientId,
  iosClientId: googleDevConfig.iosClientId,
  androidClientId: googleDevConfig.androidClientId,
  webClientId: googleDevConfig.webClientId,
};
const facebookConfig = {
  expoClientId: facebookDevConfig.expoClientId,
  iosClientId: facebookDevConfig.iosClientId,
  androidClientId: facebookDevConfig.androidClientId,
  webClientId: facebookDevConfig.webClientId,
  clientId: facebookDevConfig.clientId,
};

export { firebaseConfig, googleConfig, facebookConfig };
