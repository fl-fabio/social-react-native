import React, { useState } from 'react';
import { TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native';
import { Colors } from '../models/Colors';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { PersonDetails } from '../models/Data';
import { useSelector } from 'react-redux';
import { addBookmark, verifyBookmark, BookmarkProps } from '../redux/actions/bookmarkActions';

interface CardProps {
    item: PersonDetails,
    onPressDetails: () => void,
    onPressBookmark: () => void,
    index: number,
  }
  const CardHome: React.FC<CardProps> = ({ item, onPressDetails, onPressBookmark, index }) => 
  {
    const { bookmarks } = useSelector(
      (state: { bookmarkReducer: BookmarkProps }) => state.bookmarkReducer
    ); 
    const isBookmarked = bookmarks.some(bookmark => bookmark.id.value === item.id.value)
    const [isBookmark, setIsBookmark] = useState<boolean>(false)
    const coloredBookmark = isBookmark ? {backgroundColor : Colors.Second} : {backgroundColor: Colors.Third}
    return(
      <View 
        style={styles.containerCardItem}
        key={`key-${index}`}>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={onPressDetails}>
          <Image source={{uri: item.picture.large}} style={styles.iconImage} />
          <View style={styles.nameCardItem}>
            <Text style={styles.nameTextCardItem}>{item.name.first} {item.name.last}</Text>
          </View>
      </TouchableOpacity>
      {
        isBookmarked ?
        <View style={[styles.bookmarksCardItem, styles.inactiveBookmark]}>
          <MaterialCommunityIcons 
            style ={styles.bookmarksIconItem}
            name='cards-heart' />
        </View> :
          <TouchableOpacity
          onPress={onPressBookmark}>
          <View style={[styles.bookmarksCardItem, styles.activeBookmark]}>
            <MaterialCommunityIcons 
              style ={styles.bookmarksIconItem}
              name='cards-heart' />
          </View>
        </TouchableOpacity> 
      }
      
      </View>
)};

const styles = StyleSheet.create({
    containerCardItem: {
        //backgroundColor: Colors.First,
        borderRadius: 8,
        alignItems: 'center',
        margin: 5,
        shadowOpacity: 0.05,
        shadowRadius: 10,
        shadowColor: Colors.Fourth,
        shadowOffset: {height: 0, width: 0},
        flex: 1,
        padding: 10
      },
      iconImage: {
        width: 170,
        height: 170,
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
        marginTop: 5,
        paddingVertical: 7,
        paddingHorizontal: 20,
        borderRadius: 20
      },
      activeBookmark: {
        backgroundColor: Colors.Third,
      },
      inactiveBookmark: {
        backgroundColor: Colors.Second
      },
      bookmarksIconItem: {
        color: Colors.Default,
        fontSize: 18,
      }
})

export default CardHome
