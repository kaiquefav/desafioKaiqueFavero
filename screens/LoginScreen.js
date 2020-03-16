import React, { Component } from 'react';
import {
    StyleSheet, View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView,
    TouchableWithoutFeedback, Keyboard, StatusBar, LayoutAnimation
} from 'react-native';
import Color from '../constants/Colors'
import * as firebase from 'firebase'

export default class LoginScreen extends React.Component {
    state = {
        email: "",
        senha: "",
        errorMessage: null
    }

    verificaLogin = async () => {
        const { email, senha } = this.state

        try {
            const user = await firebase.auth()
                .signInWithEmailAndPassword(email, senha);
            this.props.navigation.navigate('root')
        }
        catch (error) {
            this.setState({ errorMessage: error.message })
            console.log(this.state.errorMessage)
        }
    }

    render() {
        LayoutAnimation.easeInEaseOut();
        return (
            <EsconderTeclado>
                <KeyboardAvoidingView style={styles.container} behavior='position' keyboardVerticalOffset={-140}>
                    <View>
                        <StatusBar barStyle='dark-content'></StatusBar>
                        <View>
                            <Image style={styles.logo} resizeMode='center' source={require('../assets/images/logointro.png')} />
                        </View>
                        <View style={styles.errorContainer}>
                            {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                        </View>
                        <View>
                            <TextInput
                                clearTextOnFocus={true}
                                style={styles.entradaContainer}
                                placeholder='Email'
                                placeholderTextColor='#B3B3B3'
                                autoCapitalize='none'
                                returnKeyType='next'
                                keyboardType='email-address'
                                returnKeyType='done'
                                autoCapitalize='none'
                                autoCorrect={false}
                                onChangeText={email => this.setState({ email })}
                                value={this.state.email}
                            />
                            <TextInput
                                style={styles.entradaContainer}
                                placeholder='Senha'
                                placeholderTextColor='#B3B3B3'
                                autoCapitalize='none'
                                secureTextEntry returnKeyType='done'
                                onChangeText={senha => this.setState({ senha })}
                                value={this.state.senha}
                            />
                            <View style={styles.botoesContainer}>
                                <TouchableOpacity onPress={this.verificaLogin}
                                    style={styles.botaoEntrarContainer}>
                                    <Text style={styles.TextoBotao}>Entrar</Text>
                                </TouchableOpacity>
                                <View>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Cadastro')}
                                        style={styles.botaoCContainer} >
                                        <Text style={styles.TextoBotao2}>
                                            Novo por aqui? <Text style={{ color: Color.roxomb }}>Cadastre-se!</Text></Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View >
                </KeyboardAvoidingView>
            </EsconderTeclado>
        )
    }
}

const EsconderTeclado = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
)


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Color.bgDefault,
    },
    entradaContainer: {
        height: 40,
        width: 250,
        backgroundColor: '#FFFFFF',
        marginTop: 10,
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
    botaoCContainer: {
        marginTop: 5,
        marginRight: 4,
        height: 40,
        width: 250,
        borderRadius: 7
    },
    botaoEntrarContainer: {
        marginTop: 5,
        backgroundColor: Color.roxomb,
        height: 40,
        width: 250,
        borderRadius: 7
    },
    errorContainer: {
        marginTop:20,
        width: 250,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        alignContent: 'center',
        justifyContent: 'center',
        marginTop: 80,
        marginLeft: 16,
        width: 220,
        height: 230
    },
    TextoBotao: {
        color: '#FFFFFF',
        alignSelf: 'center',
        paddingVertical: 12,
        fontWeight: '500',
        fontSize: 15,
        alignItems: 'center'
    },
    TextoBotao2: {
        color: '#000',
        alignSelf: 'center',
        paddingVertical: 12,
        fontWeight: '500',
        fontSize: 15,
        alignItems: 'center'
    },
    error: {
        marginTop: 2,
        marginBottom: 1,
        color: 'red',
        fontSize: 15,
        fontWeight: '600',
        textAlign: 'center'
    }
});
