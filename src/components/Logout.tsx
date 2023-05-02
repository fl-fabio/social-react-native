import React from "react";
import { Text } from "react-native";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { useDispatch } from "react-redux";
import { logout } from "../redux/actions/accountActions";
import RootStackParams from "../models/RootStackParams";
import { CustomScreenFC } from "../models/ScreenFC";



const LogOut: CustomScreenFC<'Logout'>= ({ navigation }) => {
  const dispatch = useDispatch();
  dispatch(logout());
  navigation.navigate("Login");
  return <Text>Logging out...</Text>;
};

export default LogOut;