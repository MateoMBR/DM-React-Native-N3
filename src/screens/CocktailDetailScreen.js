import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

function CocktailDetailScreen({ route }) {
  const { cocktailId } = route.params;
  const [cocktail, setCocktail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCocktailDetails();
  }, []);

  const fetchCocktailDetails = async () => {
    try {
      const response = await axios.get(`${API_URL}${cocktailId}`);
      setCocktail(response.data.drinks[0]);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: cocktail.strDrinkThumb }} style={styles.image} />
      <Text style={styles.name}>{cocktail.strDrink}</Text>
      <Text style={styles.category}>{cocktail.strCategory}</Text>
      <Text style={styles.instructions}>{cocktail.strInstructions}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  category: {
    fontSize: 18,
    marginBottom: 10,
  },
  instructions: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default CocktailDetailScreen;