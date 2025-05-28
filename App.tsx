// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, Platform } from 'react-native';
import Navigation from './src/navigation/Navigation';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor={Platform.OS === 'ios' ? '#fff' : '#fff'}
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
      />
      <Navigation />
    </NavigationContainer>
  );
}