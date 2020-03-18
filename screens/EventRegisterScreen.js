import React, { Component, useState } from 'react';
import {
  StyleSheet, View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView,
  TouchableWithoutFeedback, Keyboard, StatusBar, ScrollView, Button, SafeAreaView
} from 'react-native';
import Colors from '../constants/Colors'
import { validate } from '../components/ValidacoesEvento'

export default class EventRegisterScreen extends React.Component {
  state = {
    eventName: "",
    orgName: "",
    eventCity: "",
    description: "",
    currentDate: "",
    day: "",
    month: "",
    year: "",
    url: "",
    // hour: "",
    // minute: "",
    // time: "",
    price: "",
    errorMessage: "",
  }



  RegisterEventVerify = () => {
    const { orgName, eventName, eventCity, description, day, month, year, currentDate, url, price, errorMessage } = this.state;
    var result = validate(orgName, eventName, eventCity, description, day, month, year, currentDate, url, price)
    if (result == true) {
      this.props.navigation.replace('root');
    }
    else {
      this.setState({ errorMessage: result });
    }
  }

  render() {

    return (

      <SafeAreaView style={styles.container}>
        <HideKeyboard>
          <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={-10}>
            <StatusBar hidden={true}></StatusBar>
            <Image style={styles.logoContainer} resizeMode='center' source={require('../assets/images/logo.png')} />
            <View style={styles.lineSeparate}><Text style={styles.titulo}></Text></View>
            <ScrollView>
              <View style={styles.errorContainer}>
                <Text style={styles.errorMsg}>{this.state.errorMessage}</Text>
              </View>
              <TextInput
                ref={(ref) => { this.nomeInput = ref; }}
                style={styles.inputContainer}
                placeholder='Nome do Evento'
                placeholderTextColor='#B3B3B3'
                autoCapitalize='words'
                returnKeyType='done'
                keyboardType='default'
                autoCorrect={false}
                onChangeText={eventName => this.setState({ eventName })}
                value={this.state.eventName}
              />
              <TextInput
                style={styles.inputContainer}
                placeholder='Cidade do Evento'
                placeholderTextColor='#B3B3B3'
                autoCapitalize='words'
                returnKeyType='done'
                keyboardType='default'
                autoCorrect={true}
                onChangeText={eventCity => this.setState({ eventCity })}
                value={this.state.eventCity}
              />
              <TextInput
                style={styles.inputContainer}
                placeholder='Nome Organização'
                placeholderTextColor='#B3B3B3'
                clearTextOnFocus={true}
                autoCapitalize='words'
                returnKeyType='done'
                keyboardType='email-address'
                autoCorrect={false}
                onChangeText={orgName => this.setState({ orgName })}
                value={this.state.orgName}
              />
              <TextInput
                style={styles.inputDescriptionContainer}
                placeholder='Descrição'
                placeholderTextColor='#B3B3B3'
                autoCapitalize='sentences'
                returnKeyType='done'
                onChangeText={description => this.setState({ description })}
                value={this.state.description}
              />
              <TextInput
                style={styles.inputContainer}
                keyboardType='url'
                placeholder='URL da Imagem do Evento'
                placeholderTextColor='#B3B3B3'
                autoCapitalize='sentences'
                returnKeyType='done'
                onChangeText={url => this.setState({ url })}
                value={this.state.url}
              />
              <View style={styles.dateContainer}>
                <TextInput
                  style={styles.dateInput}
                  placeholder='Dia'
                  placeholderTextColor='#B3B3B3'
                  keyboardType='number-pad'
                  maxLength={2}
                  returnKeyType='done'
                  onChangeText={day => this.setState({ day })}
                  value={this.state.day}
                /><Text>  </Text>
                <TextInput
                  style={styles.dateInput}
                  placeholder='Mês'
                  placeholderTextColor='#B3B3B3'
                  keyboardType='number-pad'
                  maxLength={2}
                  returnKeyType='done'
                  onChangeText={month => this.setState({ month })}
                  value={this.state.month}
                /><Text>  </Text>
                <TextInput
                  style={styles.dateInput}
                  placeholder='Ano'
                  placeholderTextColor='#B3B3B3'
                  keyboardType='number-pad'
                  maxLength={4}
                  returnKeyType='done'
                  onChangeText={year => this.setState({ year })}
                  value={this.state.year}
                />
              </View>
              {/* <View style={styles.timeContainer}>
                <TextInput
                  style={styles.timeInput}
                  placeholder='Horas'
                  placeholderTextColor='#B3B3B3'
                  keyboardType='number-pad'
                  maxLength={2}
                  returnKeyType='done'
                  onChangeText={hour => this.setState({ hour })}
                  value={this.state.hour}
                /><Text> : </Text>
                <TextInput
                  style={styles.timeInput}
                  placeholder='Minutos'
                  placeholderTextColor='#B3B3B3'
                  keyboardType='number-pad'
                  maxLength={2}
                  returnKeyType='done'
                  onChangeText={minute => this.setState({ minute })}
                  value={this.state.minute}
                />
              </View> */}
              <TextInput
                style={styles.inputContainer}
                placeholder='Preço'
                placeholderTextColor='#B3B3B3'
                keyboardType='number-pad'
                returnKeyType='done'
                onChangeText={price => this.setState({ price })}
                value={this.state.price}
              />
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => { this.RegisterEventVerify() }}
                  style={styles.registerContainer}>
                  <Text style={styles.buttonText}>Cadastrar Evento</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </HideKeyboard>
      </SafeAreaView >
    )
  }
}



const HideKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgDefault,
  },
  lineSeparate: {
    height: 0.5,
    backgroundColor: '#000',
    marginTop: 5,
  },
  dateContainer: {
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: "row",
  },
  timeContainer: {
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: "row",
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
  inputContainer: {
    height: 40,
    width: 250,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    alignSelf: 'center',
    color: '#000',
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderColor: Colors.roxomb,
    borderRadius: 7,
  },
  inputDescriptionContainer: {
    height: 100,
    width: 250,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    alignSelf: 'center',
    color: '#000',
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderColor: Colors.roxomb,
    borderRadius: 7,
  },
  buttonContainer: {
  },
  registerContainer: {
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
  dateInput: {
    height: 40,
    width: 78,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    alignSelf: 'center',
    color: '#000',
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderColor: Colors.roxomb,
    borderRadius: 7,
  },
  timeInput: {
    height: 40,
    width: 78,
    backgroundColor: '#FFFFFF',
    marginTop: 12,
    marginBottom: 10,
    alignSelf: 'center',
    color: '#000',
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderColor: Colors.roxomb,
    borderRadius: 7,
  },
  buttonText: {
    color: '#FFFFFF',
    alignSelf: 'center',
    paddingVertical: 12,
    fontWeight: '500',
    fontSize: 15,
    alignItems: 'center'
  },
  errorMsg: {
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
});
