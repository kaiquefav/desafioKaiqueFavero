import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, ShadowPropTypesIOS,StatusBar } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Colors from '../constants/Colors'
import HomeScreen from './HomeScreen'


export default function DetalhesScreen(detalhes) {
  return (
    <View style={styles.container}>
      <StatusBar hidden={true}></StatusBar>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Text style={{ alignContent: 'center' }}></Text>
      </ScrollView>
    </View>
  );
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