import React, { useEffect } from "react";
import { Dimensions, View, Text } from "react-native";
import { Icon } from "react-native-elements";
import Button from "../../components/Button";
import Container from "../../components/Container";
import Typo from "../../components/Typo";
import palette from "../../constants/palette";
import testingZone from "../../utils/testingZone";
import { ActivityIndicator } from "react-native";
import { Image } from "react-native-elements";
import Images from "../../utils/images";
import { useNavigation } from "@react-navigation/core";
import useBoolean, { useVisible } from "../../hooks/useBoolean";
import EmailForm from "./components/EmailForm";
import Modal from "../../components/Modal";
import PasswordForm from "./components/PasswordForm";
import RegistrationForm from "./components/RegistrationForm";
import AuthWithEmail from "./components/AuthWithEmail";
import { auth, firebase } from "../../services/firebase";
import * as Google from "expo-auth-session/providers/google";
import * as Facebook from "expo-auth-session/providers/facebook";
import * as WebBrowser from "expo-web-browser";
import { googleConfig, facebookConfig } from "../../../config/config";
import { ResponseType } from "expo-auth-session";
import { Prompt } from "expo-auth-session";
import { useTheme } from "../../navigation/hooks/ThemeContext";

const { width } = Dimensions.get("window");

WebBrowser.maybeCompleteAuthSession();

const useGoogleSignin = () => {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    expoClientId: googleConfig.expoClientId,
    androidClientId: googleConfig.androidClientId,
    webClientId: googleConfig.webClientId,
    prompt: Prompt.SelectAccount,
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = firebase.auth.GoogleAuthProvider.credential(id_token);
      auth.signInWithCredential(credential);
    }
  }, [response]);
  return { response, request, signin: promptAsync };
};

const useFacebookSignin = () => {
  const [request, response, promptAsync] = Facebook.useAuthRequest({
    expoClientId: facebookConfig.expoClientId,
    androidClientId: facebookConfig.androidClientId,
    webClientId: facebookConfig.webClientId,
    clientId: facebookConfig.clientId,
    prompt: Prompt.SelectAccount,
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;
      const credential = firebase.auth.FacebookAuthProvider.credential(
        access_token
      );
      console.log(credential);
      auth.signInWithCredential(credential);
    }
  }, [response]);
  return { response, request, signin: promptAsync };
};

const OnboardingScreen = () => {
  const navigation = useNavigation();
  const emailForm = useVisible();
  const google = useGoogleSignin();
  const facebook = useFacebookSignin();
  const theme = useTheme();

  return (
    <Container page flex>
      <Container flex center>
        <Container row center>
          <Image
            source={Images.logo}
            style={{ width: 36, height: 36 }}
            PlaceholderContent={<ActivityIndicator />}
          />
        </Container>
        <Container fullWidth>
          <Typo title center style={{ marginVertical: 10 }}>
            Bienvenue sur Todoist
          </Typo>
        </Container>
      </Container>
      <Container row center>
        <Image
          source={Images.onboarding}
          style={{ width: 300, height: 300 }}
          PlaceholderContent={<ActivityIndicator />}
        />
      </Container>
      <Container flex center>
        <Button
          large
          title="CONTINUER AVEC L'E-MAIL"
          onPress={emailForm.show}
          icon={
            <Image
              source={Images.email}
              style={{ width: 18, height: 18, marginHorizontal: 10 }}
              PlaceholderContent={<ActivityIndicator />}
            />
          }
        />
        <Button
          large
          type={"outline"}
          title="CONTINUER AVEC GOOGLE"
          disabled={!google.request}
          onPress={() => {
            google.signin();
          }}
          icon={
            <Image
              source={Images.google}
              style={{ width: 18, height: 18, marginHorizontal: 10 }}
              PlaceholderContent={<ActivityIndicator />}
            />
          }
          buttonStyle={{ borderColor: palette.dark.border }}
          titleStyle={{ color: theme.text1 }}
        />
        <Container row fullWidth spaceBetween>
          <Button
            type={"outline"}
            halfWidth
            onPress={() => {
              alert(JSON.stringify(facebook.response));
            }}
            icon={
              <Image
                source={Images.apple}
                style={{ width: 24, height: 24, marginHorizontal: 10 }}
                PlaceholderContent={<ActivityIndicator />}
              />
            }
            buttonStyle={{ borderColor: palette.dark.border }}
            titleStyle={{ color: palette.dark.text3 }}
          />
          <Button
            halfWidth
            type={"outline"}
            onPress={() => {
              facebook.signin();
            }}
            icon={
              <Image
                source={Images.facebook}
                style={{ width: 24, height: 24, marginHorizontal: 10 }}
                PlaceholderContent={<ActivityIndicator />}
              />
            }
            buttonStyle={{ borderColor: palette.dark.border }}
            titleStyle={{ color: palette.dark.text3 }}
          />
        </Container>
        <Container fullWidth>
          <Typo center c3 style={{ marginVertical: 10 }}>
            Copyright - ©PauseAndPlan
          </Typo>
        </Container>
      </Container>
      <AuthWithEmail visible={emailForm.visible} onDismiss={emailForm.hide} />
    </Container>
  );
};

export default OnboardingScreen;
