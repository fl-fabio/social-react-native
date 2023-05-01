import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Linking } from 'react-native';
import { CustomScreenFC } from "../models/ScreenFC";
import { useDispatch, useSelector } from "react-redux";
import { AccountProps, logout } from "../redux/actions/accountActions";

const ProfileScreen : CustomScreenFC<'Profile'> = ({navigation}) => {
  const dispatch = useDispatch();

  const { account } = useSelector(
    (state: { accountReducer: AccountProps }) => state.accountReducer
  );

  const supportedURL = "https://google.com";
  const handlePress = async () => {
    const supported = await Linking.canOpenURL(supportedURL);
    if (supported) {
      // await Linking.openURL(supportedURL);
      // await Linking.openSettings();
      // await Linking.openURL("mailto:lenda.ortiz@example.com");
      await Linking.openURL("tel:(257)832-5149");
    }
  };

  return (
    <View style={styles.container}>
      <Text>Email: {account.email}</Text>
      <Text>Logged: {String(account?.isLogged)} ?</Text>

      <Button title="Open Link" color="blue" onPress={handlePress} />
      <Button title="Logout" color="blue" onPress={() => dispatch(logout())} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ProfileScreen;