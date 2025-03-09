import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Card, Text } from 'react-native-paper';

function WeatherItem({ item }) {
  return (
    <Card style={styles.forecastItem}>
      <Card.Content style={styles.content}>
        <Text>{new Date(item.dt * 1000).toLocaleString()}</Text>
        <Text>{item.main.temp} °C</Text>
        <Image
          style={styles.icon}
          source={{ uri: `http://openweathermap.org/img/wn/${item.weather[0].icon}.png` }}
        />
        <Text>{item.weather[0].description}</Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  forecastItem: {
    marginVertical: 10,
    borderRadius: 5,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    width: 50,
    height: 50,
  },
});

export default WeatherItem;