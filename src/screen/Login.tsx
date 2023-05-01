import React, {useState} from 'react';
import {Text, ScrollView, StyleSheet, Platform, StatusBar, SafeAreaView, View, Image, TouchableOpacity} from 'react-native';
import { Colors } from '../models/Colors';
import CustomInput from '../components/CustomInput';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import CustomButton from '../components/CustomButton';
import { ScreenFC } from '../models/ScreenFC';
import { useDispatch } from 'react-redux';
import { login } from '../redux/actions/accountActions';

const Login: ScreenFC<'Login'> = ({navigation}) => {
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();

    const dispatch = useDispatch();
  return (
    <SafeAreaView style={styles.container}>
        <ScrollView
        showsVerticalScrollIndicator={false}
        style={{paddingHorizontal: 25}}>
            <View style={styles.centeredImg}>
                <Image 
                    source={require('../../assets/img/login.png')}
                    style={{width: 200, height: 200}}
                />
            </View>
            <Text style={styles.headingText}>Login</Text>
          
            <CustomInput 
                label={'Email'}
                keyboardType='email-address'
                onChangeText={(value) => setEmail(value)}
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
                label={'Login'} 
                onPress={()=>{
                    email && password && dispatch(login({email, password, isLogged:true}))
                }} />
            <View style={styles.toLoginView}>
                <Text>New User?</Text>
                <TouchableOpacity onPress={()=> navigation.navigate('SignUp')}>
                    <Text style={styles.toLoginText}>Register</Text>
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

export default Login