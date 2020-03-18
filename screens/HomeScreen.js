import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, ActivityIndicator, FlatList, SafeAreaView, ViewBase, StatusBar } from 'react-native';
import * as firebase from 'firebase';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { CommonActions } from '@react-navigation/native';
import Colors from '../constants/Colors'
import App from '../App'


function getDetails(description, eventName, orgName, eventCity, currentDate, url, price, path) {
  path.navigation.navigate('Detalhes', {
    description: description,
    eventName: eventName,
    orgName: orgName,
    eventCity: eventCity,
    currentDate: currentDate,
    url: url,
    price: price,
  });

}

function Item({ eventName, orgName, eventCity, description, currentDate, url, price, path }) {

  return (
    
    <View style={styles.listContainer}>
      <TouchableOpacity style={styles.buttonContainer} onPress={() => { getDetails(description, eventName, orgName, eventCity, currentDate, url, price, path) }} >
        <Image style={styles.eventImage} resizeMode='cover' source={{ uri: url }} />
        <Text style={styles.eventTitle}>{eventName}</Text>
        <Text style={styles.eventInfoTitle}>Data: <Text style={styles.eventInfos}>{currentDate}</Text></Text>
        <Text style={styles.eventInfoTitle}>Local: <Text style={styles.eventInfos}>{eventCity}</Text></Text>
        <Text style={styles.eventInfoTitle}>Organizado Por: <Text style={styles.eventInfos}>{orgName}</Text></Text>
        <View style={styles.priceContainer}><Text style={styles.eventPriceTitle}>R$<Text style={styles.eventPrice}>{price},00</Text></Text></View>
      </TouchableOpacity>
    </View >
  );
}

export default class HomeScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      events: [],
      ready: false,
    };
  }

  GetQtData() {
    var aux = 0;
    // console.log('aux é: ' + aux)
    let Current = this;
    var ref = firebase.database().ref('events')
    ref.on('value', snapshot => {
      aux = snapshot.numChildren()
      if (this.state.events.length == aux) {
        Current.setState({ ready: true })
      }
      ;
    }
    )
  }

  componentWillMount() {
    let event = [];
    let current = this;
    var ref = firebase.database().ref('events')
    ref.on('child_added', snapshot => {
      event.push({
        id: snapshot.key,
        eventCity: snapshot.val().eventCity,
        currentDate: snapshot.val().currentDate,
        description: snapshot.val().description,
        eventName: snapshot.val().eventName,
        orgName: snapshot.val().orgName,
        url: snapshot.val().url,
        price: snapshot.val().price,
      });
      //console.log(event)
      current.setState({ events: event })
      this.GetQtData()

    }
    )
  }

  componentDidMount() {
    let event = [];
    let current = this;
    var ref = firebase.database().ref('events')
    ref.on('child_added', snapshot => {
      event.push({
        id: snapshot.key,
        eventCity: snapshot.val().eventCity,
        currentDate: snapshot.val().currentDate,
        description: snapshot.val().description,
        eventName: snapshot.val().eventName,
        orgName: snapshot.val().orgName,
        url: snapshot.val().url,
        price: snapshot.val().price,
      });
      current.setState({ events: event })
      this.GetQtData()

    }
    )
  }

  render() {

    //console.log(this.events)
    if (this.state.ready === true) {

      const { events } = this.state
      //console.log(this.state.events[0].description)
      // var EventDescription = this.state.events.description

    }
    return (

      this.state.ready ?
        <SafeAreaView style={styles.container}>
          <StatusBar hidden={true}></StatusBar>
          <Image style={styles.logoContainer} resizeMode='contain' source={require('../assets/images/logo.png')} />
          <View style={styles.lineSeparate}><Text></Text></View>
          <ScrollView>
            <FlatList
              data={this.state.events}
              renderItem={({ item }) => <Item
                eventName={item.eventName}
                orgName={item.orgName}
                eventCity={item.eventCity}
                description={item.description}
                currentDate={item.currentDate}
                url={item.url}
                price={item.price}
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
  lineSeparate: {
    height: 0.5,
    backgroundColor: '#000',
    marginTop: 5,
  },
  loadingContainer: {
    backgroundColor: '#FFF',
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
  listContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '#FFF',
    borderRadius: 9,
    borderColor: '#000',
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
  priceContainer: {
    alignSelf: 'flex-end',
    marginRight: 8,
  },
  eventTitle: {
    fontSize: 25,
    alignSelf: 'center',
    color: '#000',
    fontWeight: '700',
    marginBottom: 15,
    marginRight: 8,
    marginLeft: 8,
    marginTop: 8,
  },
  eventInfoTitle: {
    fontSize: 15,
    marginLeft: 8,
    marginRight: 8,
    fontWeight: '600',
    color: '#000',
  },
  eventPriceTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },
  eventInfos: {
    fontSize: 15,
    marginRight: 8,
    fontWeight: '300',
    color: '#000',
  },
  eventPrice: {
    color:'green',
    fontSize: 15,
    fontWeight: '600',
    color: 'green',
  },
  eventImage: {
    flexWrap: 'wrap',
    borderRadius: 9,
    height: 100,
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
  },

});