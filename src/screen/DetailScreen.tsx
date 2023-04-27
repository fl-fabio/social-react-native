import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

const DetailScreen = () => {
  return (
    <View style={styles.container}>
      <Text>I'm App!!!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DetailScreen;