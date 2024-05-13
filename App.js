import { StatusBar } from 'expo-status-bar';
import { Button, FlatList, Text, TextInput, View, TouchableOpacity } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';

import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { generateSecureRandom } from 'react-native-securerandom';


import data from './words.json'
import { useState } from 'react';
import * as Styles from './Styles';


const Space = () => <View style={Styles.general.spacer} />;
const Line = () => <View style={Styles.general.line} />;

const H = ({ children }) => {
  return (
    <View style={Styles.disclaimer.highlight}>
      <Text style={({ color: Styles.colors.midground })}>
        {children}
      </Text>
    </View>
  )
}


const defaultFormula = "/w-/w#/n/n/n";

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

  if (passList == "none") {
    console.log("Queued password list build. Expect re-render.")
    buildPassList().then((ret) => { setPassList(ret) })
  }

  console.log("App render.")


  return (
    <View style={Styles.general.container}>
      <StatusBar style="dark" />
      <Space />

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
            setPassList("none")
          }} />


      </View>

      <Line />

      {/* Password List */}
      <FlatList data={passList}
        contentContainerStyle={Styles.password.list}
        renderItem={({ item, index }) =>
          <TouchableOpacity
            activeOpacity={0.4}
            onPress={() => { Clipboard.setString(item) }}
          >
            <View
              style={Styles.password.password}>

              <Text style={Styles.password.index}>
                {index + 1}
              </Text>

              <View style={Styles.password.lineVertical} />

              <Text
                style={Styles.password.text}>
                {item}
              </Text>

            </View>
          </TouchableOpacity>
        } />

      <Line />

      {/* Refresh Button */}
      <View style={Styles.refreshButton.container}>
        <View style={Styles.refreshButton.spacer} />
        <View style={Styles.refreshButton.spacer}>
          <Button
            style={Styles.refreshButton.button}
            title='Refresh'
            color={Styles.colors.primary}
            onPress={() => { setPassList("none") }}
          />
        </View>

        <View style={Styles.refreshButton.spacer} />
      </View>

      {/* Disclaimer */}
      <View style={[Styles.disclaimer.container]}>

        <Text style={[Styles.disclaimer.regular]}>
          /w - Random dictionary word
        </Text>

        <Text style={Styles.disclaimer.regular}>
          /c - Random lower-case characters
        </Text>

        <Text style={Styles.disclaimer.regular}>
          /n - Random number 0-9
        </Text>

        <Text style={[Styles.disclaimer.regular, { margin: 10 }]}>
          Generated passwords are never saved or transmitted.
          All generation is run locally. Use at your own risk.
        </Text>

      </View>
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
    var formula = await storage.load({ key: "formula" })
  } catch (err) {
    if (!err.message.includes("Not Found!")) {
      console.warn(err)
    }
    var formula = defaultFormula
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


