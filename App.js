import * as React from 'react';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen'
import DetailsScreen from './screens/DetailsScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import LoadingScreen from './screens/LoadingScreen';
import * as firebase from 'firebase';

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
}

const stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen name="Login" component={LoginScreen} options={{ gestureEnabled: false, headerShown: false }} />
        <stack.Screen name="Loading" component={LoadingScreen} options={{ gestureEnabled: false, headerShown: false }} />
        <stack.Screen name="Cadastro" component={RegisterScreen} options={{ gestureEnabled: false, headerLeftContainerStyle: { marginBottom: 10 }, headerBackTitleVisible: false, headerTitleStyle: { marginBottom: 10, fontWeight: '800', fontSize: 20, color: '#FFF' }, headerStyle: { height: 45, backgroundColor: "#000" }, headerBackTitleStyle: { color: '#FFF' } }} />
        <stack.Screen name="root" component={BottomTabNavigator} options={{ headerLeft: null, gestureEnabled: false, headerLeftContainerStyle: { marginBottom: 10 }, headerBackTitleVisible: false, headerTitleStyle: { marginBottom: 10, fontWeight: '800', fontSize: 20, color: '#FFF' }, headerStyle: { height: 45, backgroundColor: "#000" }, headerBackTitleStyle: { color: '#FFF' } }} />
        <stack.Screen name="Detalhes" component={DetailsScreen} options={{ gestureEnabled: false, headerLeftContainerStyle: { marginBottom: 10 }, headerBackTitleVisible: false, headerTitleStyle: { marginBottom: 10, fontWeight: '800', fontSize: 20, color: '#FFF' }, headerStyle: { height: 45, backgroundColor: "#000" }, headerBackTitleStyle: { color: '#FFF' } }} />
      </stack.Navigator>
    </NavigationContainer>
  )
}
