import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View } from 'react-native';


import data from './words.json'


function RandInt(min, max) {
  return Math.round(min + (Math.random() * (max - min)))
}


export default function App() {

  var words = data.Words
  var formula = ":/w:/w:/w:/n/n/n"

  var passList = []
  for (let index = 0; index < 10; index++) {
    numbers.push(words[RandInt(1, 90000)])
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Basic</Text>
      <FlatList data={numbers} 
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
