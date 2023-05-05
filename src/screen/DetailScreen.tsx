import { StyleSheet, Text, View, Image, ScrollView, ImageBackground, Linking, Dimensions, TouchableOpacity} from 'react-native';
import { ScreenFC } from '../models/ScreenFC';
import { PersonDetails } from '../models/Data';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from 'react-redux';

import { addBookmark, BookmarkProps } from '../redux/actions/bookmarkActions';

import { Colors } from '../models/Colors';
import { useEffect, useState } from 'react';

const DetailScreen : ScreenFC<'Detail'> = ({navigation, route}) => {
  const supportedURL = "https://google.com";
  const handlePress = async (tel: string) => {
    const supported = await Linking.canOpenURL(supportedURL);
    if (supported) {
      await Linking.openURL(tel);
    }
  };

  const dispatch = useDispatch();
  const {picture, dob, name, nat, email, cell, location, id} : PersonDetails= route.params.person;

  const { bookmarks } = useSelector(
    (state: { bookmarkReducer: BookmarkProps }) => state.bookmarkReducer
  ); 
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false)
  useEffect(() => {
    bookmarks.some(item => item.id.value === id.value) && setIsBookmarked(true);
  }, []);
 
  return (
    <ScrollView style={styles.containerDetails}>
      <ImageBackground
        source={{uri: picture.large}} style={styles.image}>
      </ImageBackground>
        <View style={styles.informationCard}>
          <Text style={styles.textName}>{name.first} {name.last}</Text>
          <Text style={styles.textDescription}>{dob.date.slice(0,10)}</Text>
          <Text style={styles.textDescription}>{location.country}({nat}) - {location.city}</Text>
          <View style={styles.infoView}>
            <TouchableOpacity onPress={() => handlePress(`mailto:${email}`)}>
              <View style={styles.infoItem}>
                <MaterialIcons name='email' style={styles.infoIcon}/>
                <Text style={styles.infoContent}>{email}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePress(`tel:${cell}`)}>
              <View style={styles.infoItem}>
                <MaterialIcons name='phone' style={styles.infoIcon}/>
                <Text style={styles.infoContent}>{cell}</Text>
              </View>
            </TouchableOpacity>  
          </View>
        </View>
        <View style={styles.bookmarkView}>
       {!isBookmarked ?
          <TouchableOpacity style={styles.bookmarkButton} onPress={() => {
            setIsBookmarked(true)
            dispatch(addBookmark(route.params.person))
            }} >
            <MaterialCommunityIcons name="cards-heart" style={styles.bookmarkIcon} />
            <Text style={styles.bookmarkText}>Add to Favorite</Text>
        </TouchableOpacity> :
          <MaterialCommunityIcons name="cards-heart" style={[styles.bookmarkIcon, {color: Colors.Third}]} />
        }
        </View>     
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  containerDetails: {
    marginHorizontal: 0,
    flex: 1
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.Third,
    marginHorizontal: 0
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
    borderRadius: 20,
},
  informationCard: {
    backgroundColor: Colors.Default,
		paddingHorizontal: 10,
		paddingBottom: 25,
		margin: 20,
		borderRadius: 8,
		marginTop: -65,
		shadowOpacity: 0.05,
		shadowRadius: 10,
		shadowColor: Colors.Fourth,
		shadowOffset: { height: 0, width: 0 }
  },
  textName: {
    paddingTop: 25,
		paddingBottom: 5,
		color: Colors.BLACK,
		fontSize: 15,
		textAlign: "center"
  },
  textDescription: {
    color: Colors.Fourth,
		textAlign: "center",
		paddingBottom: 5,
		fontSize: 13
  },
  infoView: {
    marginTop: 20,
  },
  infoItem: {
    paddingVertical: 8,
		flexDirection: "row",
		alignItems: "center",
  },
  infoIcon: {
    fontSize: 12,
		color: Colors.Fourth,
		paddingHorizontal: 10
  },
  infoContent: {
    fontSize: 13,
    color: Colors.Fourth
  },
  bookmarkView: {
    marginTop: 10,
    alignItems: 'center'
  },
  bookmarkButton: {
    justifyContent: "center",
		flexDirection: "row",
		alignItems: "center",
		marginLeft: 10,
		height: 50,
    width: 200,
		borderRadius: 25,
		backgroundColor: Colors.Third,
		paddingHorizontal: 20
  },
  bookmarkIcon: {
    fontSize: 20, 
    color: Colors.Default,
  },
  bookmarkText: {
    fontSize: 15,
		color: Colors.Default,
		paddingLeft: 5
  },
card: {
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "center",
    width: 300,
    padding: 20
  },
  description: {
    fontWeight: "bold",
    padding: 4,
  },
  tail: {
    color: "red",
    padding: 4,
    width: 120,
  },
});

export default DetailScreen;