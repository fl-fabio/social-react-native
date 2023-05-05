import React, {useEffect, useState} from 'react';
import {Text, ScrollView, StyleSheet, Platform, StatusBar, SafeAreaView, View, Image, TouchableOpacity, TextInput, GestureResponderEvent} from 'react-native';
import { Colors } from '../models/Colors';
import CustomInput from '../components/CustomInput';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CustomButton from '../components/CustomButton';
import { CustomScreenFC } from '../models/ScreenFC';
import { useDispatch, useSelector} from 'react-redux';
import { AccountProps, logout } from "../redux/actions/accountActions";
import { signUp } from '../redux/actions/accountActions';

import * as ImagePicker from "expo-image-picker";
import { Camera, CameraType } from "expo-camera";

const EditProfile: CustomScreenFC<'EditProfile'> = ({navigation}) => {
    const dispatch = useDispatch();
    const { account } = useSelector(
     (state: { accountReducer: AccountProps }) => state.accountReducer
   );

    const [name, setName] = useState<string>(account.name);
    const [surname, setSurname] = useState<string>(account.surname);
    const [nat, setNat] = useState<string>(account.nat);
    const [city, setCity] = useState<string>(account.city);
    const [email, setEmail] = useState<string>(account.email);
    
    const [password, setPassword] = useState<string>(account.password);
    const [phone, setPhone] = useState<string>(account.phone);
    const [date, setDate] = useState(account.date);
    const [open, setOpen] = useState(false);
    const [dateLabel, setDateLabel] = useState('Change Date');
 
    const [image, setImage] = useState<string>(account.image);
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();

    const [clicked, setClicked] = useState<boolean>(false);
    const [emailIsValid, setEmailIsValid] = useState(true);
    const [phoneIsValid, setPhoneIsValid] = useState(true);

    const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    type FormError = {
        name?: string;
        surname?: string;
        image?: string;
        date?: string;
        nat?: string;
        city?: string;
        phone?: string;
        phoneInvalid?: string;
        email?: string;
        mailInvalid?: string;
        password?: string;
      }

    const [error, setError] = useState<FormError>({});

    useEffect(() => {
        const newPhoneIsValid: boolean = phoneRegex.test(phone);
        const newEmailIsValid: boolean = mailRegex.test(email);
        const myDate = new Date()
        const newError = {
            ...(name ? {} : { name: 'Name is required' }),
            ...(surname ? {} : { surname: 'Surname is required' }),
            ...(image ? {} : { image: 'image is required' }),
            ...(date ? {} : { date: 'Date is required' }),
            ...(nat ? {} : { nat: 'Nationality is required' }),
            ...(city ? {} : { city: 'City is required' }),
            ...(phone && newPhoneIsValid ? {} : { phone: 'phone is required' }),
            ...(phone && !newPhoneIsValid ? { phone: 'Invalid phone use 10 numbers' } : {}),
            ...(email && newEmailIsValid ? {} : { email: 'mail is required' }),
            ...(email && !newEmailIsValid ? { email: 'Invalid Email: example mail@mail.it' } : {}),
            ...(password ? {} : { password: 'password is required' }),
          };

        setError(newError);
        
        setPhoneIsValid(newPhoneIsValid);
        setEmailIsValid(newEmailIsValid);

      }, [clicked, phone, name, surname, image, date, nat, city, email, emailIsValid, password]);

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
                    valid={(!clicked || !('name' in error))}
                    errorText={error.name}
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
                    valid={(!clicked || !('surname' in error))}
                    errorText={error.surname}
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
                valid={(!clicked || !('date' in error))}
                errorText={error.date}

            />
   
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
                    valid={(!clicked || !('nat' in error))}
                    errorText={error.nat}
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
                    valid={(!clicked || !('city' in error))}
                    errorText={error.city}
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
                valid={(!clicked || !('phone' in error))}
                errorText={error.phone}
            />
            <CustomInput 
                label={email}
                keyboardType='email-address'
                onChangeText={(value) => {
                    setEmail(value)}}
                icon = {
                    <MaterialCommunityIcons 
                        name='email' 
                        color={Colors.Fourth} 
                        size={25}
                        style={styles.icons}/>}
                valid={(!clicked || !('email' in error))}
                errorText={error.email}
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
                valid={(!clicked || !('password' in error))}
                errorText={error.password}
            />
            <CustomButton 
                label={'Update'} 
                onPress={() => {
                    setClicked(true);
                    Object.keys(error).length === 0 &&
                    dispatch(signUp({name, surname, nat, city, email, password, date, phone, image, isLogged:true})) &&
                    navigation.navigate('Profile');
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