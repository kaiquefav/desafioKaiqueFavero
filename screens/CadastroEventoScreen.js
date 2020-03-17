import React, { Component } from 'react';
import DatePicker from 'react-native-datepicker';
import {
  StyleSheet, View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView,
  TouchableWithoutFeedback, Keyboard, StatusBar, ScrollView, Button
} from 'react-native';
import Color from '../constants/Colors'
import * as firebase from 'firebase'
import { validate } from '../components/ValidacoesEvento'
import Colors from '../constants/Colors';



export default class CadastroEventoScreen extends React.Component {
  state = {
    nomeE: "",
    nomeOrg: "",
    cidadeE: "",
    descricao: "",
    data: "",
    valor: "",
    errorMessage: "",
  }

  verificaCadastroEvento = () => {
    const { nomeOrg, nomeE, cidadeE, descricao, data, valor, errorMessage } = this.state;
    var result = validate(nomeOrg, nomeE, cidadeE, descricao, data, valor)
    if (result == true) {
      this.props.navigation.replace('root');
    }
    else {
      this.setState({ errorMessage: result });
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <StatusBar hidden={true}></StatusBar>
        <EsconderTeclado>
          <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={-80}>
            <View>
              <View style={styles.logoContainer}>
                <Image style={styles.logo} resizeMode='center' source={require('../assets/images/logo.png')} />
                <Text style={{ fontWeight: '500' }}>Cadastro de Eventos</Text>
              </View>
              <View style={styles.errorContainer}>
                <Text style={styles.error}>{this.state.errorMessage}</Text>
              </View>
              <TextInput
                ref={(ref) => { this.nomeInput = ref; }}
                style={styles.entradaContainer}
                placeholder='Nome do Evento'
                placeholderTextColor='#B3B3B3'
                autoCapitalize='words'
                returnKeyType='done'
                keyboardType='default'
                autoCorrect={false}
                onChangeText={nomeE => this.setState({ nomeE })}
                value={this.state.nomeE}
              />
              <TextInput
                style={styles.entradaContainer}
                placeholder='Cidade do Evento'
                placeholderTextColor='#B3B3B3'
                autoCapitalize='words'
                returnKeyType='done'
                keyboardType='default'
                autoCorrect={true}
                onChangeText={cidadeE => this.setState({ cidadeE })}
                value={this.state.cidadeE}
              />
              <TextInput
                style={styles.entradaContainer}
                placeholder='Nome Organização'
                placeholderTextColor='#B3B3B3'
                clearTextOnFocus={true}
                autoCapitalize='words'
                returnKeyType='done'
                keyboardType='email-address'
                autoCorrect={false}
                onChangeText={nomeOrg => this.setState({ nomeOrg })}
                value={this.state.nomeOrg}
              />
              <TextInput
                style={styles.entradaContainer}
                placeholder='Descrição'
                placeholderTextColor='#B3B3B3'
                autoCapitalize='sentences'
                returnKeyType='done'
                onChangeText={descricao => this.setState({ descricao })}
                value={this.state.descricao}
              />
              <DatePicker
                style={{ marginLeft: 63, marginTop: 10, width: 250, borderWidth: 0.8, borderColor: '#a6a6a6' }}
                date={this.state.data} //initial date from state
                mode="date" //The enum of date, datetime and time
                placeholder="Selecione a data do evento"
                format="DD-MM-YYYY"
                minDate="16-03-2020"
                maxDate="16-03-2099"
                confirmBtnText="Confirmar"
                cancelBtnText="Cancelar"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                  },
                  dateInput: {
                    marginLeft: 36
                  }
                }}
                onDateChange={(data) => { this.setState({ data: data }) }}
              />
              <TextInput
                style={styles.entradaContainer}
                placeholder='Valor'
                placeholderTextColor='#B3B3B3'
                keyboardType='number-pad'
                returnKeyType='done'
                onChangeText={valor => this.setState({ valor })}
                value={this.state.valor}
              />
              <View style={styles.botoesContainer}>
                <TouchableOpacity onPress={() => { this.verificaCadastroEvento() }}
                  style={styles.botaoEntrarContainer}>
                  <Text style={styles.TextoBotao}>Cadastrar Evento</Text>
                </TouchableOpacity>
              </View>
            </View >
          </KeyboardAvoidingView>
        </EsconderTeclado>
      </ScrollView>
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
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  entradaContainer: {
    height: 40,
    width: 250,
    backgroundColor: '#FFFFFF',
    marginTop: 20,
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
    width: 50,
    height: 60
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
    marginTop: 10,
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
});
