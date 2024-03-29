import React, { useRef } from "react";
import { Dimensions, View, Text } from "react-native";
import { Icon } from "react-native-elements";
import Button from "../../../components/Button";
import Container from "../../../components/Container";
import TextInput from "../../../components/TextInput";
import Typo from "../../../components/Typo";
import palette from "../../../constants/palette";
import { BooleanHookFunction } from "../../../hooks/useBoolean";
import { Formik } from "formik";
import * as Yup from "yup";

const { width } = Dimensions.get("window");

interface IEmailForm {
  emailValue: string;
  onDismiss: BooleanHookFunction;
  onSubmitEmailValueAsync: (emailValue: string) => void;
}

const EmailForm = (props: IEmailForm) => {
  const { emailValue, onDismiss, onSubmitEmailValueAsync } = props;

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email invalide").required("requis"),
  });
  return (
    <Formik
      initialValues={{ email: emailValue }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        await onSubmitEmailValueAsync(values.email);
      }}
    >
      {({ handleChange, handleSubmit, values, isValid, isSubmitting }) => (
        <Container page statusBar>
          <Container fullWidth marginV20>
            <Icon
              name="close"
              size={24}
              containerStyle={{ width: 24 }}
              onPress={onDismiss}
            />
          </Container>
          <Container fullWidth>
            <Typo h2 bold center>
              Quelle est votre adresse e-mail ?
            </Typo>
          </Container>
          <Container fullWidth marginV10>
            <TextInput
              autofocus
              value={values.email}
              onChangeText={handleChange("email")}
            />
          </Container>
          <Button
            large
            title="CONTINUER AVEC L'E-MAIL"
            disabled={!isValid || isSubmitting}
            onPress={handleSubmit}
          />
        </Container>
      )}
    </Formik>
  );
};

export default EmailForm;
