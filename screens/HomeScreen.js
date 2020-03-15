import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as firebase from 'firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class HomeScreen extends React.Component {
  state = {
    email: '',
    displayName: '',
  };

  componentDidMount() {
    const { email, displayName } = firebase.auth().currentUser;
    this.setState({ email, displayName })
    console.log(firebase.auth().currentUser)
  }

  singOutUser = () => {
    firebase.auth().signOut
    this.props.navigation.navigate('Login')
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ marginTop: 30, color:'red' }}>Bem vindo de volta </Text>
        <TouchableOpacity style={styles.containerSair} onPress={this.singOutUser}>
          <Text style={styles.textoSair}>Sair</Text>
        </TouchableOpacity>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerSair: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    borderWidth: 0.8,
    borderColor: '#000',
    borderRadius: 8,
    width: 40,
  },
  textoSair: {
    alignItems: 'center',
    justifyContent: 'center',
    color: 'green',
    fontSize: 20,
  }
});
