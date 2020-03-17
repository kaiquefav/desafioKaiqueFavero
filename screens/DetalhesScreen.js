import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, ShadowPropTypesIOS, StatusBar, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Colors from '../constants/Colors'
import HomeScreen from './HomeScreen'


export default function DetalhesScreen({ route, navigation }) {
  const { descricaoE } = route.params;
  const { nomeE } = route.params;
  return (
    <View style={styles.container}>
      <StatusBar hidden={true}></StatusBar>
      <View style={styles.tituloContainer}><Text style={styles.tituloTexto}>{nomeE}</Text></View>
      <ScrollView>
        <View style={styles.descricaoContainer}><Text style={styles.textoDescricao}>{descricaoE}</Text></View>
        <View style={styles.containerComprar}><TouchableOpacity onPress={() => alert('Compra efetuada com sucesso!')} style={styles.botaoComprar}><Text style={styles.textoComprar}>Comprar</Text></TouchableOpacity></View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgDefault,
  },
  descricaoContainer: {
    paddingTop: 30,
    marginTop: 12,
    marginLeft: 10,
    marginBottom:10,
  },
  textoDescricao: {
    fontSize: 18,
    fontWeight: '300',
    marginLeft: 10,
  },
  tituloTexto: {
    fontSize: 25,
    alignSelf: 'center',
    fontWeight: '700',
  },
  tituloContainer: {
    marginTop: 10,
    alignContent: 'center',
    justifyContent: 'center',
  },
  containerComprar: {
    marginTop: 15,
    alignContent: 'center',
    borderRadius: 8,
    borderColor: '#000',
  },
  botaoComprar: {
    backgroundColor: '#000',
    borderRadius: 8,
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    width: 100
  },
  textoComprar: {
    color: '#FFFFFF',
    alignSelf: 'center',
    paddingVertical: 12,
    fontWeight: '500',
    fontSize: 15,
    alignItems: 'center'
  },
});