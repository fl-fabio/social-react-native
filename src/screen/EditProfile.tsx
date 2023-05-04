import React, {useState} from 'react';
import {Text, ScrollView, StyleSheet, Platform, StatusBar, SafeAreaView, View, Image, TouchableOpacity, TextInput, GestureResponderEvent} from 'react-native';
import { Colors } from '../models/Colors';
import CustomInput from '../components/CustomInput';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CustomButton from '../components/CustomButton';
import { CustomScreenFC } from '../models/ScreenFC';
import { useDispatch, useSelector } from 'react-redux';
import { AccountProps, logout } from "../redux/actions/accountActions";
import { signUp } from '../redux/actions/accountActions';
import { User } from '../models/User';

import * as ImagePicker from "expo-image-picker";
import { Camera, CameraType } from "expo-camera";


const EditProfile: CustomScreenFC<'EditProfile'> = ({navigation}) => {
    const dispatch = useDispatch();
    const { account } = useSelector(
     (state: { accountReducer: AccountProps }) => state.accountReducer
   );
    
    const [phoneIsValid, setPhoneIsValid] = useState(true);
    const phoneRegex = /^\d{10}$/;
    const [name, setName] = useState<string>(account.name);
    const [surname, setSurname] = useState<string>(account.surname);
    const [nat, setNat] = useState<string>(account.nat);
    const [city, setCity] = useState<string>(account.city);
    const [email, setEmail] = useState<string>(account.email);
    const [emailIsValid, setEmailIsValid] = useState(true);
    const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const [password, setPassword] = useState<string>(account.password);
    const [phone, setPhone] = useState<string>(account.phone);
    const [date, setDate] = useState(account.date);
    const [open, setOpen] = useState(false);
    const [dateLabel, setDateLabel] = useState('Change Date');
    const [user, setUser] = useState<User>();

    const [image, setImage] = useState<string>(account.image);
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
  
    const [error, setError] = useState({})

    const handleSubmit = (event: GestureResponderEvent) => {
        event.preventDefault();
        
        const newError = {
          ...(name ? {} : { name: 'Name is required' }),
          ...(surname ? {} : { surname: 'Surname is required' }),
          ...(image ? {} : { image: 'image is required' }),
          ...(date ? {} : { date: 'Date is required' }),
          ...(nat ? {} : { nat: 'Nationality is required' }),
          ...(city ? {} : { city: 'City is required' }),
          ...(phone ? {} : { phone: 'phone is required' }),
          ...(phoneIsValid ? {} : { phoneInvalid: 'Invalid phone use 10 numbers' }),
          ...(email ? {} : { email: 'mail is required' }),
          ...(emailIsValid ? {} : { mailInvalid: 'Invalid Email: example mail@mail.it' }),
          ...(password ? {} : { password: 'password is required' }),
        };
        
        setError(newError);
      };

    

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

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView
        showsVerticalScrollIndicator={false}
        style={{paddingHorizontal: 25}}>
            <View style={styles.centeredImg}>
                <Image 
                    source={{ uri: image }}
                    style={{width: 200, height: 200}}
                />
            </View>
            <View style={styles.toLoginView}>
                <Text>Change Image...</Text>
                <TouchableOpacity onPress={pickImage}>
                    <Text style={styles.toLoginText}>Click</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.addressView}>
                <CustomInput 
                    label={name}
                    onChangeText={(value)=> setName(value)}
                    icon = {
                        <MaterialCommunityIcons 
                            name='face-man' 
                            color={Colors.Fourth} 
                            size={25}
                            style={styles.icons}/>}
                />
                <CustomInput 
                    label={surname}
                    onChangeText={(value)=> setSurname(value)}
                    icon = {
                        <MaterialCommunityIcons 
                            name='face-man' 
                            color={Colors.Fourth} 
                            size={25}
                            style={styles.icons}/>}
                />
            </View>
            <CustomInput 
                label={date.toString()}
                inputType='date'
                icon = {
                    <MaterialIcons
                        name='date-range' 
                        color={Colors.Fourth} 
                        size={25}
                        style={styles.icons}/>}
                fieldButtonLabel={date.toString().slice(0,10)}
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
                    label={nat}
                    onChangeText={(value)=> setNat(value)}
                    icon = {
                        <MaterialCommunityIcons 
                            name='home-city-outline' 
                            color={Colors.Fourth} 
                            size={25}
                            style={styles.icons}/>}
                />
                <CustomInput 
                    label={city}
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
                label={phone}
                key={'phone-pad'}
                onChangeText={(value) => 
                    {setPhone(value)}}
                icon = {
                    <MaterialCommunityIcons 
                        name='phone' 
                        color={Colors.Fourth} 
                        size={25}
                        style={styles.icons}/>}
                onBlur={() => (phone && phoneRegex.test(phone)) ? setPhoneIsValid(true) : setPhoneIsValid(false)}
                valid={phoneIsValid}
            />
            <CustomInput 
                label={email}
                keyboardType='email-address'
                valid = {emailIsValid}
                onChangeText={(value) => {
                    setEmail(value)}}
                onBlur={() => (email && (email === '' || mailRegex.test(email))) ? setEmailIsValid(true) : setEmailIsValid(false)}
                icon = {
                    <MaterialCommunityIcons 
                        name='email' 
                        color={Colors.Fourth} 
                        size={25}
                        style={styles.icons}/>}
            />
            <CustomInput 
                label={password}
                /* inputType={'password'} */
                onChangeText={(value) => setPassword(value)}
                icon = {
                    <MaterialCommunityIcons 
                        name='form-textbox-password' 
                        color={Colors.Fourth} 
                        size={25}
                        style={styles.icons}/>}
            />
            <CustomButton 
                label={'Update'} 
                onPress={() => {
                    (name && surname && nat && city && email && password && date && phone && image) &&
                    dispatch(signUp({name, surname, nat, city, email, password, date, phone, image, isLogged:true}));
                  }} />
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
        marginBottom: 20,
        marginTop: 20,
    },
    toLoginText: {
        color: Colors.Third,
        fontWeight: '700',
        marginLeft: 5,
    }
})

export default EditProfile