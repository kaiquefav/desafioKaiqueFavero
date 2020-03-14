import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import PerfilScreen from '../screens/PerfilScreen';
import CadastroEScreen from '../screens/CadastroEScreen';
import Colors from '../constants/Colors';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });
  

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}
    tabBarOptions={{
      activeBackgroundColor: 'black',
      inactiveBackgroundColor:'#c9c9c9',
      inactiveTintColor:'black',
      activeTintColor: '#c9c9c9'      
    }}>
      <BottomTab.Screen
        name="Perfil"
        component={PerfilScreen}
        options={{
          title: 'Perfil',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="user" />,
        }}
      />
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ticket" />,
        }}
      />
      <BottomTab.Screen
        name="CadastroE"
        component={CadastroEScreen}
        options={{
          title: 'Cadastro de Eventos',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="fa" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Perfil':
      return 'Perfil';
    case 'Home':
      return 'Home';
    case 'CadastroE':
      return 'Cadastro de Eventos';
  }
}
