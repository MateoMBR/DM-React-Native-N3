import React from 'react';
import { View, Text, Button } from 'react-native';

function HomeScreen({ navigation }) {
  return (
    <View>
      <Text>Bienvenue dans l'application multi-parties</Text>
      <Button title="ToDoListe" onPress={() => navigation.navigate('ToDoListe')} />
      <Button title="WeatherApp" onPress={() => navigation.navigate('WeatherApp')} />
      <Button title="Cocktails" onPress={() => navigation.navigate('Cocktails')} />
    </View>
  );
}

export default HomeScreen;