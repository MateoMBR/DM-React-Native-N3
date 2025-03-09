import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';

function CocktailsScreen() {
  const [cocktails, setCocktails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState('a');
  const navigation = useNavigation();

  useEffect(() => {
    fetchCocktails();
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Favorites')}>
          <Text style={styles.headerRight}>⭐</Text>
        </TouchableOpacity>
      ),
    });
  }, []);

  const fetchCocktails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}${page}`);
      setCocktails([...cocktails, ...response.data.drinks]);
      setPage(String.fromCharCode(page.charCodeAt(0) + 1));
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator size="large" color="#0000ff" />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cocktails}
        keyExtractor={(item) => item.idDrink}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('CocktailDetail', { cocktailId: item.idDrink })}>
            <View style={styles.cocktailItem}>
              <Image source={{ uri: item.strDrinkThumb }} style={styles.image} />
              <Text style={styles.name}>{item.strDrink}</Text>
            </View>
          </TouchableOpacity>
        )}
        onEndReached={fetchCocktails}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
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
  headerRight: {
    fontSize: 24,
    marginRight: 10,
  },
});

export default CocktailsScreen;