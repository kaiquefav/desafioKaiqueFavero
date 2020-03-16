import { TextInputMask } from 'react-native-masked-text'
import React, { Component } from 'react';
import { Alert } from 'react-native';

export default function validate(nome, email, cidade, cpf) {
    const cpfIsValid = this.cpfField.isValid()
    console.log(cpfIsValid) // boolean
    if (cpfIsValid == true) {
        const unmasked = this.cpfField.getRawValue()
        addUser(nome, email, cidade, unmasked)
        return true
    }
    else {
        Alert('CPF INVALIDO')
        return false
    }
}


function addUser(nome, email, cidade, cpf) {
    let newMail = email.substring(0, email.indexOf('@')) //setando ID do usuário como começo do email.
    firebase.database().ref('users/' + newMail).set({
      name: nome,
      email: email,
      cidade: cidade,
      cpf: cpf,
    })
  }








