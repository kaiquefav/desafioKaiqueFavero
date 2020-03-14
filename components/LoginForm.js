import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, StatusBar, Animated, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Color from '../constants/Colors'



function BotaoEntrar() {
    const navigation = useNavigation();
    return (
        <TouchableOpacity title="Home" onPress={() => { navigation.replace('root') }} style={styles.botaoECContainer}>
            <Text style={styles.TextoBotao}>Entrar</Text>
        </TouchableOpacity>
    );
}

function BotaoCadastro() {
    return (
        <TouchableOpacity style={styles.botaoECContainer} >
            <Text style={styles.TextoBotao}>Cadastro</Text>
        </TouchableOpacity>
    );
}

function BotaoEsqueci() {
    return (
        <TouchableOpacity style={styles.botaoESenhaContainer}>
            <Text style={styles.TextoBotao}>Esqueci a Senha</Text>
        </TouchableOpacity>
    );
}



export default class LoginForms extends Component {
    render() {
        return (
            <View style={styles.containerF}>
                <StatusBar
                    barStyle='light-content'
                />
                <TextInput
                    style={styles.entradaContainer}
                    placeholder='Email'
                    placeholderTextColor='#B3B3B3'
                    returnKeyType='next'
                    onSubmitEditing={() => this.entradaSenha.focus()}
                    keyboardType='email-address'
                    autoCapitalize='none'
                    autoCorrect={false}
                />
                <TextInput
                    style={styles.entradaContainer}
                    placeholder='Senha'
                    placeholderTextColor='#B3B3B3'
                    secureTextEntry returnKeyType='done'
                    ref={(entrada) => this.entradaSenha = entrada}
                />
                <View style={styles.botoesContainer}>
                    <View style={{ flexDirection: 'row' }}>
                        <BotaoEntrar />
                        <BotaoCadastro />
                    </View>
                    <BotaoEsqueci />
                </View>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    containerF: {
        padding: 20
    },
    entradaContainer: {
        height: 40,
        width: 250,
        backgroundColor: '#FFFFFF',
        marginBottom: 10,
        color: '#000',
        paddingHorizontal: 10,
        borderWidth: 0.5,
        borderColor: Color.roxomb,
        borderRadius: 7
    },
    botoesContainer: {
        marginTop: 5,
    },
    botaoECContainer: {
        marginRight: 4,
        backgroundColor: Color.roxomb,
        height: 40,
        width: 123,
        borderRadius: 7
    },
    botaoESenhaContainer: {
        marginTop: 5,
        backgroundColor: Color.roxomb,
        height: 40,
        width: 250,
        borderRadius: 7
    },
    TextoBotao: {
        color: '#FFFFFF',
        alignSelf: 'center',
        paddingVertical: 12,
        fontWeight: '500',
        fontSize: 15,
        alignItems: 'center'
    }
})
