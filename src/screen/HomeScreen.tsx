import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, Platform, StatusBar, View, Image, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import {Person, PersonDetails} from '../models/Data'
import { Colors } from '../models/Colors';
import { ScreenFC } from '../models/ScreenFC';
import CardHome from '../components/CardHome';
import { v4 as uuid } from 'uuid';

import { useDispatch } from 'react-redux';
import { addBookmark } from '../redux/actions/bookmarkActions';

const HomeScreen : ScreenFC<'Home'> = ({navigation}) => {

  const [state, setState] = useState<Array<PersonDetails>>();

   useEffect(() => {
    getData()
    setInterval (
      getData, 120000
    )
  }, []);
  
  const getData = async () => {
    try {
      const data = await fetch(
        'https://randomuser.me/api/?results=24&exc=login,registered,phone&noinfo'
      );
      const res = await data.json();

      if (data.status === 200) {
        setState(res.results);
      }
    } catch(err) {
      console.log('There is an error: ', err)
    }
  };

  const dispatch = useDispatch()

  return (
    <SafeAreaView style={styles.container}>

      <Text>Ci sono {state?.length} risultati</Text>
      <FlatList
          data={state}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_,index) => `key-${index}`}
          renderItem={({ item, index }) => 
              <CardHome 
                index={index}
                item = {item}
                onPressDetails={() => navigation.navigate('Detail', {person: {...item}})}
                onPressBookmark={() => dispatch(addBookmark(item))}  
                />}
              
          numColumns={2}
        />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
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
});

export default HomeScreen;