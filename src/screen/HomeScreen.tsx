import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import {Person, PersonDetails} from '../models/Data'
import { Colors } from '../models/Colors';
import { ScreenFC } from '../models/ScreenFC';

const HomeScreen : ScreenFC<'Home'> = ({navigation}) => {

  const [state, setState] = useState<Array<PersonDetails>>();

  useEffect(() => {
    getData();
  },[]);
  
  const getData = async () => {
    try {
      const data = await fetch(
        'https://randomuser.me/api/?results=24&exc=login,registered,phone&noinfo'
      );
      const res = await data.json();
      console.log(res.results);
      if (data.status === 200) {
        setState(res.results);
      }
    } catch(err) {
      console.log('There is an error: ', err)
    }
  };

    interface Props {
      icon: string,
      name: string,
      surname: string,
      onPress: () => void,
    }

    const Card: React.FC<Props> = ({ icon, name, surname, onPress }) => (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={onPress}
      >
        <View style={styles.iconContainer}>
          <Image source={{uri: icon}} style={styles.iconImage} />
          <Text>{name} {surname}</Text>
        </View>
      </TouchableOpacity>
      
  );

  


  return (
    <View style={styles.container}>
        <FlatList
          data={state}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => 
              <Card 
                key={index}
                name={item.name.first} 
                surname={item.name.last} 
                icon={item.picture.large} 
                onPress={() => navigation.navigate('Detail', {person: {...item}})}/>}
          numColumns={2}
        />
    
      <Text>I'm App!!!</Text>
      <StatusBar style="auto" />
    </View>

    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.First,
    paddingHorizontal: 20,
  },
  iconContainer: {
    padding: 20,
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