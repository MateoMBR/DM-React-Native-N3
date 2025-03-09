import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, FlatList, ActivityIndicator } from 'react-native';
import { Text, Card } from 'react-native-paper';
import * as Location from 'expo-location';
import axios from 'axios';
import WeatherItem from '../components/WeatherItem';

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
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>{weather.name}</Text>
          <Text style={styles.temp}>{weather.main.temp} °C</Text>
          <Text style={styles.description}>{weather.weather[0].description}</Text>
          <Image
            style={styles.icon}
            source={{ uri: `http://openweathermap.org/img/wn/${weather.weather[0].icon}.png` }}
          />
        </Card.Content>
      </Card>
      <FlatList
        data={forecast.list}
        keyExtractor={(item) => item.dt.toString()}
        renderItem={({ item }) => <WeatherItem item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    marginBottom: 20,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center',
  },
  temp: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  icon: {
    width: 50,
    height: 50,
    alignSelf: 'center',
  },
});

export default WeatherAppScreen;