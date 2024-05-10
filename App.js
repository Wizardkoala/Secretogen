import { StatusBar } from 'expo-status-bar';
import {Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';

import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { generateSecureRandom } from 'react-native-securerandom';


import data from './words.json'
import { useState } from 'react';


const storage = new Storage({
  size: 50,
  storageBackend: AsyncStorage,
  defaultExpires: 30 * 1000 * 60,
  enableCache: false,
})



export default function App() {
  const [formula, setFormula] = useState("base")
  const [passList, setPassList] = useState("none")

  //   Generate passwords

  if (passList == "none") {
    buildPassList().then((ret) => {setPassList(ret)})
  } else {
    console.log(passList)
  }

  // Prevent duplicate lists from being generated
  // Build password list
  

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
            key: "formula",
            "data": event.nativeEvent.text,
            expires: null
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
        onPress={() => { setPassList("none") } }
      />
      <Text style={ styles.disclaimer }>
        Generated passwords are never saved or transmitted.
        All generation is run locally. Use at your own risk.
      </Text>
    </View>
  );
}




async function RandInt(min, max) {
  var randByte = await generateSecureRandom(1)
  randByte = randByte / 256
  return Math.round(min + (randByte * (max - min)))
}

async function RandWord() {
  return data.Words[await RandInt(0, data.Words.length)]
}
async function RandChar() {
  return data.Alphabet[await RandInt(0, 25)]
}

async function buildPassList() {

  try {
    var formula = await storage.load({key: "formula"})
  } catch (err) {
    if (err == "NotFoundError") {
      var formula = "/w-/w#/n/n/n"
    } else {
      console.warn(err.message)
    }
  }


  var passwordList = []

  for (let index = 0; index < 7; index++) {
    var newPassword = formula

    // Replace flags with words, characters, or numbers
    while (newPassword.includes("/w")) {
      newPassword = newPassword.replace("/w", await RandWord())
    }
    while (newPassword.includes("/c")) {
      newPassword = newPassword.replace("/c", await RandChar())
    }
    while (newPassword.includes("/n")) {
      newPassword = newPassword.replace("/n", await RandInt(0, 9))
    }

    passwordList.push(newPassword)
  }

  return passwordList, formula

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
