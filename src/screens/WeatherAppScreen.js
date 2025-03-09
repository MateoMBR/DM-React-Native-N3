import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';

const API_KEY = '7e8e2e58051fba9a97cdd779cb4910c6';

function WeatherAppScreen() {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      const { latitude, longitude } = location.coords;
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
      );
      setWeather(weatherResponse.data);

      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
      );
      setForecast(forecastResponse.data);
    })();
  }, []);

  if (errorMsg) {
    return (
      <View style={styles.container}>
        <Text>{errorMsg}</Text>
      </View>
    );
  }

  if (!weather || !forecast) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>{weather.name}</Text>
      <Text>{weather.main.temp} °C</Text>
      <Text>{weather.weather[0].description}</Text>
      <Image
        style={styles.icon}
        source={{ uri: `http://openweathermap.org/img/wn/${weather.weather[0].icon}.png` }}
      />
      <FlatList
        data={forecast.list}
        keyExtractor={(item) => item.dt.toString()}
        renderItem={({ item }) => (
          <View style={styles.forecastItem}>
            <Text>{new Date(item.dt * 1000).toLocaleString()}</Text>
            <Text>{item.main.temp} °C</Text>
            <Image
              style={styles.icon}
              source={{ uri: `http://openweathermap.org/img/wn/${item.weather[0].icon}.png` }}
            />
            <Text>{item.weather[0].description}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 50,
    height: 50,
  },
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
});

export default WeatherAppScreen;