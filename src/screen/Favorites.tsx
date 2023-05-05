import {useState} from 'react';
import { View, Text, Alert, Modal, ScrollView, StyleSheet, Platform, StatusBar,Image, SafeAreaView, FlatList } from "react-native";
import { CustomScreenFC } from "../models/ScreenFC";
import { useSelector } from "react-redux";
import { PersonDetails } from '../models/Data';
import CardBookmark from '../components/CardBookmark';
import { Colors } from '../models/Colors';
import {
  BookmarkProps,
  removeBookmark,
} from "../redux/actions/bookmarkActions";
import { TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";

const Favorites: CustomScreenFC<'Favorite'> = ({navigation}) => {

const [modalVisible, setModalVisible] = useState(false);
const [itemToDelete, setItemToDelete] = useState<PersonDetails>();

const { bookmarks } = useSelector(
  (state: { bookmarkReducer: BookmarkProps }) => state.bookmarkReducer
);
const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.container}>
      <Text>Ci sono {bookmarks.length} Bookmarks</Text>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Are you sure to Delete?</Text>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalVisible(!modalVisible);
                itemToDelete && dispatch(removeBookmark(itemToDelete));}}>
              <Text style={styles.textStyle}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button]}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Text style={[styles.textStyle, {color: Colors.Third}]}>X</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        </Modal>
        {modalVisible 
        ? <View style={[StyleSheet.absoluteFillObject, { backgroundColor: Colors.Third, opacity: 0.7 }]} />
        : <FlatList 
            data={bookmarks}
            showsVerticalScrollIndicator={false}
            keyExtractor={(_,index) => `key-${index}`}
            
            renderItem={({item, index}) => 
              <CardBookmark 
                item = {item}
                index={index}
                modalVisible={modalVisible}
                onPress={() => navigation.navigate('Detail', {person: {...item}})}
                onLongPress={() => {
                  setModalVisible(true);
                  setItemToDelete(item);
                }}/>}
              numColumns={2}
            />} 
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: Colors.First,
    paddingHorizontal: 10,
    alignItems: 'center'
  },
  iconContainer: {
    padding: 10,
    flex: 1,
    alignItems: 'center',
  },
  iconImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
 
  buttonClose: {
    backgroundColor: Colors.Third,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default Favorites;