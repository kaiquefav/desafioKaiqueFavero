import React, { Component } from 'react';
import { Alert } from 'react-native';
import firebase from 'firebase';

export default function validate(nome, email, cidade, cpf, senha) {
    if ((nome == '') || (email == '') || (cidade == '') || (cpf == '') || (senha == ''))
        return '\nFill in all the fields!'
    else
        return true

}