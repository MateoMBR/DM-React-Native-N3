import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

function WeatherItem({ item }) {
  return (
    <View style={styles.forecastItem}>
      <Text>{new Date(item.dt * 1000).toLocaleString()}</Text>
      <Text>{item.main.temp} °C</Text>
      <Image
        style={styles.icon}
        source={{ uri: `http://openweathermap.org/img/wn/${item.weather[0].icon}.png` }}
      />
      <Text>{item.weather[0].description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  forecastItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#ccc',
    borderColor: 'black',
    borderWidth: 1,
  },
  icon: {
    width: 50,
    height: 50,
  },
});

export default WeatherItem;