import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Card } from 'react-native-paper';

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>Bienvenue dans l'application multi-parties</Text>
          <Button mode="contained" onPress={() => navigation.navigate('ToDoListe')} style={styles.button}>
            ToDoListe
          </Button>
          <Button mode="contained" onPress={() => navigation.navigate('WeatherApp')} style={styles.button}>
            WeatherApp
          </Button>
          <Button mode="contained" onPress={() => navigation.navigate('Cocktails')} style={styles.button}>
            Cocktails
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    marginVertical: 10,
  },
});

export default HomeScreen;