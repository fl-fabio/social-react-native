import React, {useEffect, useState} from 'react';
import {Text, ScrollView, StyleSheet, Platform, StatusBar, SafeAreaView, View, Image, TouchableOpacity, TextInput, GestureResponderEvent} from 'react-native';
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
    const [name, setName] = useState<string>('');
    const [surname, setSurname] = useState<string>('');
    const [nat, setNat] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [emailIsValid, setEmailIsValid] = useState(true);
    const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const [password, setPassword] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [dateLabel, setDateLabel] = useState('Date of Birth');
    const [user, setUser] = useState<User>();
    const [clicked, setClicked] = useState<boolean>(false);

    const [image, setImage] = useState<string>('');
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
  
  
    

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
    const [error, setError] = useState<FormError>({})

    
    
    useEffect(() => {
        const newPhoneIsValid: boolean = phoneRegex.test(phone);
        const newEmailIsValid: boolean = mailRegex.test(email);
        const myDate = new Date()
        const newError = {
            ...(name ? {} : { name: 'Name is required' }),
            ...(surname ? {} : { surname: 'Surname is required' }),
            ...(image ? {} : { image: 'image is required' }),
            ...(date.getFullYear() === myDate.getFullYear() ? { date: 'Date is required' }: {}),
            ...(nat ? {} : { nat: 'Nationality is required' }),
            ...(city ? {} : { city: 'City is required' }),
            ...(phone && newPhoneIsValid ? {} : { phone: 'phone is required' }),
            ...(phone && !newPhoneIsValid ? { phone: 'Invalid phone use 10 numbers' } : {}),
            ...(email && newEmailIsValid ? {} : { email: 'mail is required' }),
            ...(email && !newEmailIsValid ? { email: 'Invalid Email: example mail@mail.it' } : {}),
            ...(password ? {} : { password: 'password is required' }),
          };
          console.log(!!newPhoneIsValid, !!phone )
          setError(newError);
        
        setPhoneIsValid(newPhoneIsValid);
        setEmailIsValid(newEmailIsValid);

        console.log(date.getFullYear(),'-' ,myDate.getFullYear())
      }, [clicked, phone, name, surname, image, date, nat, city, email, emailIsValid, password]);
    //useEffect(()=> handleSubmit, [name, surname, image, date, nat, city, phone, phoneIsValid, email, emailIsValid, password])
    //console.log(error)
     //   console.log(!phone);
    console.log(error)
    
      console.log(date.getMonth(),)
    

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
            <View style={styles.addressView}>
                <CustomInput 
                    label={'Name'}
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
                    label={'Surname'}
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
            {/* <TouchableOpacity onPress={() =>{ handleSubmit(); console.log(handleSubmit())}}>
                <Text>Verifica</Text>
            </TouchableOpacity> */}
            <View style={styles.toLoginView}>
                <Text>Insert an image...</Text>
                <TouchableOpacity onPress={pickImage}>
                    <Text style={styles.toLoginText}>Click</Text>
                </TouchableOpacity>
                
            </View>
            {(clicked && ('image' in error)) && 
                <View style={styles.invalidView}>
                    <Text style={styles.invalidText}>error.image</Text>
                </View>}
            <View style={{alignItems: 'center', marginBottom: 15}}>
                {image && (
                    <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
                )}
            </View>
           
            
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
                valid={(!clicked || !('date' in error))}
                errorText={error.date}
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
                    valid={(!clicked || !('nat' in error))}
                    errorText={error.nat}
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
                    valid={(!clicked || !('city' in error))}
                    errorText={error.city}
                />
            </View>
            
            <CustomInput 
                label={'Phone'}
                key={'phone-pad'}
                onChangeText={(value) => 
                    {setPhone(value)
                    }}
                icon = {
                    <MaterialCommunityIcons 
                        name='phone' 
                        color={Colors.Fourth} 
                        size={25}
                        style={styles.icons}/>}
                //onBlur={() => (clicked && phone && phoneRegex.test(phone)) ? setPhoneIsValid(true) : setPhoneIsValid(false)}
                valid={(!clicked || !('phone' in error))}
                errorText={error.phone}
            />
            <CustomInput 
                label={'Email'}
                keyboardType='email-address'
                onChangeText={(value) => {
                    setEmail(value)}}
                onBlur={() => (email && (email === '' || mailRegex.test(email))) ? setEmailIsValid(true) : setEmailIsValid(false)}
                icon = {
                    <MaterialCommunityIcons 
                        name='email' 
                        color={Colors.Fourth} 
                        size={25}
                        style={styles.icons}/>}
                valid={(!clicked || !('email' in error))}
                errorText={error.email}
            />
            <TouchableOpacity onPress={()=> setClicked(!clicked)} ><Text>Click</Text></TouchableOpacity>
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
                valid={(!clicked || !('password' in error))}
                errorText={error.password}
            />
            <CustomButton 
                label={'Register'} 
                onPress={() => {
                    setClicked(true);
                    Object.keys(error).length === 0 &&
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
    },
    invalidView: {
        alignItems: 'center'
    },
    invalidText: {
        color: Colors.Third,
        fontSize: 10,
        marginTop: -10,
      }
})

export default SignUp