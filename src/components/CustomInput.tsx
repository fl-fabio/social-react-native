import React, { ReactNode } from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity, Text} from 'react-native';
import { Colors } from '../models/Colors';
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
interface InputProps {
    icon: React.ReactNode,
    label: string,
    inputType?: 'default' | 'password' | 'numeric' | 'date';
    keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
    fieldButtonLabel?: string;
    fieldButtonFunction?: () => void;
    onChangeText?: (value: string) => void;
    valid?: boolean;
    errorText?: string;
  } 

const CustomInput = ({icon, onChangeText, inputType, label, keyboardType, fieldButtonLabel, errorText='', fieldButtonFunction, valid=true}: InputProps) => {
  const colorInput = valid ? {color: Colors.Fourth} : {color: Colors.Third}
  return (
    <View style={styles.inputView}>
      {icon}
      {inputType === 'password' ? (
          <TextInput
            placeholder={label}
            keyboardType={keyboardType}
            style={styles.inputStyle}
            secureTextEntry={true}
            onChangeText={onChangeText}
            
          
          />
        ) : 
            (inputType === 'date' ? (
              '') : (
                    <TextInput 
                      placeholder={label}
                      keyboardType={keyboardType}
                      style={[styles.inputStyle, colorInput]}
                      onChangeText={onChangeText}
                    />))
      }
      <View style={{marginRight: 7}}>
        <TouchableOpacity onPress={fieldButtonFunction}>
          <Text>{fieldButtonLabel}</Text>
        </TouchableOpacity>
      </View>
      
      {/* {valid === true ? null : <MaterialIcons name='error' style={styles.invalidText} />} */}
     <View style={{flex:1}}>
      {valid !== true ? 
      <View style={styles.invalidView}>
        <Text style={styles.invalidText}>{errorText}</Text> 
      </View> :
       null}
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  inputView : {
    flexDirection: 'row',
    borderBottomColor: Colors.Third,
    borderBottomWidth: 1,
    paddingBottom: 4,
    marginBottom: 20,
    flex: 1,
  },
  inputStyle: {
    flex: 1,
    paddingVertical: 0
  },
  invalidView: {
    alignItems: 'flex-end',
    paddingTop: 3
  },
  invalidText: {
    color: Colors.Third,
    fontSize: 10,
  }
})



export default CustomInput