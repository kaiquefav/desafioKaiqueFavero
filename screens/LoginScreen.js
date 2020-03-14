import * as React from 'react';
import { StyleSheet, View, Text, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginForm from '../components/LoginForm'
import { useNavigation } from '@react-navigation/native';
import BottomTabNavigator from '../navigation/BottomTabNavigator'


const Stack = createStackNavigator();

const EsconderTeclado = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
)

function CallForms() {
    return (
        <EsconderTeclado>
            <KeyboardAvoidingView style={styles.container} behavior='padding'>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} resizeMode='center' source={require('../assets/images/logointro.png')} />
                </View>
                <View style={styles.formContainer}><LoginForm /></View>
            </KeyboardAvoidingView>
        </EsconderTeclado>
    )
}

export default function LoginScreen(props) {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="forms" component={CallForms} options={{headerShown:false}}/>
                <Stack.Screen name="root" component={BottomTabNavigator} options={{headerShown:false }}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e6e6e6'
    },
    logoContainer: {
        //backgroundColor:'red',
        marginTop: 40
    },
    logo: {
        width: 220,
        height: 230
    },
    formContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    }
});
