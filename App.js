import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import CadastroScreen from './screens/CadastroScreen';
import CadastroEventoScreen from './screens/CadastroEventoScreen';
import HomeScreen from './screens/HomeScreen';
import PerfilScreen from './screens/PerfilScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderHeightContext } from '@react-navigation/stack';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import { useNavigation } from '@react-navigation/native';
import * as firebase from 'firebase';
import LoadingScreen from './screens/LoadingScreen';


var firebaseConfig = {
  apiKey: "AIzaSyAjEARDzQ5NbyRC9ytXVe2JNU9TalMpTgs",
  authDomain: "mb-enjoy.firebaseapp.com",
  databaseURL: "https://mb-enjoy.firebaseio.com",
  projectId: "mb-enjoy",
  storageBucket: "mb-enjoy.appspot.com",
  messagingSenderId: "471129997471",
  appId: "1:471129997471:web:569b1ca976dc84bbe8e2aa"
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  console.log("carregando firebase")
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Loading" component={LoadingScreen} options={{ gestureEnabled: false, headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ gestureEnabled: false, headerShown: false }} />
        <Stack.Screen name="root" component={BottomTabNavigator} options={{ gestureEnabled: false, headerShown: false }} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} options={{ gestureEnabled: false, headerBackTitleVisible: false, headerTitleStyle: { fontWeight: '800', fontSize: 20, color: '#FFF' }, headerStyle: { backgroundColor: 'black' }, headerBackTitleStyle: { color: '#FFF' } }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
});
