import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View } from 'react-native';


import data from './words.json'


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

  var formula = ":/w:/w:/w:/n/n/n"

  var passList = []
  for (let index = 0; index < 10; index++) {
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
      <StatusBar style="auto" />
      <Text>Basic</Text>
      <FlatList data={passList} 
      renderItem={({item}) => <Text style={styles.font}>{item}</Text>} />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: '#fff',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  font: {
    flex: 1,
    fontSize: 20,
    padding: 10,
    height: 44,
  }
});
