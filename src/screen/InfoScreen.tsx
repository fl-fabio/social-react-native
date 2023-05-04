import React, {useState} from 'react';
import { StyleSheet, ImageBackground, Text, StatusBar, Image, View, Button, Linking, SafeAreaView, Platform, TouchableOpacity } from 'react-native';
import { CustomScreenFC } from "../models/ScreenFC";
import { useDispatch, useSelector } from "react-redux";
import { AccountProps, logout } from "../redux/actions/accountActions";
import { Colors } from '../models/Colors';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import CustomButton from '../components/CustomButton';

const InfoScreen : CustomScreenFC<'Profile'> = ({navigation}) => {
  


  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.BackgroundImage}
        blurRadius={20}
        source= {require('../../assets/img/code.jpg')}
        >
          <View style={styles.Centered}>
            <Image source={require('../../assets/img/myPhoto.jpg')} style={styles.userImage} />
            <Text style={styles.NameText}>Fabio Lanzafame</Text>
            <View style={styles.InformationRow}>
              <View style={{marginRight: 3}}>
                <MaterialIcons 
                  name='place'
                  style={styles.myIcon}
                />
              </View>
              <View>
                <Text style={styles.TextSecondary}>
                  ITA - Catania
                </Text>
              </View>
            </View>
            <View style={styles.InformationRow}>
              <View style={{marginRight: 3}}>
                <FontAwesome 
                  name='birthday-cake'
                  style={styles.myIcon}
                />
              </View>
              <View>
                <Text style={styles.TextSecondary}>
                  03/08/1980
                </Text>
              </View>
            </View> 
        </View>
      </ImageBackground>
      <View style={styles.externalView}>
 
          <View style={[styles.InformationRow, {marginTop: 10}]}>
            <MaterialIcons name='phone' style={styles.externalIcon}/>
            <Text>Tel: 3395389146</Text>
          </View>

          <View style={[styles.InformationRow, {marginTop: 10}]}>
            <MaterialIcons name='mail' style={styles.externalIcon}/>
            <Text>Email: fabio.lanzafame0308@gmail.com </Text>
          </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: Colors.First,
  },
  BackgroundImage: {
    paddingVertical: 20,
  },
  Centered: {
    alignItems: 'center',
  },
  userImage: {
    borderColor: Colors.First,
    borderRadius: 90,
    borderWidth: 3,
    height: 180,
    width: 180,
    marginBottom: 10,
  },
  NameText: {
    color: Colors.Default,
    fontSize: 22,
    fontWeight: '400',
    paddingBottom: 8,
    textAlign: 'center',
  },
  InformationRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 7,
  },
  myIcon: {
    color: Colors.Default,
    fontSize: 16,
  },
  TextSecondary: {
    color: Colors.First,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '400'
  },
  externalIcon: {
    fontSize: 28,
    color: Colors.Third,
    marginRight: 10
  },
  externalView: {
    paddingHorizontal: 30,
    marginTop: 20,
  },
  buttonStyle : {
    backgroundColor: Colors.Third,
    padding: 10,
    borderRadius: 20,
    marginTop: 60,

},
buttonTextStyle: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 14,
    color: Colors.Second
}
});

export default InfoScreen;