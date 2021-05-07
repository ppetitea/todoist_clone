import React, { useRef } from "react";
import { Dimensions, View, Text } from "react-native";
import { Icon } from "react-native-elements";
import Button from "../../../components/Button";
import Container from "../../../components/Container";
import TextInput from "../../../components/TextInput";
import Typo from "../../../components/Typo";
import palette from "../../../constants/palette";
import useBoolean, { BooleanHookFunction } from "../../../hooks/useBoolean";
import { TextInput as PaperTextInput } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";

const { width } = Dimensions.get("window");

interface IPasswordForm {
  emailValue: string;
  onDismiss: BooleanHookFunction;
  onSubmitPasswordValueAsync: (passwordValue: string) => void;
}

const PasswordForm = (props: IPasswordForm) => {
  const { emailValue, onDismiss, onSubmitPasswordValueAsync } = props;
  const secureEntry = useBoolean(true);

  const validationSchema = Yup.object().shape({
    password: Yup.string().min(6).required("Requis"),
  });

  return (
    <Formik
      initialValues={{ password: "" }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        await onSubmitPasswordValueAsync(values.password);
      }}
    >
      {({ handleChange, handleSubmit, values, isValid, isSubmitting }) => (
        <Container page statusBar>
          <Container fullWidth marginV20>
            <Icon
              name="ios-arrow-back"
              type="ionicon"
              size={24}
              containerStyle={{ width: 24 }}
              onPress={onDismiss}
            />
          </Container>
          <Container fullWidth>
            <Typo h2 bold>
              Connectez-vous avec votre mot de passe
            </Typo>
            <Typo h5 d3>
              {`Vous utilisez `}
              <Typo h5 bold d2>
                {emailValue}
              </Typo>
              {` pour vous connecter.`}
            </Typo>
          </Container>
          <Container fullWidth marginV10>
            <TextInput
              autofocus
              label="Mot de passe"
              value={values.password}
              onChangeText={handleChange("password")}
              right={
                <PaperTextInput.Icon
                  name={secureEntry.value ? "eye" : "eye-off"}
                  onPress={secureEntry.toggle}
                />
              }
              secureTextEntry={secureEntry.value}
            />
          </Container>
          <Button
            large
            title="CONNEXION"
            disabled={!isValid || isSubmitting}
            onPress={handleSubmit}
          />
        </Container>
      )}
    </Formik>
  );
};

export default PasswordForm;
