import React, { Component } from 'react';
import {
  StyleSheet, View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView,
  TouchableWithoutFeedback, Keyboard,
} from 'react-native';
import Color from '../constants/Colors'
import * as firebase from 'firebase';
import { TextInputMask } from 'react-native-masked-text'
import validate from '../components/ValidacoesUsuario'

function addUser(nome, email, cidade, cpf) {
  let newMail = email.substring(0, email.indexOf('@')) //setando ID do usuário como começo do email.
  firebase.database().ref('users/' + newMail).set({
    name: nome,
    email: email,
    cidade: cidade,
    cpf: cpf,
  })
}


export default class CadastroScreen extends React.Component {
  state = {
    nome: "",
    email: "",
    senha: "",
    cidade: "",
    cpf: "",
    errorMessage: null
  }

  verificaCadastro = () => {
    var ret = validate(this.state.nome, this.state.email, this.state.cidade, this.state.cpf, this.state.senha)
    if (ret == true) {
      this.verificaCadastro2(ret)
    }
    else {
      console.log('setando ret')
      this.setState({ errorMessage: ret })
    }
  }
  verificaCadastro2 = (ret) => {
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.senha)
      .then(infoUser => {
        return infoUser.user.updateProfile({ displayName: this.state.nome }),
          addUser(this.state.nome, this.state.email, this.state.cidade, this.state.cpf), console.log('addeu user')
      }
      )
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  render() {
    return (
      <EsconderTeclado>
        <KeyboardAvoidingView style={styles.container} behavior='position' keyboardVerticalOffset={-105}>
          <View>
            <View style={styles.logoContainer}>
              <Image style={styles.logo} resizeMode='center' source={require('../assets/images/logo.png')} />
            </View>
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
            <TextInputMask
              style={styles.entradaContainer}
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
              style={styles.entradaContainer}
              placeholder='Cidade'
              placeholderTextColor='#B3B3B3'
              autoCapitalize='words'
              returnKeyType='done'
              keyboardType='default'
              autoCorrect={true}
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
            {/* <TextInput
              style={styles.entradaContainer}
              placeholder='Confirme sua Senha'
              placeholderTextColor='#B3B3B3'
              autoCapitalize='none'
              secureTextEntry
              returnKeyType='done'
              onChangeText={senha => this.setState({ senha })}
              value={this.state.senha}
            /> */}
            <View style={styles.botoesContainer}>
              <TouchableOpacity onPress={() => { this.verificaCadastro() }}
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
    backgroundColor: '#e6e6e6',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  entradaContainer: {
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
  botoesContainer: {
    marginTop: 20,
  },
  botaoCContainer: {
    marginTop: 5,
    marginRight: 4,
    alignSelf: 'center',
    height: 40,
    width: 250,
    borderRadius: 7
  },
  botaoEntrarContainer: {
    marginTop: 5,
    alignSelf: 'center',
    backgroundColor: Color.roxomb,
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
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  BotaoVoltar: {
    position: 'absolute',
    top: 30,
    left: 15,
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  imgCarregando: {
    marginTop: 20
  },
});
