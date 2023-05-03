import React, {useState} from 'react';
import { TouchableOpacity, Alert, View, Image, Text, StyleSheet, Modal } from 'react-native';
import { Colors } from '../models/Colors';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { PersonDetails } from '../models/Data';

interface CardProps {
    item: PersonDetails,
    index: number,
    modalVisible: boolean,
    onPress: () => void,
    onLongPress: () => void,
}

const CardBookmark: React.FC<CardProps> = ({item, onPress, modalVisible, onLongPress, index}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.5}
            onPress={onPress}
            onLongPress={onLongPress}
            key={`key-${index}`}>
                <View style={styles.containerCardItem}>
                    <Image source={{uri: item.picture.large}} style={styles.iconImage} />
                    <View style={styles.nameCardItem}>
                        <Text style={styles.nameTextCardItem}>{item.name.first} {item.name.last}</Text>
                        <Text style={styles.nameTextCardItem}>{item.cell}</Text>
                    </View>
                </View>
        </TouchableOpacity>

    )
};

const styles = StyleSheet.create({
    containerCardItem: {
        //backgroundColor: Colors.First,
        borderRadius: 8,
        alignItems: 'center',
        margin: 10,
        shadowOpacity: 0.05,
        shadowRadius: 10,
        shadowColor: Colors.Fourth,
        shadowOffset: {height: 0, width: 0},
      },
      iconImage: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
      },
      nameCardItem: {
        backgroundColor: Colors.First,
        paddingVertical: 7,
        paddingHorizontal: 20,
        borderRadius: 20
      },
      nameTextCardItem: {
        color: Colors.Third,
      },
      
});

export default CardBookmark;

