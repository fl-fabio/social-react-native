import React, {useState} from 'react';
import {Text, ScrollView, StyleSheet, Platform, StatusBar, SafeAreaView, View, Image, TouchableOpacity} from 'react-native';
import { Colors } from '../models/Colors';
import CustomInput from '../components/CustomInput';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CustomButton from '../components/CustomButton';
import { ScreenFC } from '../models/ScreenFC';


const SignUp: ScreenFC<'SignUp'> = ({navigation}) => {

    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [dateLabel, setDateLabel] = useState('Date of Birth');
    console.log(date);
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
                icon = {
                    <MaterialCommunityIcons 
                        name='face-man' 
                        color={Colors.Fourth} 
                        size={25}
                        style={styles.icons}/>}
            />
            <CustomInput 
                label={'Surname'}
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
                onConfirm={(date) => {
                    setOpen(false);
                    setDate(date);
                    setDateLabel(date.toDateString());
                }}
                onCancel={() => setOpen(false)}
            />
            <View style={styles.addressView}>
                <CustomInput 
                    label={'Nationality'}
                    icon = {
                        <MaterialCommunityIcons 
                            name='home-city-outline' 
                            color={Colors.Fourth} 
                            size={25}
                            style={styles.icons}/>}
                />
                <CustomInput 
                    label={'City'}
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
                icon = {
                    <MaterialCommunityIcons 
                        name='phone' 
                        color={Colors.Fourth} 
                        size={25}
                        style={styles.icons}/>}
            />
            <CustomInput 
                label={'Email'}
                keyboardType='email-address'
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
                icon = {
                    <MaterialCommunityIcons 
                        name='form-textbox-password' 
                        color={Colors.Fourth} 
                        size={25}
                        style={styles.icons}/>}
            />
            <CustomButton label={'Register'} onPress={()=> {}} />
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
