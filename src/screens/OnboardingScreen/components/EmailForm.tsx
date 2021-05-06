import React, { useRef } from "react";
import { Dimensions, View, Text } from "react-native";
import { Icon } from "react-native-elements";
import Button from "../../../components/Button";
import Container from "../../../components/Container";
import TextInput from "../../../components/TextInput";
import Typo from "../../../components/Typo";
import palette from "../../../constants/palette";
import { BooleanHookFunction } from "../../../hooks/useBoolean";

const { width } = Dimensions.get("window");

interface IEmailForm {
  onDismiss: BooleanHookFunction;
}

const EmailForm = (props: IEmailForm) => {
  const { onDismiss } = props;

  return (
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
        <TextInput autofocus value="" onChangeText={() => {}} />
      </Container>
      <Button large title="CONTINUER AVEC L'E-MAIL" onPress={() => {}} />
    </Container>
  );
};

export default EmailForm;
