import React from 'react';
import { List, Avatar } from 'react-native-paper';

function CocktailItem({ item, onPress }) {
  return (
    <List.Item
      title={item.strDrink}
      description={item.strCategory}
      left={() => <Avatar.Image size={50} source={{ uri: item.strDrinkThumb }} />}
      onPress={() => onPress(item.idDrink)}
    />
  );
}

export default CocktailItem;