import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, StatusBar } from 'react-native';
import Color from '../constants/Colors'
import * as firebase from 'firebase'

export default class LoginScreen extends React.Component {
    state = {
        email: "",
        password: "",
        errorMessage: null
    }

    LoginVerify = async () => {
        const { email, password } = this.state

        try {
            const User = await firebase.auth()
                .signInWithEmailAndPassword(email, password);
            this.props.navigation.replace('root')
        }
        catch (erro) {
            this.setState({ errorMessage: erro.message })
            //console.log(this.state.errorMessage)
        }
    }

    render() {
        return (
            <HideKeyboard>
                <KeyboardAvoidingView style={styles.container} behavior='position' keyboardVerticalOffset={-140}>
                    <View>
                        <StatusBar hidden={true}></StatusBar>
                        <View>
                            <Image style={styles.logoContainer} resizeMode='center' source={require('../assets/images/logointro.png')} />
                        </View>
                        <View style={styles.errorContainer}>
                            {this.state.errorMessage && <Text style={styles.errorText}>{this.state.errorMessage}</Text>}
                        </View>
                        <View>
                            <TextInput
                                clearTextOnFocus={true}
                                style={styles.emailPassContainer}
                                placeholder='Email'
                                placeholderTextColor='#B3B3B3'
                                autoCapitalize='none'
                                keyboardType='email-address'
                                returnKeyType='done'
                                autoCapitalize='none'
                                autoCorrect={false}
                                onChangeText={email => this.setState({ email })}
                                value={this.state.email}
                            />
                            <TextInput
                                style={styles.emailPassContainer}
                                placeholder='Senha'
                                placeholderTextColor='#B3B3B3'
                                autoCapitalize='none'
                                secureTextEntry returnKeyType='done'
                                onChangeText={password => this.setState({ password })}
                                value={this.state.password}
                            />
                            <View style={styles.buttonsContainer}>
                                <TouchableOpacity onPress={this.LoginVerify}
                                    style={styles.loginButtonContainer}>
                                    <Text style={styles.loginButtonText}>Entrar</Text>
                                </TouchableOpacity>
                                <View>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Cadastro')}
                                        style={styles.registerTextContainer} >
                                        <Text style={styles.registerButtonText2}>
                                            Novo por aqui? <Text style={{fontWeight:'bold' ,color: Color.roxomb }}>Cadastre-se!</Text></Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View >
                </KeyboardAvoidingView>
            </HideKeyboard>
        )
    }
}

const HideKeyboard = ({ children }) => (
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
    emailPassContainer: {
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
    buttonsContainer: {
        marginTop: 5,
    },
    registerButtonContainer: {
        marginTop: 5,
        marginRight: 4,
        height: 40,
        width: 250,
        borderRadius: 7
    },
    loginButtonContainer: {
        marginTop: 5,
        backgroundColor: '#000',
        height: 40,
        width: 250,
        borderRadius: 7
    },
    registerTextContainer: {
        marginTop: 20,
        width: 250,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logoContainer: {
        alignContent: 'center',
        justifyContent: 'center',
        marginTop: 80,
        marginLeft: 16,
        width: 220,
        height: 230
    },
    loginButtonText: {
        color: '#FFFFFF',
        alignSelf: 'center',
        paddingVertical: 12,
        fontWeight: '500',
        fontSize: 15,
        alignItems: 'center'
    },
    registerButtonText: {
        color: '#000',
        alignSelf: 'center',
        paddingVertical: 12,
        fontWeight: '500',
        fontSize: 15,
        alignItems: 'center'
    },
    errorContainer: {
        marginTop:20,
        width: 250,
        alignItems: 'center',
        justifyContent: 'center'
    },
    errorText: {
        marginTop: 2,
        marginBottom: 1,
        color: 'red',
        fontSize: 15,
        fontWeight: '600',
        textAlign: 'center'
    }
});
