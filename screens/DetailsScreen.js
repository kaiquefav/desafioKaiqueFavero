import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, ShadowPropTypesIOS, StatusBar, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Colors from '../constants/Colors'

export default function DetailsScreen({ route, navigation }) {
  const { description } = route.params;
  const { eventName } = route.params;
  const { orgName } = route.params;
  const { eventCity } = route.params;
  const { currentDate } = route.params;
  const { url } = route.params;
  const { price } = route.params;

  return (
    <ScrollView style={styles.container}>
      <StatusBar hidden={true}></StatusBar>
      {/* <View style={styles.lineSeparate}><Text></Text></View> */}
      <Image style={styles.eventImage} source={{ uri: url }} />
      <View style={styles.lineSeparate}><Text></Text></View>
      <View style={styles.titleContainer}><Text style={styles.textTitle}>{eventName}</Text></View>
      <Text style={styles.infosContainer}>Descrição do Evento:</Text><Text style={styles.descriptionText}>{description}</Text>
      <Text style={styles.infosContainer}>Organizado Por:</Text><Text style={styles.descriptionText}>{orgName}</Text>
      <Text style={styles.infosContainer}>Local:</Text><Text style={styles.descriptionText}>{eventCity}</Text>
      <Text style={styles.infosContainer}>Data:</Text><Text style={styles.descriptionText}>{currentDate}</Text>
      <Text style={styles.infosContainer}>Preço:</Text><Text style={styles.descriptionText}>R${price}<Text style={styles.priceText}>,00</Text></Text>
      <TouchableOpacity onPress={() => alert('Compra efetuada com sucesso!')} style={styles.buyButton}><Text style={styles.buyText}>Comprar</Text></TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgDefault,
  },
  titleContainer: {
    marginTop: 12,
    marginBottom: 10,
    backgroundColor: '#000',
  },
  infosContainer: {
    fontWeight: '800',
    fontSize: 17,
    paddingTop: 20,
    marginLeft: 10,
    marginBottom: 10,
  },
  lineSeparate: {
    height: 0.5,
    backgroundColor: '#000',
    marginTop: 5,
  },
  descriptionText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '300',
  },
  priceText: {
    fontSize: 16,
    fontWeight: '300',
  },
  textTitle: {
    fontSize: 25,
    alignSelf: 'center',
    fontWeight: '700',
    marginTop: 10,
    marginBottom: 10,
    color: '#FFF',
  },
  buyButton: {
    marginBottom: 15,
    backgroundColor: '#000',
    borderRadius: 8,
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    width: 100
  },
  buyText: {
    color: '#FFFFFF',
    alignSelf: 'center',
    paddingVertical: 12,
    fontWeight: '500',
    fontSize: 15,
    alignItems: 'center'
  },
  eventImage: {
    height: 200,
    resizeMode: 'cover',
    marginTop: 10,
  },
});