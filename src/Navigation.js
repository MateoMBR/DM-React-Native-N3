import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import ToDoListeScreen from './screens/ToDoListeScreen';
import WeatherAppScreen from './screens/WeatherAppScreen';
import CocktailsScreen from './screens/CocktailsScreen';
import CocktailDetailScreen from './screens/CocktailDetailScreen';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ToDoListe" component={ToDoListeScreen} />
        <Stack.Screen name="WeatherApp" component={WeatherAppScreen} />
        <Stack.Screen name="Cocktails" component={CocktailsScreen} />
        <Stack.Screen name="CocktailDetail" component={CocktailDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;