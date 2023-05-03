import React, {useState} from 'react';
import {Text, ScrollView, StyleSheet, Platform, StatusBar, SafeAreaView, View, Image, TouchableOpacity, TextInput} from 'react-native';
import { Colors } from '../models/Colors';
import CustomInput from '../components/CustomInput';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CustomButton from '../components/CustomButton';
import { ScreenFC } from '../models/ScreenFC';
import { useDispatch } from 'react-redux';
import { signUp } from '../redux/actions/accountActions';
import { User } from '../models/User';

import * as ImagePicker from "expo-image-picker";
import { Camera, CameraType } from "expo-camera";


const SignUp: ScreenFC<'SignUp'> = ({navigation}) => {

    const [phoneIsValid, setPhoneIsValid] = useState(true);
    const phoneRegex = /^\d{10}$/;
    const [name, setName] = useState<string>();
    const [surname, setSurname] = useState<string>();
    const [nat, setNat] = useState<string>();
    const [city, setCity] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [emailIsValid, setEmailIsValid] = useState(true);
    const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const [password, setPassword] = useState<string>();
    const [phone, setPhone] = useState<string>();
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [dateLabel, setDateLabel] = useState('Date of Birth');
    const [user, setUser] = useState<User>();

    const [image, setImage] = useState<string>();
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
  
    
    

    const pickImage = async () => {
        ImagePicker.requestMediaLibraryPermissionsAsync
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        if (result.assets) {
          setImage(result.assets[0].uri);
        }
      };

   const dispatch = useDispatch();


  return (
    <SafeAreaView style={styles.container}>
        <ScrollView
        showsVerticalScrollIndicator={false}
        style={{paddingHorizontal: 25}}>
            <View style={styles.centeredImg}>
                <Image 
                    source={require('../../assets/img/registration.png')}
                    style={{width: 200, height: 200}}
                />
            </View>
            <Text style={styles.headingText}>Register</Text>
            <CustomInput 
                label={'Name'}
                onChangeText={(value)=> setName(value)}
                icon = {
                    <MaterialCommunityIcons 
                        name='face-man' 
                        color={Colors.Fourth} 
                        size={25}
                        style={styles.icons}/>}
            />
            <View style={styles.toLoginView}>
                <Text>Insert an image...</Text>
                <TouchableOpacity onPress={pickImage}>
                    <Text style={styles.toLoginText}>Click</Text>
                </TouchableOpacity>
                {image && (
                <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
            )}
            </View>
           
            <CustomInput 
                label={'Surname'}
                onChangeText={(value)=> setSurname(value)}
                icon = {
                    <MaterialCommunityIcons 
                        name='face-man' 
                        color={Colors.Fourth} 
                        size={25}
                        style={styles.icons}/>}
            />
            <CustomInput 
                label={'Date of Birthday'}
                inputType='date'
                icon = {
                    <MaterialIcons
                        name='date-range' 
                        color={Colors.Fourth} 
                        size={25}
                        style={styles.icons}/>}
                fieldButtonLabel={dateLabel}
                fieldButtonFunction={() => setOpen(true)}

            />
            {/* <TouchableOpacity onPress={() => setOpen(true)}>
                <Text>{dateLabel}</Text>
            </TouchableOpacity> */}
            <DateTimePickerModal 
                isVisible={open}
                mode='date'
                onConfirm={(mydate) => {
                    setOpen(false);
                    setDate(mydate);
                    setDateLabel(mydate.toDateString());
                }}
                onCancel={() => setOpen(false)}
            />
            <View style={styles.addressView}>
                <CustomInput 
                    label={'Nationality'}
                    onChangeText={(value)=> setNat(value)}
                    icon = {
                        <MaterialCommunityIcons 
                            name='home-city-outline' 
                            color={Colors.Fourth} 
                            size={25}
                            style={styles.icons}/>}
                />
                <CustomInput 
                    label={'City'}
                    onChangeText={(value)=> setCity(value)}
                    icon = {
                        <MaterialCommunityIcons 
                            name='city' 
                            color={Colors.Fourth} 
                            size={25}
                            style={styles.icons}/>}
                />
            </View>
            
            <CustomInput 
                label={'Phone'}
                key={'phone-pad'}
                onChangeText={(value) => 
                    {
                        setPhone(value);
                        (value === '' || phoneRegex.test(value)) ? setPhoneIsValid(true) : setPhoneIsValid(false)}
                    }
                    
                icon = {
                    <MaterialCommunityIcons 
                        name='phone' 
                        color={Colors.Fourth} 
                        size={25}
                        style={styles.icons}/>}
                onEndEditing={(value) => (value === '' || phoneRegex.test(value)) ? setPhoneIsValid(true) : setPhoneIsValid(false)}
                valid={phoneIsValid}
            />
            <CustomInput 
                label={'Email'}
                keyboardType='email-address'
                valid = {emailIsValid}
                onChangeText={(value) => {
                    setEmail(value);
                    mailRegex.test(value) ? setEmailIsValid(true) : setEmailIsValid(false)}   
                }
                icon = {
                    <MaterialCommunityIcons 
                        name='email' 
                        color={Colors.Fourth} 
                        size={25}
                        style={styles.icons}/>}
            />
            <CustomInput 
                label={'Password'}
                inputType={'password'}
                onChangeText={(value) => setPassword(value)}
                icon = {
                    <MaterialCommunityIcons 
                        name='form-textbox-password' 
                        color={Colors.Fourth} 
                        size={25}
                        style={styles.icons}/>}
            />
            <CustomButton 
                label={'Register'} 
                onPress={() => {
                    (name && surname && nat && city && email && password && date && phone && image) &&
                    dispatch(signUp({name, surname, nat, city, email, password, date, phone, image, isLogged:true}));
                  }} />
            <View style={styles.toLoginView}>
                <Text>Already registered?</Text>
                <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
                    <Text style={styles.toLoginText}>Login</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.First,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        paddingHorizontal: 25,
    },
    centeredImg: {
        marginTop: 20,
        alignItems: 'center',
    },
    headingText: {
        marginTop: 20,
        fontSize: 28,
        fontWeight: '500',
        color: '#333',
        marginBottom: 10,
    },
    icons: {
        marginRight: 5
    },
    addressView: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    dateButton: {
        color: Colors.Third,
        marginLeft: 5,
        marginTop: 5
    },
    toLoginView: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20
    },
    toLoginText: {
        color: Colors.Third,
        fontWeight: '700',
        marginLeft: 5,
    }
})

export default SignUp