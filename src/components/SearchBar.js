import React from 'react';
import { Searchbar } from 'react-native-paper';

function SearchBar({ value, onChangeText, onSubmitEditing }) {
  return (
    <Searchbar
      placeholder="Rechercher par ingrédient"
      value={value}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmitEditing}
    />
  );
}

export default SearchBar;