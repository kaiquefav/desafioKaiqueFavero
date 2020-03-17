import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Image, ActivityIndicator, FlatList, SafeAreaView, ViewBase } from 'react-native';
import * as firebase from 'firebase';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from '../constants/Colors'
import Constants from 'expo-constants';
import Layout from '../constants/Layout'
import App from '../App'

function Item({ nomeE, nomeOrg, cidadeE, descricao, data, valor, path }) {
  return (
    <View style={styles.listContainer}>
      <TouchableOpacity style={styles.buttonContainer} onPress={() => { path.navigation.navigate('DetalhesScreen') }}>
        <Text style={styles.tituloEvento}>{nomeE}</Text>
        <Text style={styles.dataEvento}>{data}</Text>
        <Text style={styles.infosEvento}>Local: {cidadeE}</Text>
        <Text style={styles.infosEvento}>Por: {nomeOrg}</Text>
        <Text style={styles.descricaoEvento}>{descricao}</Text>
        <Text style={styles.valorEvento}>R${valor},00</Text>
      </TouchableOpacity>
    </View>
  );
}

export default class HomeScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      eventos: [],
      ready: false,
    };
  }

  getqteData() {
    var aux = 0;
    console.log('aux é: ' + aux)
    let Current = this;
    var ref = firebase.database().ref('events')
    ref.on('value', snapshot => {
      aux = snapshot.numChildren()
      console.log('aux depois' + aux)
      console.log('numChildren depois' + snapshot.numChildren())
      console.log('lenght dos eventos' + this.state.eventos.length)
      if (this.state.eventos.length == aux) {
        Current.setState({ ready: true })
        console.log('entrou')
      }
      ;
    }
    )
  }

  componentDidMount() {
    let event = [];
    let Current = this;
    var ref = firebase.database().ref('events')
    console.log('REF EH ' + ref)
    ref.on('child_added', snapshot => {
      event.push({
        id: snapshot.key,
        cidadeE: snapshot.val().cidadeE,
        data: snapshot.val().data,
        descricao: snapshot.val().descricao,
        nomeE: snapshot.val().nomeE,
        nomeOrg: snapshot.val().nomeOrg,
        valor: snapshot.val().valor,
      });
      console.log('lenght dos eventos mount: ' + this.state.eventos.length)
      Current.setState({ eventos: event })
      console.log('lenght dos eventos mount: ' + this.state.eventos)
      this.getqteData()

    }
    )
  }

  singOutUser = () => {
    firebase.auth().signOut
    this.props.navigation.navigate('Login')
  }

  render() {

    //console.log(this.eventos)
    if (this.state.ready === true) {

      const { eventos } = this.state
      console.log(eventos)
    }
    return (

      this.state.ready ?
        <SafeAreaView style={styles.container}>
          <Image style={styles.logoContainer} resizeMode='center' source={require('../assets/images/logo.png')} />
          <View style={styles.tituloContainer}><Text style={styles.titulo}>Eventos</Text></View>
          <ScrollView>
            <FlatList
              data={this.state.eventos}
              renderItem={({ item }) => <Item
                nomeE={item.nomeE}
                nomeOrg={item.nomeOrg}
                cidadeE={item.cidadeE}
                descricao={item.descricao}
                data={item.data}
                valor={item.valor}
                path={this.props} />}
              keyExtractor={item => item.id}
            />
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
  container2: {
    width: 200,
    height: 200,
    backgroundColor: 'red',
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
  listContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '#a6a6a6',
    borderRadius: 9,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 1,
    shadowOffset: {
      width: 3,
      height: 4,
    },
    width: 300,
    marginVertical: 10,
  },
  buttonContainer: {
    width: 300,
    marginVertical: 10,
  },
  tituloEvento: {
    fontSize: 25,
    alignSelf: 'center',
    color: '#FFF',
    fontWeight: '700',
    marginBottom: 1,
  },
  infosEvento: {
    fontSize: 15,
    marginLeft: 8,
    color: '#000',
  },
  dataEvento: {
    fontSize: 18,
    alignSelf: 'center',
    color: '#000',
  },
  descricaoEvento: {
    fontSize: 12,
    alignSelf: 'flex-end',
    marginRight: 8,
    color: '#000',
  },
  valorEvento: {
    fontSize: 15,
    marginLeft: 8,
    fontWeight: '800',
    color: 'green',
  },

});