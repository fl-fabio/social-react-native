import React, {useState} from 'react';
import { StyleSheet, ImageBackground, Text, StatusBar, Image, View, Button, Linking, SafeAreaView, Platform, TouchableOpacity, Modal, Alert } from 'react-native';
import { CustomScreenFC } from "../models/ScreenFC";
import { useDispatch, useSelector } from "react-redux";
import { AccountProps, logout, removeAccount } from "../redux/actions/accountActions";
import { Colors } from '../models/Colors';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import CustomButton from '../components/CustomButton';

const ProfileScreen : CustomScreenFC<'Profile'> = ({navigation}) => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);

  const { account } = useSelector(
    (state: { accountReducer: AccountProps }) => state.accountReducer
  );

  const supportedURL = "https://google.com";
  const handlePress = async (tel: string) => {
    const supported = await Linking.canOpenURL(supportedURL);
    if (supported) {
      // await Linking.openURL(supportedURL);
      // await Linking.openSettings();
      // await Linking.openURL("mailto:lenda.ortiz@example.com");
      await Linking.openURL(tel);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
         }}>
            <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Are you sure to Delete?</Text>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                dispatch(removeAccount())
                //itemToDelete && dispatch(removeBookmark(itemToDelete));
              }}>
              <Text style={styles.textStyle}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button]}
              onPress={() => {
                setModalVisible(!modalVisible);
                //itemToDelete && dispatch(removeBookmark(itemToDelete));
              }}>
              <Text style={[styles.textStyle, {color: Colors.Third}]}>X</Text>
            </TouchableOpacity>
          </View>
        </View>
        </Modal>
      {modalVisible 
        ? <View style={[StyleSheet.absoluteFillObject, { backgroundColor: Colors.Third, opacity: 0.7 }]} />
        :(<View>
      <ImageBackground
        style={styles.BackgroundImage}
        blurRadius={20}
        source= {require('../../assets/img/gray-gradient.jpg')}
        >
          <View style={styles.Centered}>
            <Image source={{ uri: account.image }} style={styles.userImage} />
            <Text style={styles.NameText}>{account.name} {account.surname}</Text>
            <View style={styles.InformationRow}>
              <View style={{marginRight: 3}}>
                <MaterialIcons 
                  name='place'
                  style={styles.myIcon}
                />
              </View>
              <View>
                <Text style={styles.TextSecondary}>
                  {account.nat} - {account.city}
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
                  {account.date && account.date.toString()}
                </Text>
              </View>
            </View> 
        </View>
      </ImageBackground>
      <View style={styles.externalView}>
        <TouchableOpacity onPress={() => handlePress(`tel:${account.phone}`)}>
          <View style={[styles.InformationRow, {marginTop: 10}]}>
            <MaterialIcons name='phone' style={styles.externalIcon}/>
            <Text>Tel: {account.phone}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress(`mailto:${account.email}`)}>
          <View style={[styles.InformationRow, {marginTop: 10}]}>
            <MaterialIcons name='mail' style={styles.externalIcon}/>
            <Text>Email: {account.email}</Text>
          </View>
        </TouchableOpacity>
      </View>
    
      <View style={{paddingHorizontal: 60, marginTop:60}}>
      <TouchableOpacity 
        onPress={() => dispatch(logout())}
        style ={styles.buttonStyle}>
        <Text style={styles.buttonTextStyle}>
            Logout
        </Text>
        </TouchableOpacity>
        <TouchableOpacity 
        onPress={() => setModalVisible(true)}
        style ={[styles.buttonStyle, {backgroundColor: Colors.Third}]}>
        <Text style={styles.buttonTextStyle}>
            Delete Account
        </Text>
        </TouchableOpacity>
      </View>
      </View>
        )}
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
    backgroundColor: Colors.Fourth,
    padding: 10,
    borderRadius: 20,
    marginBottom: 10
  },
  buttonTextStyle: {
      textAlign: 'center',
      fontWeight: '700',
      fontSize: 14,
      color: Colors.Second
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },

  buttonClose: {
    backgroundColor: Colors.Third,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ProfileScreen;