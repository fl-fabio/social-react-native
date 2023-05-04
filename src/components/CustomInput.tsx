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
    onBlur? : () => void;
    valid?: boolean
  }


const CustomInput = ({icon, onChangeText, inputType, label, keyboardType, fieldButtonLabel, fieldButtonFunction, onBlur, valid=true}: InputProps) => {
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
                      onBlur={onBlur}
                    />))
      }
      <TouchableOpacity onPress={fieldButtonFunction}>
        <Text>{fieldButtonLabel}</Text>
      </TouchableOpacity>
      {valid === true ? null : <MaterialIcons name='error' style={styles.invalidText} />}
    </View>
          
  
    
  )
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
  invalidText: {
    color: Colors.Third,
    fontSize: 20
  }
})



export default CustomInput