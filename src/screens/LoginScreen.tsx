import React from "react";
import { Dimensions, View, Text } from "react-native";
import { Button, ThemeProvider } from "react-native-elements";
import { TextInput } from "react-native-paper";
import palette from "../constants/palette";

const { width } = Dimensions.get("window");

const LoginScreen = () => {
  const email = "pp@gmail.com";
  return (
    <View>
      {/* <View style={styles.container.horizontal}>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>
          Connectez-vous avec votre mot de passe
        </Text>
        <View style={styles.space.vertical} />
        <Text style={styles.text.normal3}>
          Vous utilisez
          <Text style={styles.text.subtitle3}>{` ${email} `}</Text>
          pour vous connecter.
        </Text>
      </View>
      <TextInput
        label="Mot de passe"
        autoFocus={true}
        style={styles.input.text.container}
        mode="outlined"
        value="password"
        secureTextEntry={true}
        onChangeText={() => {}}
      />
      <Button
        title="CONNEXION"
        onPress={() => {}}
        containerStyle={styles.button.large.containerStyle}
        buttonStyle={styles.button.large.buttonStyle}
        titleStyle={styles.button.large.titleStyle}
        // disabled={true}
      /> */}
    </View>
  );
};

export default LoginScreen;
