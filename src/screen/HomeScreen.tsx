import React, {useState, useEffect, useRef} from 'react';
import { StyleSheet,PanResponder, Text, Platform, StatusBar, FlatList, SafeAreaView, AppState } from 'react-native';
import {Person, PersonDetails} from '../models/Data'
import { Colors } from '../models/Colors';
import { ScreenFC } from '../models/ScreenFC';
import CardHome from '../components/CardHome';
import IdleTimerManager from 'react-native-idle-timer';

import { useDispatch } from 'react-redux';
import { addBookmark } from '../redux/actions/bookmarkActions';


const HomeScreen : ScreenFC<'Home'> = ({navigation}) => {

  const [state, setState] = useState<Array<PersonDetails>>();

/*    useEffect(() => {
    getData()
    setInterval (
      getData, 120000
    )
  }, []); */

  const timerId = useRef<NodeJS.Timeout | undefined>(undefined)
  const [timeForInactivityInSecond, setTimeForInactivityInSecond] = useState(
    120
  )

  useEffect(() => {
    getData()
    resetInactivityTimeout()
  }, [])

  /**
   * const panResponder = React.useRef(PanResponder.create
   * ({ onStartShouldSetPanResponderCapture: (e, gestureState) => 
   * { resetInactivityTimeout(); return false; }, })).current;: 
   * qui viene creata una reference 
   * per gestire le risposte al tocco dell'utente. 
   * Questa reference viene utilizzata 
   * per creare un oggetto PanResponder con la funzione PanResponder.create. 
   * La funzione onStartShouldSetPanResponderCapture
   *  viene chiamata ogni volta che l'utente tocca lo schermo. 
   * In questo caso, viene chiamata la funzione resetInactivityTimeout() 
   * e viene restituito false per 
   * indicare che l'evento non deve essere gestito.
   */
  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponderCapture: (e, gestureState) => {
        resetInactivityTimeout();
        return false;
      },
    })
  ).current;

  /**
   * const resetInactivityTimeout = () => { ... }: 
   * qui viene definita la funzione resetInactivityTimeout().
   *  Questa funzione cancella il timer corrente (se presente)
   *  utilizzando clearTimeout(). Viene quindi creato un nuovo timer 
   * utilizzando setTimeout() che esegue la funzione getData() 
   * dopo timeForInactivityInSecond secondi. Infine, 
   * la reference timerId.current viene aggiornata 
   * con il nuovo timerId appena creato.
   */
  const resetInactivityTimeout = () => {
    if (timerId.current) {
      clearTimeout(timerId.current)
    }
    const newTimerId = setTimeout(() => {
      // action after user has been detected idle
      getData()
      
    }, timeForInactivityInSecond * 1000)
   
    timerId.current = newTimerId
    
  }

  
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
    <SafeAreaView style={styles.container} {...panResponder.panHandlers}>
      
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
                onPressBookmark={() => {
                  dispatch(addBookmark(item))
                }}  
                />}
          numColumns={2}
        />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: Colors.First,
    paddingHorizontal: 10,

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