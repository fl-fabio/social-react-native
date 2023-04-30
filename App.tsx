import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, LogBox } from 'react-native';
import NavigationProvider from './src/navigation';
import Login from './src/screen/Login';
LogBox.ignoreAllLogs();
export default function App() {
  
  return <NavigationProvider />

  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
