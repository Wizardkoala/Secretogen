import { StatusBar } from 'expo-status-bar';
import {Button, FlatList, Text, TextInput, View } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';

import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { generateSecureRandom } from 'react-native-securerandom';


import data from './words.json'
import { useState } from 'react';
import * as Styles from './Styles';


const defaultFormula = "/w-/w#/n/n/n";

const storage = new Storage({
  size: 50,
  storageBackend: AsyncStorage,
  defaultExpires: 30 * 1000 * 60,
  enableCache: false,
})


export default function App() {
  console.log("App render.")
  const [formula, setFormula] = useState("base")
  const [passList, setPassList] = useState("none")

  //   Generate passwords
  
  
  
  if (passList == "none") {
    buildPassList().then((ret) => {setPassList(ret)})
    console.log("Queued password list build. Expect re-render.")
  }
  
  if (formula == "base") {
    console.log("Retrieving formula. Expect re-render.")
    storage.load({
      key: "formula"
    }).then(ret => setFormula(ret))
    .catch(err => {
      if (err != "NotFoundError") {
        setFormula(defaultFormula)
      }
    })
  }
  
  return (
    <View style={Styles.general.container}>
      <StatusBar style="dark" />
      <View style={ Styles.general.spacer } />
      
      {/* Formula box */}
      <View style={Styles.formulaBox.background}>

        <Text style={Styles.formulaBox.title}>
          Formula
        </Text>

        <TextInput
          numberOfLines={1}
          autoCapitalize='none'
          autoComplete='off'
          defaultValue={formula}
          style={Styles.formulaBox.input}
          onSubmitEditing={(event) => {
            storage.save({
              key: "formula",
              data: event.nativeEvent.text,
              expires: null
            })
            setFormula(event.nativeEvent.text)
          }} />


      </View>

      <View style={Styles.general.line} />

      <FlatList data={passList} 
      style={Styles.general.passList}
      renderItem={({item}) => 
        <View style={Styles.general.password}>
          <Text onPress={() => { Clipboard.setString(item) }} style={Styles.general.text}>
            {item}
          </Text>
        </View>
      } />

      <Button 
        disabled={false}
        title='Refresh'
        color={Styles.colors.primary}
        onPress={() => { setPassList("none") } }
      />
      <Text style={ Styles.general.disclaimer }>
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
      var formula = defaultFormula
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

  return passwordList

}



