import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, StatusBar } from 'react-native';
import * as firebase from 'firebase';




export default class LoadingScreen extends React.Component {

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate('Login')
        })
    }



    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden={true}></StatusBar>
                <Text style={styles.textoCarregando}>Carregando...</Text>
                <ActivityIndicator style={styles.imgCarregando} size='large'></ActivityIndicator>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textoCarregando: {
        fontSize: 20,
    },
    imgCarregando: {
        marginTop: 20
    }
});
