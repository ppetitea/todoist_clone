import React from "react";
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

const { width } = Dimensions.get("window");

const OnboardingScreen = () => {
  const navigation = useNavigation();
  const emailForm = useVisible();

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
          onPress={() => {}}
          icon={
            <Image
              source={Images.google}
              style={{ width: 18, height: 18, marginHorizontal: 10 }}
              PlaceholderContent={<ActivityIndicator />}
            />
          }
          buttonStyle={{ borderColor: palette.dark.border }}
          titleStyle={{ color: palette.dark.text3 }}
        />
        <Container row fullWidth spaceBetween>
          <Button
            type={"outline"}
            halfWidth
            onPress={() => {}}
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
            onPress={() => {}}
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
          <Typo center d3 style={{ marginVertical: 10 }}>
            Copyright - ©PauseAndPlan
          </Typo>
        </Container>
      </Container>
      <AuthWithEmail visible={emailForm.visible} onDismiss={emailForm.hide} />
    </Container>
  );
};

export default OnboardingScreen;
