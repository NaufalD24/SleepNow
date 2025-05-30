import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Router from './src/navigations/Router';
import { ThemeProvider } from './src/context/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
    <NavigationContainer>
      <Router />
    </NavigationContainer>
    </ThemeProvider>
  );
}
