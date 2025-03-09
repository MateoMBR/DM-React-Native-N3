import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import AppNavigator from './src/Navigation';
import { FavoritesProvider } from './src/context/FavoritesContext';

export default function App() {
  return (
    <FavoritesProvider>
      <PaperProvider>
        <AppNavigator />
      </PaperProvider>
    </FavoritesProvider>
  );
}