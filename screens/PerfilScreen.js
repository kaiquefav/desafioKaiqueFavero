import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Image, ActivityIndicator, FlatList, SafeAreaView, ViewBase } from 'react-native';
import * as firebase from 'firebase';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from '../constants/Colors'
import Constants from 'expo-constants';
import Layout from '../constants/Layout'
import App from '../App'

var myContext = [];


function Item({ name, cpf, email, cidade, eventos }) {
  // myContext = React.createContext(dados)

  return (
    <View style={styles.listContainer}>
      <View style={styles.buttonContainer}><Text style={styles.tituloEvento}>{name}</Text></View>
      <View style={styles.buttonContainer}><Text style={styles.tituloEvento}>{cpf}</Text></View>
      <View style={styles.buttonContainer}><Text style={styles.tituloEvento}>{email}</Text></View>
      <View style={styles.buttonContainer}><Text style={styles.tituloEvento}>{cidade}</Text></View>
      {/* <View style={styles.buttonContainer}><Text style={styles.tituloEvento}>{eventos}</Text></View> */}
    </View>
  );
}


export default class PerfilScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      usuarios: [],
      ready2: false,
    };
  }

  getqteData() {
    var aux;
    let Current = this;
    var ref = firebase.database().ref('users')
    ref.on('value', snapshot => {
      aux = snapshot.numChildren()
      console.log('aux ' + aux)
      console.log('length ' + this.state.usuario.lenght)
      if (this.state.usuario.length == aux) {
        Current.setState({ ready2: true })
      }
      ;
    }
    )
  }

  componentDidMount() {
    let user = [];
    let Current = this;
    var ref = firebase.database().ref('users')
    ref.on('child_added', snapshot => {
      user.push({
        id: snapshot.key,
        cidade: snapshot.val().cidade,
        cpf: snapshot.val().cpf,
        email: snapshot.val().email,
        //eventos: snapshot.val().eventos,
        name: snapshot.val().name,
      });
      Current.setState({ usuario: user })
      console.log(this.state.usuario)
      this.getqteData()

    }
    )
  }

  singOutUser = () => {
    firebase.auth().signOut
    this.props.navigation.replace('Login')
  }

  render() {

    if (this.state.ready2 === true) {

      const { usuario } = this.state
    }
    return (

      this.state.ready2 ?
        <SafeAreaView style={styles.container}>
          <Image style={styles.logoContainer} resizeMode='center' source={require('../assets/images/logo.png')} />
          <View style={styles.tituloContainer}><Text style={styles.titulo}>Perfil</Text></View>
          <ScrollView>
            <FlatList
              data={this.state.usuario}
              renderItem={({ item }) => <Item
                nome={item.nome}
                email={item.email}
                cidade={item.cidade}
                cpf={item.cpf}
              //eventos={item.eventos}
              />}
              keyExtractor={item => item.id}
            />
            <TouchableOpacity style={styles.botaoSair} onPress={this.singOutUser}><Text style={styles.textoSair}>Sair</Text></TouchableOpacity>
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
  titulo: {
    fontSize: 35,
    fontWeight: '500',
    alignSelf: 'center',
    color: '#FFF',
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
    borderColor: '#000',
    borderWidth: 0.5,
    backgroundColor: '#666666',
  },
  textoSair: {
    fontSize: 20,
    justifyContent: 'center',
  },
  buttonContainer: {
    width: 200,
    marginVertical: 10,
  },
});