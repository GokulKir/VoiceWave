// Importing core React and React Navigation dependencies
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';

// Importing the main Navigation component that holds the stack/tabs/screens
import Navigation from './src/navigation/Navigation';
import {StatusBar} from 'react-native';

// App entry point
export default function App() {
  return (
    // Wrapping the entire navigation structure inside NavigationContainer
    // This manages the navigation tree and contains the navigation state
    <NavigationContainer>
      {/* Custom Navigation component that contains all your screens */}
      <StatusBar backgroundColor={'#fff'} barStyle={'#000'} />
      <Navigation />
    </NavigationContainer>
  );
}
