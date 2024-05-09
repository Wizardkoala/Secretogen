import { StatusBar } from 'expo-status-bar';
import {Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';

import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';


import data from './words.json'
import { useState } from 'react';


const storage = new Storage({
  size: 50,
  storageBackend: AsyncStorage,
  defaultExpires: 30 * 1000 * 60,
  enableCache: false,
})


function RandInt(min, max) {
  return Math.round(min + (Math.random() * (max - min)))
}

function RandWord() {
  return data.Words[RandInt(0, data.Words.length)]
}
function RandChar() {
  return data.Alphabet[RandInt(0, 25)]
}


export default function App() {
  // Preset formula
  const [formula, setFormula] = useState("/w-/w(/n/n/n/n)")
  const [passList, setPassList] = useState([])

  storage.load({
    key: "formula",
  })
  .then(ret => {setFormula(ret)})
  .catch(err => {
    console.warn(err.message)
  })

  //   Generate passwords

  // Prevent duplicate lists from being generated
  if (passList.length > 0) {
    setPassList([])
  }
  // Build password list
  for (let index = 0; index < 7; index++) {
    var newPassword = formula

    // Replace flags with words, characters, or numbers
    while (newPassword.includes("/w")) {
      newPassword = newPassword.replace("/w", RandWord())
    }
    while (newPassword.includes("/c")) {
      newPassword = newPassword.replace("/c", RandChar())
    }
    while (newPassword.includes("/n")) {
      newPassword = newPassword.replace("/n", RandInt(0, 9))
    } 

    passList.push(newPassword)
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={ styles.spacer } />
      <TextInput 
        numberOfLines={1}
        autoCapitalize='none'
        autoComplete='off'
        defaultValue={formula}
        onSubmitEditing={(event) => {
          storage.save({
            "key": "formula",
            "data": event.nativeEvent.text,
          })
          setFormula(event.nativeEvent.text)
          }}/>

      <View style={styles.spacer} />

      <FlatList data={passList} 
      style={styles.passList}
      renderItem={({item}) => 
        <View style={styles.password}>
          <Text onPress={() => { Clipboard.setString(item) }} style={styles.text}>
            {item}
          </Text>
        </View>
      } />

      <Button 
        disabled={false}
        title='Refresh'
        color={Colors.accent}
        onPress={() => { setPassList([]) } }
      />
      <Text style={ styles.disclaimer }>
        Generated passwords are never saved or transmitted.
        All generation is run locally. Use at your own risk.
      </Text>
    </View>
  );
}

const Colors = {
  text: "#fff",
  primary: "#917E5D",
  accent: "#E6AC47",
  midground: "#838C96",
  background: "#e3e3e9"
}


const styles = StyleSheet.create({
  passList: {
    flex: 10
  },
  spacer: {
    flex: 1,
    minHeight: 10,
    maxHeight: 40
  },
  disclaimer: {
    alignContent: 'flex-end',
    marginTop: 10,
  },
  refreshButton: {
    alignContent: "flex-end",
    margin: 10
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.background,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  text: {
    color: Colors.text,
    fontSize: 20,
  },
  password: {
    backgroundColor: Colors.midground,
    borderRadius: 20,
    minWidth: 300,
    padding: 15,
    paddingHorizontal: 25,
    marginBottom: 8
  }
});
