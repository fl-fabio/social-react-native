import React, {useState} from 'react';
import {Text, StyleSheet, Platform, StatusBar, SafeAreaView, View, Image, TouchableOpacity} from 'react-native';
import { Colors } from '../models/Colors';
import CustomInput from '../components/CustomInput';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import DatePicker from 'react-native-date-picker';


const RegisterScreen = () => {

    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [dateLabel, setDateLabel] = useState('Date of Birth');
    console.log(date);
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.centeredImg}>
            <Image 
                source={require('../../assets/img/registration.png')}
                style={{width: 280, height: 280}}
            />
        </View>
        <Text style={styles.headingText}>Register</Text>
        <CustomInput 
            label={'Name'}
            icon = {
                <MaterialCommunityIcons 
                    name='home' 
                    color={Colors.Fourth} 
                    size={25}
                    style={styles.icons}/>}
        />
        <CustomInput 
            label={'Surname'}
            icon = {
                <MaterialCommunityIcons 
                    name='home' 
                    color={Colors.Fourth} 
                    size={25}
                    style={styles.icons}/>}
        />
        <TouchableOpacity onPress={() => setOpen(true)}>
            <Text>{dateLabel}</Text>
        </TouchableOpacity>
        <DatePicker 
            modal
            open={open}
            date={date}
            mode={'date'}
            maximumDate={new Date('2005-01-01')}
            minimumDate={new Date('1980-01-01')}
            onConfirm={(date) => {
                setOpen(false);
                setDate(date);
                setDateLabel(date.toString())
            }}
            onCancel={() => {
                setOpen(false)
            }}
        />
      
      
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
        marginBottom: 60,
    },
    icons: {
        marginRight: 5
    },
    dateButton: {
        color: Colors.Third,
        marginLeft: 5,
        marginTop: 5
    }
    

})

export default RegisterScreen
