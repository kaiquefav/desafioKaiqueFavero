import React, { Component } from 'react';
import { Alert } from 'react-native';
import firebase from 'firebase';

export default function validate(name, email, city, cpf, password) {
    if ((name == '') || (email == '') || (city == '') || (cpf == '') || (password == ''))
        return '\nFill in all the fields!'
    else
        return true

}