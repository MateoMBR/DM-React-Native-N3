import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { Text, Button, Searchbar, List } from 'react-native-paper';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import CocktailItem from '../components/CocktailItem';

const API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';
const SEARCH_URL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';

function CocktailsScreen() {
  const [cocktails, setCocktails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState('a');
  const [search, setSearch] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    fetchCocktails();
    navigation.setOptions({
      headerRight: () => (
        <Button icon="star" onPress={() => navigation.navigate('Favorites')}>
          Favoris
        </Button>
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

  const searchCocktails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${SEARCH_URL}${search}`);
      setCocktails(response.data.drinks);
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
      <Searchbar
        placeholder="Rechercher par ingrédient"
        value={search}
        onChangeText={setSearch}
        onSubmitEditing={searchCocktails}
      />
      <FlatList
        data={cocktails}
        keyExtractor={(item) => item.idDrink}
        renderItem={({ item }) => (
          <List.Item
            title={item.strDrink}
            description={item.strCategory}
            left={() => <List.Icon icon="glass-cocktail" />}
            onPress={() => navigation.navigate('CocktailDetail', { cocktailId: item.idDrink })}
          />
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
  headerRight: {
    fontSize: 24,
    marginRight: 10,
  },
});

export default CocktailsScreen;