import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, StatusBar } from 'react-native';
import Color from '../constants/Colors'
import * as Firebase from 'firebase';
import { TextInputMask } from 'react-native-masked-text'
import validate from '../components/ValidacoesUsuario'

function addUser(name, email, city, cpf) {
  let newMail = email.substring(0, email.indexOf('@')) //setando ID do usuário como começo do email.
  Firebase.database().ref('users/' + newMail).set({
    name: name,
    email: email,
    city: city,
    cpf: cpf,
    //eventos:[],
  })
}


export default class RegisterScreen extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
    city: "",
    cpf: "",
    //eventos: "",
    errorMessage: null
  }

  registerVerify = () => {
    var ret = validate(this.state.name, this.state.email, this.state.city, this.state.cpf, this.state.password)
    if (ret == true) {
      this.registerVerify2()
    }
    else {
      this.setState({ errorMessage: ret })
    }
  }
  registerVerify2 = () => {
    Firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(infoUser => {
        return infoUser.user.updateProfile({ displayName: this.state.name }),
          addUser(this.state.name, this.state.email, this.state.city, this.state.cpf),
          this.props.navigation.replace('Login');
      }
      )
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  render() {
    return (
      <EsconderTeclado>
        <KeyboardAvoidingView style={styles.container} behavior='position' keyboardVerticalOffset={-105}>
          <View>
            <StatusBar hidden={true}></StatusBar>
            <View style={styles.logoContainer}>
              <Image style={styles.logo} resizeMode='center' source={require('../assets/images/logo.png')} />
            </View>
            <View style={styles.errorContainer}>
              {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
            </View>

            <TextInput
              style={styles.inputContainer}
              placeholder='Nome Completo'
              placeholderTextColor='#B3B3B3'
              autoCapitalize='words'
              returnKeyType='done'
              keyboardType='default'
              autoCorrect={false}
              onChangeText={name => this.setState({ name })}
              value={this.state.name}
            />
            <TextInputMask
              style={styles.inputContainer}
              placeholder='CPF'
              placeholderTextColor='#B3B3B3'
              type={'cpf'}
              value={this.state.cpf}
              onChangeText={text => {
                this.setState({
                  cpf: text
                })
              }}
              ref={(ref) => this.cpfField = ref}
            />
            <TextInput
              style={styles.inputContainer}
              placeholder='Cidade'
              placeholderTextColor='#B3B3B3'
              autoCapitalize='words'
              returnKeyType='done'
              keyboardType='default'
              autoCorrect={true}
              onChangeText={city => this.setState({ city })}
              value={this.state.city}
            />
            <TextInput
              style={styles.inputContainer}
              placeholder='Email'
              placeholderTextColor='#B3B3B3'
              clearTextOnFocus={true}
              autoCapitalize='none'
              returnKeyType='done'
              keyboardType='email-address'
              autoCorrect={false}
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
            />
            <TextInput
              style={styles.inputContainer}
              placeholder='Senha'
              placeholderTextColor='#B3B3B3'
              autoCapitalize='none'
              secureTextEntry
              returnKeyType='done'
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
            />
            {/* <TextInput
              style={styles.inputContainer}
              placeholder='Confirme sua Senha'
              placeholderTextColor='#B3B3B3'
              autoCapitalize='none'
              secureTextEntry
              returnKeyType='done'
              onChangeText={senha => this.setState({ senha })}
              value={this.state.senha}
            /> */}
            <View style={styles.buttonsContainer}>
              <TouchableOpacity onPress={() => { this.registerVerify() }}
                style={styles.registerButtonContainer}>
                <Text style={styles.textButton}>Cadastrar</Text>
              </TouchableOpacity>
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
    backgroundColor: '#e6e6e6',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputContainer: {
    height: 40,
    width: 250,
    backgroundColor: '#FFFFFF',
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'center',
    color: '#000',
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderColor: Color.roxomb,
    borderRadius: 7,
  },
  buttonsContainer: {
    marginTop: 20,
  },
  registerButtonContainer: {
    marginTop: 5,
    alignSelf: 'center',
    backgroundColor: '#000',
    height: 40,
    width: 250,
    borderRadius: 7
  },
  errorContainer: {
    width: 250,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  logo: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: 90,
    height: 120
  },
  textButton: {
    color: '#FFFFFF',
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
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
});
