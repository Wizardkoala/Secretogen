import { StatusBar } from 'expo-status-bar';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';


import data from './words.json'
import { useState } from 'react';

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
  const [formula, setFormula] = useState(":/w:/w:/n/n")
  const [test, setTest] = useState("Base Value")

  console.log(test)

  // Generate passwords
  var passList = []
  for (let index = 0; index < 7; index++) {
    var newPassword = formula

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
        defaultValue=":/w:/w:/n/n"
        onSubmitEditing={(event) => setFormula(event.nativeEvent.text)}/>

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
        onPress={console.log("Refresh1")}
        title='Refresh'
        color={Colors.accent}
      />
      <Text style={ styles.disclaimer }>
        Generated passwords are never saved or transmitted.
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
