import React, { ReactNode } from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity, Text} from 'react-native';
import { Colors } from '../models/Colors';

interface InputProps {
    icon: React.ReactNode,
    label: string,
    inputType?: 'default' | 'password' | 'numeric' | 'date';
    keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
    fieldButtonLabel?: string;
    fieldButtonFunction?: () => void;

  }


const CustomInput = ({icon, inputType, label, keyboardType, fieldButtonLabel, fieldButtonFunction }: InputProps) => {
  return (
    <View style={styles.inputView}>
      {icon}
      {inputType === 'password' ? (
          <TextInput
            placeholder={label}
            keyboardType={keyboardType}
            style={styles.inputStyle}
            secureTextEntry={true}
          />
        ) : 
            (inputType === 'date' ? (
              '') : (
                    <TextInput 
                      placeholder={label}
                      keyboardType={keyboardType}
                      style={styles.inputStyle}
                    />))
      }
      <TouchableOpacity onPress={fieldButtonFunction}>
        <Text>{fieldButtonLabel}</Text>
      </TouchableOpacity>
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
})



export default CustomInput
