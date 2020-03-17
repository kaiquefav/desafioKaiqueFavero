import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, ActivityIndicator, FlatList, SafeAreaView, ViewBase, StatusBar } from 'react-native';
import * as firebase from 'firebase';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { CommonActions } from '@react-navigation/native';
import Colors from '../constants/Colors'
import Constants from 'expo-constants';
import Layout from '../constants/Layout'
import App from '../App'


function getDetails(descricao, nomeE, path) {
  console.log(descricao, nomeE)
  path.navigation.navigate('Detalhes', {
    descricaoE: descricao,
    nomeE: nomeE
  });

}

function Item({ nomeE, nomeOrg, cidadeE, descricao, data, valor, path }) {
  var i;
  return (
    <View style={styles.listContainer}>
      <TouchableOpacity style={styles.buttonContainer} onPress={() => { getDetails(descricao, nomeE, path) }} >
        <Text style={styles.tituloEvento}>{nomeE}</Text>
        <Text style={styles.tituloInfosEvento}>Data: <Text style={styles.infosEvento}>{data}</Text></Text>
        <Text style={styles.tituloInfosEvento}>Local: <Text style={styles.infosEvento}>{cidadeE}</Text></Text>
        <Text style={styles.tituloInfosEvento}>Por: <Text style={styles.infosEvento}>{nomeOrg}</Text></Text>
        <Text style={styles.tituloInfosEvento}>R$<Text style={styles.valorEvento}>{valor},00</Text></Text>
      </TouchableOpacity>
    </View >
  );
}

export default class HomeScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      eventos: [],
      ready: false,
      index: '',
    };
  }

  getqteData() {
    var aux = 0;
    // console.log('aux é: ' + aux)
    let Current = this;
    var ref = firebase.database().ref('events')
    ref.on('value', snapshot => {
      aux = snapshot.numChildren()
      if (this.state.eventos.length == aux) {
        Current.setState({ ready: true })
      }
      ;
    }
    )
  }

  componentWillMount() {
    let event = [];
    let Current = this;
    var ref = firebase.database().ref('events')
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
      Current.setState({ eventos: event })
      this.getqteData()

    }
    )
  }

  componentDidMount() {
    let event = [];
    let Current = this;
    var ref = firebase.database().ref('events')
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
      Current.setState({ eventos: event })
      this.getqteData()

    }
    )
  }



  render() {

    //console.log(this.eventos)
    if (this.state.ready === true) {

      const { eventos } = this.state
      //console.log(this.state.eventos[0].descricao)
      // var descricaoEvento = this.state.eventos.descricao

    }
    return (

      this.state.ready ?
        <SafeAreaView style={styles.container}>
          <StatusBar hidden={true}></StatusBar>
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
                path={this.props}
              />}
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
    marginBottom: 10,
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
    backgroundColor: '#F2F2F2',
    borderRadius: 9,
    borderColor: '#000',
    borderWidth: 0.5,
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
    color: '#000',
    fontWeight: '700',
    marginBottom: 15,
    marginRight: 8,
    marginLeft: 8,
  },
  tituloInfosEvento: {
    fontSize: 15,
    marginLeft: 8,
    marginRight: 8,
    fontWeight: '600',
    color: '#000',
  },
  infosEvento: {
    fontSize: 15,
    marginLeft: 8,
    marginRight: 8,
    fontWeight: '300',
    color: '#000',
  },
  dataEvento: {
    fontSize: 18,
    marginLeft: 8,
    marginRight: 8,
    color: '#000',
  },
  tituloDescricaoEvento: {
    fontSize: 15,
    alignSelf: 'flex-end',
    marginRight: 8,
    marginLeft: 8,
    fontWeight: '600',
    color: '#000',
  },
  descricaoEvento: {
    fontSize: 12,
    alignSelf: 'flex-end',
    marginRight: 8,
    marginLeft: 8,
    fontWeight: '300',
    color: '#000',
  },
  valorEvento: {
    fontSize: 15,
    marginTop: 10,
    marginLeft: 8,
    marginRight: 8,
    fontWeight: '300',
    color: 'green',
  },

});