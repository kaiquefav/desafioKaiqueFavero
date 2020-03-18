import React, { Component } from 'react';
import * as firebase from 'firebase'
import currentDateValidate from './DateValidate'
import TimeValidate from './TimeValidate'

var id = 1

function addEventoUser(id, eventName) {
    //pega userID
    var user = firebase.auth().currentUser.email;
    let newMail = user.substring(0, user.indexOf('@'))
    //seta dentro do user id uma pasta de eventos
    firebase.database().ref('users/' + newMail + '/' + 'eventos/' + id + '/').set({
        eventName: eventName,
    })
}

function addEvento(id, eventName, orgName, eventCity, description, currentDate, url, price) {
    //seta evento dentro dos eventos
    firebase.database().ref('events/' + id + '/').set({
        eventName: eventName,
        orgName: orgName,
        eventCity: eventCity,
        description: description,
        currentDate: currentDate,
        url: url,
        price: price,
    })
}

export function validate(orgName, eventName, eventCity, description, day, month, year, currentDate, url, price) {
    if ((orgName == '') || (eventName == '') || (eventCity == '') || (description == '') || (day == '') || (month == '') || (year == '') || (price == '') || (url == '')) {
        //alert('Preencha todos os campos!')
        return 'Fill all the fields!'
    }
    else {
        id = Math.ceil(Math.random() * 1000000)
        currentDate = currentDateValidate(day, month, year)
        //Time = TimeValidate(Hour, Minute)
        if (currentDate == false) {
            return 'Enter a valid date!';
        }
        // else if (Time == false) {
        //     return 'Enter a valid time!';
        // }
        else {
            addEventoUser(id, eventName);
            addEvento(id, eventName, orgName, eventCity, description, currentDate, url, price)
            return true;
        }
    }
}



