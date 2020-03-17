import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, ActivityIndicator, SafeAreaView, StatusBar } from 'react-native';
import * as firebase from 'firebase';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from '../constants/Colors'
import Constants from 'expo-constants';
import Layout from '../constants/Layout'
import App from '../App'


export default class PerfilScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      usuarios: [],
      index: '',
      ready2: false,
    };
  }

  getqteData() {
    var aux;
    let Current = this;
    //console.log(firebase.auth().currentUser.email)
    var ref = firebase.database().ref('users/')
    ref.on('value', snapshot => {
      aux = snapshot.numChildren()
      if (this.state.usuarios.length == aux) {
        this.getUserID()
        Current.setState({ ready2: true })
      }
      ;
    }
    )
  }

  componentWillMount() {
    let user = [];
    let Current = this;
    var ref = firebase.database().ref('users/')
    ref.on('child_added', snapshot => {
      user.push({
        id: snapshot.key,
        cidade: snapshot.val().cidade,
        cpf: snapshot.val().cpf,
        email: snapshot.val().email,
        //eventos: snapshot.val().eventos,
        name: snapshot.val().name,
      });
      Current.setState({ usuarios: user })
      this.getqteData()
    }
    )
  }


  getUserID() {
    var index;
    var newMail = firebase.auth().currentUser.email
    let userID = newMail.substring(0, newMail.indexOf('@')) //setando ID do usuário como começo do email.
    //console.log('user id: '+userID)
    for (var i = 0; i < this.state.usuarios.length; i++) {
      if (this.state.usuarios[i].id == userID) {
        this.setState({ index: i })
        return;
      }
    }

  }


  componentDidMount() {
    let user = [];
    let Current = this;
    var ref = firebase.database().ref('users/')
    ref.on('child_added', snapshot => {
      user.push({
        id: snapshot.key,
        cidade: snapshot.val().cidade,
        cpf: snapshot.val().cpf,
        email: snapshot.val().email,
        //eventos[]: snapshot.val().eventos[],
        name: snapshot.val().name,
      });
      Current.setState({ usuarios: user })
      this.getqteData()

    })
  }


  singOutUser = () => {
    firebase.auth().signOut
    this.props.navigation.navigate('Login')
  }

  render() {

    if (this.state.ready2 === true) {

      const { usuarios } = this.state
      console.log(this.state.usuarios[this.state.index].name)
    }
    return (

      this.state.ready2 ?
        <SafeAreaView style={styles.container}>
          <StatusBar hidden={true}></StatusBar>
          <Image style={styles.logoContainer} resizeMode='center' source={require('../assets/images/logo.png')} />
          <View style={styles.tituloContainer}><Text style={styles.titulo}>Perfil</Text></View>
          <ScrollView>
            <View style={{ marginTop: 12 }}>
              <Text style={styles.textoCampo}>Nome:</Text><Text style={styles.textoInfo}>{this.state.usuarios[this.state.index].name}</Text>
              <Text style={styles.textoCampo}>CPF:</Text><Text style={styles.textoInfo}>{this.state.usuarios[this.state.index].cpf}</Text>
              <Text style={styles.textoCampo}>Email:</Text><Text style={styles.textoInfo}>{this.state.usuarios[this.state.index].email}</Text>
              <Text style={styles.textoCampo}>Cidade:</Text><Text style={styles.textoInfo}>{this.state.usuarios[this.state.index].cidade}</Text>
              {/* <Text style={styles.textoCampo}>Eventos Criados:</Text><Text style={styles.textoInfo}>{this.state.usuarios[this.state.index].eventos[]}</Text> */}
            </View>
            <View style={styles.containerSair}><TouchableOpacity style={styles.botaoSair} onPress={this.singOutUser}><Text style={styles.textoSair}>Sair</Text></TouchableOpacity></View>
          </ScrollView>
        </SafeAreaView>
        : <ActivityIndicator style={styles.loadingContainer} size='large' />

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgDefault,
  },
  containerSair: {
    alignContent: 'center',
    borderRadius: 8,
    borderColor: '#000',
  },
  titulo: {
    fontSize: 35,
    fontWeight: '500',
    alignSelf: 'center',
    color: '#FFF',
  },
  tituloContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#000',
  },
  loadingContainer: {
    backgroundColor: Colors.bgDefault,
    alignSelf: 'center',
    marginVertical: 300,
  },
  logoContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    width: 70,
    height: 85,
    backgroundColor: Colors.bgDefault,
  },
  botaoSair: {
    backgroundColor: '#000',
    borderRadius: 8,
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    width: 100
  },
  textoSair: {
    color: '#FFFFFF',
    alignSelf: 'center',
    paddingVertical: 12,
    fontWeight: '500',
    fontSize: 15,
    alignItems: 'center'
  },
  textoCampo: {
    fontSize: 20,
    marginBottom: 5,
    color: '#000',
    fontWeight: 'bold',
  },
  textoInfo: {
    fontSize: 17,
    marginBottom: 15,
    color: '#000',
  },
});