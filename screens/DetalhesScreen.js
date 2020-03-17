import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, ShadowPropTypesIOS } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Colors from '../constants/Colors'
import HomeScreen from './HomeScreen'


export default class DetalhesScreen extends React.Component {
render() {
let user=[]
user=this.context
console.log('user: '+user)
console.log('context: '+this.context)
  return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
  <Text style={{ alignContent: 'center' }}>{user.nomeE}</Text>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgDefault,
  },
  contentContainer: {
    paddingTop: 30,
  },
});