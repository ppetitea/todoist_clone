import React, { useState } from "react";
import {
  Animated,
  StyleSheet,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  FlatList,
} from "react-native";
import palette from "../../constants/palette";
import { useVisible } from "../../hooks/useBoolean";
import { Modal, Portal, Text, Button, Provider } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { auth } from "../../services/firebase";
import Drawer from "../../components/Drawer/Drawer";
import useDrawer from "../../components/Drawer/hooks/useDrawer";
import Container from "../../components/Container";
import mockData from "./mockData";
import moment from "moment";
import DrawerFlatlistTest from "./DrawerFlatlistTest";

const ResearchAndDevelopScreen = () => {
  return <DrawerFlatlistTest />;
};

const styles = StyleSheet.create({});

export default ResearchAndDevelopScreen;
