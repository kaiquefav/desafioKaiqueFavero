import * as React from 'react';
import Colors from './constants/Colors'
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
import LoadingScreen from './screens/LoadingScreen';
import * as firebase from 'firebase';
import FirebaseCfg from './FirebaseCfg'




const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Loading" component={LoadingScreen} options={{ gestureEnabled: false, headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ gestureEnabled: false, headerShown: false }} />
        <Stack.Screen name="root" component={BottomTabNavigator} options={{ gestureEnabled: false, headerShown: false }} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} options={{ gestureEnabled: false, headerBackTitleVisible: false, headerTitleStyle: { fontWeight: '800', fontSize: 20, color: '#000' }, headerStyle: { backgroundColor: Colors.bgDefault }, headerBackTitleStyle: { color: '#FFF' } }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
});
