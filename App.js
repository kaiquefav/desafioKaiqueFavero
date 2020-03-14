import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import LoginScreen from './screens/LoginScreen'


export default function App(props) {
  return (

    <View style={styles.container}>
      <LoginScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});
