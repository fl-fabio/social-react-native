import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import { Colors } from '../models/Colors';

interface buttonProps {
    label: string,
    onPress: () => void
}

const CustomButton: React.FC<buttonProps>= ({label, onPress}) => {
  return (
    <TouchableOpacity 
        onPress={onPress}
        style ={styles.buttonStyle}>
        <Text style={styles.buttonTextStyle}>
            {label}
        </Text>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
    buttonStyle : {
        backgroundColor: Colors.Third,
        padding: 20,
        borderRadius: 20,
        marginBottom: 30,
    },
    buttonTextStyle: {
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 14,
        color: Colors.Second
    }
})

export default CustomButton
