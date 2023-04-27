import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { ScreenFC } from '../models/ScreenFC';
import { PersonDetails } from '../models/Data';

import { Colors } from '../models/Colors';

const DetailScreen : ScreenFC<'Detail'> = ({navigation, route}) => {
  const {picture, dob, name, nat, email, cell} : PersonDetails= route.params.person;
  return (
    <View style={styles.container}>
        <View>
        <Image 
                source={{uri: picture.large}}
                style={styles.image}
            />
        </View>
        <View style={styles.card}>
            <View>
                <Text style={styles.description}>{dob.date}</Text>
                <Text style={styles.description}>{name.first} {name.last}</Text>
                <Text style={styles.description}>{nat}</Text>
                <Text style={styles.description}>{email}</Text>
                <Text style={styles.description}>{cell}</Text>
            </View>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.Third
  },
  image: {
    width: 300,
    height: 300,

    borderRadius: 20,
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