import React, { Component } from 'react';
import * as firebase from 'firebase'

var id = 1
function addEventoUser(id, nomeE) {
    //pega userID
    var user = firebase.auth().currentUser.email;
    let newMail = user.substring(0, user.indexOf('@'))
    //seta dentro do user id uma pasta de eventos
    firebase.database().ref('users/' + newMail + '/' + 'eventos/' + id + '/').set({
        nomeE: nomeE,
    })
}

function addEvento(id, nomeE, nomeOrg, cidadeE, descricao, data, valor) {
    //seta evento dentro dos eventos
    firebase.database().ref('events/' + id + '/').set({
        nomeE: nomeE,
        nomeOrg: nomeOrg,
        cidadeE: cidadeE,
        descricao: descricao,
        data: data,
        valor: valor,
    })
}

export function validate(nomeOrg, nomeE, cidadeE, descricao, data, valor) {
    if ((nomeOrg == '') || (nomeE == '') || (cidadeE == '') || (descricao == '') || (data == '') || (valor == '')) {
        //alert('Preencha todos os campos!')
        return 'Fill in all the fields!'
    }
    else {
        id = Math.ceil(Math.random() * 1000000)
        addEventoUser(id, nomeE);
        addEvento(id, nomeE, nomeOrg, cidadeE, descricao, data, valor)
        return true
    }
}