import React, { useRef, useState } from "react";
import { Dimensions, View, Text } from "react-native";
import { Icon } from "react-native-elements";
import Button from "../../../components/Button";
import Container from "../../../components/Container";
import Modal from "../../../components/Modal";
import TextInput from "../../../components/TextInput";
import Typo from "../../../components/Typo";
import palette from "../../../constants/palette";
import useBoolean, { BooleanHookFunction } from "../../../hooks/useBoolean";
import useString from "../../../hooks/useString";
import { auth } from "../../../services/firebase";
import addUserInFirestore from "../services/addUserInFirestore";
import EmailForm from "./EmailForm";
import PasswordForm from "./PasswordForm";
import RegistrationForm from "./RegistrationForm";

const { width } = Dimensions.get("window");

interface IAuthWithEmail {
  visible: boolean;
  onDismiss: BooleanHookFunction;
}

const AuthWithEmail = (props: IAuthWithEmail) => {
  const { visible, onDismiss } = props;
  if (!visible) return null;
  const emailMatchToAccount = useBoolean();
  const email = useString();

  const onSubmitEmailValueAsync = async (emailValue: string) => {
    await tryCheckIfEmailMatchToAccount(emailValue);
  };
  const tryCheckIfEmailMatchToAccount = async (emailValue: string) => {
    auth
      .fetchSignInMethodsForEmail(emailValue)
      .then((list: Array<string>) => {
        const hasExistingPasswordSigninMethodForThisEmail = () => {
          const found = list.find((method) => method === "password");
          return found ? true : false;
        };
        if (hasExistingPasswordSigninMethodForThisEmail()) {
          emailMatchToAccount.enable();
        } else emailMatchToAccount.disable();
        email.setValue(emailValue);
      })
      .catch(({ message }) => {
        alert(message);
      });
  };

  const onSubmitPasswordValueAsync = async (passwordValue: string) => {
    await tryToSignin(passwordValue);
  };
  const tryToSignin = async (password: string) => {
    await auth
      .signInWithEmailAndPassword(email.value, password)
      .then((userCredential) => {
        let user = userCredential.user;
        console.log(user);
      })
      .catch(({ message }) => {
        alert(message);
      });
  };

  const onSubmitPasswordAndNameValuesAsync = async (
    passwordValue: string,
    nameValue: string
  ) => {
    tryToRegister(passwordValue, nameValue);
  };
  const tryToRegister = async (password: string, name: string) => {
    await auth
      .createUserWithEmailAndPassword(email.value, password)
      .then((userCredential) => {
        let user = userCredential.user;
        console.log(user);
      })
      .catch(({ message }) => {
        alert(message);
      });
  };

  const shouldRenderEmailForm = () => email.virgin;
  const shouldRenderPasswordForm = () => {
    return !emailMatchToAccount.virgin && emailMatchToAccount.value;
  };
  const shouldRenderRegistrationForm = () => {
    return !emailMatchToAccount.virgin && !emailMatchToAccount.value;
  };
  return (
    <Modal visible={visible} onDismiss={onDismiss} animationType="fade">
      {shouldRenderEmailForm() ? (
        <EmailForm
          emailValue={email.value}
          onDismiss={onDismiss}
          onSubmitEmailValueAsync={onSubmitEmailValueAsync}
        />
      ) : null}
      {shouldRenderPasswordForm() ? (
        <PasswordForm
          emailValue={email.value}
          onDismiss={onDismiss}
          onSubmitPasswordValueAsync={onSubmitPasswordValueAsync}
        />
      ) : null}
      {shouldRenderRegistrationForm() ? (
        <RegistrationForm
          emailValue={email.value}
          onDismiss={onDismiss}
          onSubmitPasswordAndNameValuesAsync={
            onSubmitPasswordAndNameValuesAsync
          }
        />
      ) : null}
    </Modal>
  );
};

export default AuthWithEmail;
