import 'react-native-gesture-handler';
import React from 'react';
import  { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import Inputs from "./components/inputs";
import MovieList from "./components/movieList";
const Stack = createStackNavigator();


export default function App() {
  return (
      <NavigationContainer>
          <Stack.Navigator>
              <Stack.Screen
                  name="Home"
                  component={Inputs}
                  options={{title: 'Welcome'}}
              />

              <Stack.Screen
                  name="MovieList"
                  component={MovieList}/>

          </Stack.Navigator>
      </NavigationContainer>
  );
}
