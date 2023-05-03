import React from 'react';
import { TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native';
import { Colors } from '../models/Colors';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { PersonDetails } from '../models/Data';

interface CardProps {
    item: PersonDetails,
    onPressDetails: () => void,
    onPressBookmark: () => void,
    index: number,
  }
const Card: React.FC<CardProps> = ({ item, onPressDetails, onPressBookmark, index }) => (

    
      <View 
        style={styles.containerCardItem}
        key={`key-${index}`}
      >
      
          <Image source={{uri: item.picture.large}} style={styles.iconImage} />
          <View style={styles.nameCardItem}>
            <Text style={styles.nameTextCardItem}>{item.name.first} {item.name.last}</Text>
          </View>
     
      
      {/* <TouchableOpacity
        onPress={onPressBookmark}>
        <View style={styles.bookmarksCardItem}>
          <MaterialCommunityIcons 
            style ={styles.bookmarksIconItem}
            name='cards-heart' />
        </View>
      </TouchableOpacity> */}
      </View>
);

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
        flex: 1,
      },
      iconImage: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
      },
      nameCardItem: {
        marginTop: -35,
        backgroundColor: Colors.First,
        paddingVertical: 7,
        paddingHorizontal: 20,
        borderRadius: 20
      },
      nameTextCardItem: {
        color: Colors.Third,
      },
      bookmarksCardItem: {
        backgroundColor: Colors.Third,
        marginTop: 5,
        paddingVertical: 7,
        paddingHorizontal: 20,
        borderRadius: 20
      },
      bookmarksIconItem: {
        color: Colors.Default,
        fontSize: 18,
      }
})

export default Card
