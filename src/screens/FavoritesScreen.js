import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useFavorites } from '../context/FavoritesContext';

function FavoritesScreen({ navigation }) {
  const { favorites } = useFavorites();

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.idDrink}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('CocktailDetail', { cocktailId: item.idDrink })}>
            <View style={styles.cocktailItem}>
              <Image source={{ uri: item.strDrinkThumb }} style={styles.image} />
              <Text style={styles.name}>{item.strDrink}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  cocktailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
  },
});

export default FavoritesScreen;