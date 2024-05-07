import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import RNFS from 'react-native-fs';

function RandInt(min, max) {
  return Math.round(min + (Math.random() * (max - min)))
}

import RNFS from 'react-native-fs';

const filePath = RNFS.MainBundlePath + '/myfile.txt'; // Assuming you copied the file to document directory at runtime

const readFile = async () => {
  try {
    const response = await RNFS.readFile(filePath, 'utf8');
    // Process the data from response
  } catch (error) {
    console.error(error);
  }
};



export default function App() {

  var numbers = []
  for (let index = 0; index < 30; index++) {
    numbers.push(RandInt(1, 3))
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Basic</Text>
      {/* <FlatList data={numbers} 
      renderItem={({item}) => <Text style={styles.font}>{item}</Text>} /> */}
      
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
