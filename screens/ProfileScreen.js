import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, ActivityIndicator, SafeAreaView, StatusBar } from 'react-native';
import * as firebase from 'firebase';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from '../constants/Colors'
import Constants from 'expo-constants';
import Layout from '../constants/Layout'
import App from '../App'


export default class ProfileScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      users: [],
      index: '',
      ready2: false,
    };
  }

  getQtData() {
    var aux;
    let current = this;
    //console.log(firebase.auth().currentUser.email)
    var ref = firebase.database().ref('users/')
    ref.on('value', snapshot => {
      aux = snapshot.numChildren()
      if (this.state.users.length == aux) {
        this.getUserID()
        current.setState({ ready2: true })
      }
      ;
    }
    )
  }

  componentWillMount() {
    let user = [];
    let current = this;
    var ref = firebase.database().ref('users/')
    ref.on('child_added', snapshot => {
      user.push({
        id: snapshot.key,
        city: snapshot.val().city,
        cpf: snapshot.val().cpf,
        email: snapshot.val().email,
        //eventos: snapshot.val().eventos,
        name: snapshot.val().name,
      });
      current.setState({ users: user })
      this.getQtData()
    }
    )
  }


  getUserID() {
    var index;
    var newMail = firebase.auth().currentUser.email
    let userID = newMail.substring(0, newMail.indexOf('@')) //setando ID do usuário como começo do email.
    //console.log('user id: '+userID)
    for (var i = 0; i < this.state.users.length; i++) {
      if (this.state.users[i].id == userID) {
        this.setState({ index: i })
        return;
      }
    }

  }


  componentDidMount() {
    let user = [];
    let current = this;
    var ref = firebase.database().ref('users/')
    ref.on('child_added', snapshot => {
      user.push({
        id: snapshot.key,
        city: snapshot.val().city,
        cpf: snapshot.val().cpf,
        email: snapshot.val().email,
        //eventos[]: snapshot.val().eventos[],
        name: snapshot.val().name,
      });
      current.setState({ users: user })
      this.getQtData()

    })
  }


  signOutUser = () => {
    firebase.auth().signOut
    this.props.navigation.replace('Login')
  }

  render() {

    if (this.state.ready2 === true) {

      const { users } = this.state
      //console.log(this.state.users[this.state.index].name)
    }
    return (

      this.state.ready2 ?
        <SafeAreaView style={styles.container}>
          <StatusBar hidden={true}></StatusBar>
          <Image style={styles.logoContainer} resizeMode='center' source={require('../assets/images/logo.png')} />
          <View style={styles.lineSeparate}><Text style={styles.infosText1}></Text></View>
          <ScrollView>
            <View style={{ marginTop: 12 }}>
              <Text style={styles.infosText1}>Nome:</Text><Text style={styles.infoText2}>{this.state.users[this.state.index].name}</Text>
              <Text style={styles.infosText1}>CPF:</Text><Text style={styles.infoText2}>{this.state.users[this.state.index].cpf}</Text>
              <Text style={styles.infosText1}>Email:</Text><Text style={styles.infoText2}>{this.state.users[this.state.index].email}</Text>
              <Text style={styles.infosText1}>Cidade:</Text><Text style={styles.infoText2}>{this.state.users[this.state.index].city}</Text>
              {/* <Text style={styles.textoCampo}>Eventos Criados:</Text><Text style={styles.infoText2}>{this.state.users[this.state.index].eventos[]}</Text> */}
            </View>
            <View style={styles.signOutContainer}><TouchableOpacity style={styles.signOutButton} onPress={this.signOutUser}><Text style={styles.signOutText}>Sair</Text></TouchableOpacity></View>
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
  signOutContainer: {
    alignContent: 'center',
    borderRadius: 8,
    borderColor: '#000',
  },
  lineSeparate: {
    height: 0.5,
    backgroundColor: '#000',
    marginTop: 5,
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
  infosText1: {
    fontSize: 20,
    marginLeft: 10,
    marginBottom: 5,
    color: '#000',
    fontWeight: 'bold',
  },
  signOutButton: {
    backgroundColor: '#000',
    borderRadius: 8,
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    width: 100
  },
  signOutText: {
    color: '#FFFFFF',
    alignSelf: 'center',
    paddingVertical: 12,
    fontWeight: '500',
    fontSize: 15,
    alignItems: 'center'
  },
  infoText2: {
    marginBottom: 15,
    marginLeft: 10,
    fontSize: 17,
    color: '#000',
  },
});