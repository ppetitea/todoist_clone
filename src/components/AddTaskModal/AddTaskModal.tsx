import React, { useState } from "react";
import { Dimensions, TextInput } from "react-native";
import { Modal, Portal } from "react-native-paper";
import Container from "../Container";
import { Icon } from "react-native-elements";
import { useTheme } from "../../navigation/hooks/ThemeContext";
import TagButton from "../../screens/TodayScreen/components/TagButton";
import useString from "../../hooks/useString";
import { Formik } from "formik";
import Task from "../../models/Task";
import { auth } from "../../services/firebase";
import addTaskToFirestore, { ITaskFields } from "./services/AddTaskToFirestore";

export interface AddTaskModalProps {
  visible: boolean;
  onDismiss: () => void;
}

const AddTodoModal = (props: AddTaskModalProps) => {
  const { visible, onDismiss } = props;
  if (!visible) return null;

  const theme = useTheme();

  const input = useString("");
  const isInputValid = () => !input.isEmpty();

  const onSubmit = (values: ITaskFields) => {
    if (auth.currentUser?.uid) {
      const task = new Task({ ...values, userId: auth.currentUser?.uid });
      addTaskToFirestore({ ...task });
    } else {
      console.log("firebase auth has no currentUser attribut");
    }
  };

  const task = new Task();

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        style={{ justifyContent: "flex-end" }}
      >
        <Formik
          initialValues={task.toFormikInitialValues()}
          validationSchema={task.toFormikValidationSchema()}
          onSubmit={onSubmit}
        >
          {({ values, handleChange, isValid, handleSubmit, errors }) => {
            return (
              <Container
                style={{
                  backgroundColor: theme.surface2,
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                  borderTopLeftRadius: theme.roundness,
                  borderTopRightRadius: theme.roundness,
                }}
              >
                <TextInput
                  placeholder={"ex: Dejeuner en famille dimanche a midi"}
                  placeholderTextColor={theme.text3}
                  value={values.title}
                  onChangeText={handleChange("title")}
                  autoFocus={true}
                  style={{ color: theme.text1, fontSize: 18 }}
                />
                <Container row marginV5>
                  <TagButton
                    title="Aujourd'hui"
                    titleColor={theme.success}
                    iconName="today"
                    iconColor={theme.success}
                  />
                  <TagButton
                    title="Boite de reception"
                    iconName="inbox"
                    iconColor={theme.info}
                  />
                </Container>
                <Container row spaceBetween>
                  <Container row spaceBetween style={{ width: 200 }}>
                    <Icon
                      name="ios-pricetag-outline"
                      type="ionicon"
                      color={theme.text2}
                    />
                    <Icon
                      name="ios-flag-outline"
                      type="ionicon"
                      color={theme.text2}
                    />
                    <Icon
                      name="ios-alarm-outline"
                      type="ionicon"
                      color={theme.text2}
                    />
                    <Icon
                      name="chatbox-outline"
                      type="ionicon"
                      color={theme.text2}
                    />
                  </Container>
                  <Icon
                    name="ios-send-outline"
                    type="ionicon"
                    color={isValid ? theme.text1 : theme.text3}
                    size={20}
                    onPress={isValid ? () => handleSubmit() : undefined}
                    iconStyle={{ padding: 4 }}
                  />
                </Container>
              </Container>
            );
          }}
        </Formik>
      </Modal>
    </Portal>
  );
};

export default AddTodoModal;
