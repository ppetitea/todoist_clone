import React from "react";
import { Dimensions, View } from "react-native";
import Container from "../../../components/Container";
import { Icon } from "react-native-elements";
import { useTheme } from "../../../navigation/hooks/ThemeContext";
import Typo from "../../../components/Typo";
import { moment } from "../../../services";

const { width, height } = Dimensions.get("window");

export interface ITodoItem {
  id: string;
  title: string;
  deadline?: Date;
  projectLabel: string;
}

const TodoItem = ({ id, title, deadline, projectLabel }: ITodoItem) => {
  const theme = useTheme();

  return (
    <Container row marginV10 style={{ marginLeft: 20 }}>
      <View
        style={{
          borderWidth: 1,
          borderColor: theme.text2,
          borderRadius: 50,
          width: 20,
          height: 20,
          margin: 2,
          marginRight: 10,
        }}
      />
      <Container flex style={{ marginRight: 20 }}>
        <Container row>
          <Typo h4 flex>
            {title}
          </Typo>
        </Container>
        <Container row spaceBetween marginV5>
          <Container row>
            <Icon name="today" size={16} color={theme.primary} />
            <Typo h6 primary marginH5>
              {moment(deadline).format("DD MMMM")}
            </Typo>
          </Container>
          <Container row>
            <Typo h6 marginH5>
              {projectLabel}
            </Typo>
            <View
              style={{
                backgroundColor: theme.primary,
                borderRadius: 50,
                width: 8,
                height: 8,
                margin: 2,
                alignSelf: "center",
              }}
            />
          </Container>
        </Container>
      </Container>
    </Container>
  );
};

export default TodoItem;
