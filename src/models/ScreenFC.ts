import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import RootStackParams from "./RootStackParams";
import ROUTES from "../navigation/routes";
import { DrawerScreenProps } from "@react-navigation/drawer";

type ScreenNavigationProps<T extends keyof RootStackParams> = {
  navigation: StackNavigationProp<RootStackParams, T>;
  route: RouteProp<RootStackParams, T>;
};

export type ScreenFC<S extends keyof RootStackParams> = React.FC<
  ScreenNavigationProps<S>
>;

type CustuomScreenProps<T extends keyof RootStackParams> = {
  navigation: StackNavigationProp<RootStackParams, T>;
};

export type CustomScreenFC<S extends keyof RootStackParams> = React.FC<
  CustuomScreenProps<S>
>;



