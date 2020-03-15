import React, { Component } from 'react';
import {
  StyleSheet, View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView,
  TouchableWithoutFeedback, Keyboard, StatusBar,
} from 'react-native';
import Color from '../constants/Colors'
import * as firebase from 'firebase'


export default class CadastroScreen extends React.Component {
  state = {
    nome: "",
    email: "",
    senha: "",
    cidade:"",
    errorMessage: null
  }

  verificaCadastro = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.senha)
      .then(infoUser => {
        return infoUser.user.updateProfile({
          displayName: this.state.nome
          })
      })
      .catch(error => this.setState({ errorMessage: error.message }))
  }


  render() {
    return (
      <EsconderTeclado>
        <KeyboardAvoidingView style={styles.container} behavior='position' keyboardVerticalOffset={60}>
          <View>
            <View style={styles.logoContainer}>
              <Image style={styles.logo} resizeMode='center' source={require('../assets/images/logo.png')} />
            </View>
            <Text style={styles.cadastro}>Cadastro</Text>
            <View style={styles.errorContainer}>
              {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
            </View>
            <TextInput
              style={styles.entradaContainer}
              placeholder='Nome Completo'
              placeholderTextColor='#B3B3B3'
              autoCapitalize='words'
              returnKeyType='done'
              keyboardType='default'
              autoCorrect={false}
              onChangeText={nome => this.setState({ nome })}
              value={this.state.nome}
            />
            <TextInput
              style={styles.entradaContainer}
              placeholder='Cidade'
              placeholderTextColor='#B3B3B3'
              autoCapitalize='words'
              returnKeyType='done'
              keyboardType='default'
              autoCorrect={false}
              onChangeText={cidade => this.setState({ cidade })}
              value={this.state.cidade}
            />
            <TextInput
              style={styles.entradaContainer}
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
              style={styles.entradaContainer}
              placeholder='Senha'
              placeholderTextColor='#B3B3B3'
              autoCapitalize='none'
              secureTextEntry
              returnKeyType='done'
              onChangeText={senha => this.setState({ senha })}
              value={this.state.senha}
            />
            <View style={styles.botoesContainer}>
              <TouchableOpacity onPress={this.verificaCadastro}
                style={styles.botaoEntrarContainer}>
                <Text style={styles.TextoBotao}>Cadastrar</Text>
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
    alignItems: 'center',
    backgroundColor: '#e6e6e6'
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  entradaContainer: {
    height: 40,
    width: 250,
    backgroundColor: '#FFFFFF',
    marginTop: 20,
    marginBottom: 10,
    color: '#000',
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderColor: Color.roxomb,
    borderRadius: 7
  },
  botoesContainer: {
    marginTop: 20,
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
    width: 250,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cadastro: {
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 40,
    marginBottom: 15,
  },
  logo: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    height: 150
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
