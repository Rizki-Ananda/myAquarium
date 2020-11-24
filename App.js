import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import { login, register, dashboard, setup} from './assets/pages';
import firebase from './assets/config';
import { Provider } from 'react-redux'
import {store} from './assets/redux';

console.log(firebase);

const Stack = createStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={login} />
        <Stack.Screen name="Dashboard" component={dashboard} />
        <Stack.Screen name="Register" component={register} />
        <Stack.Screen name="Setup" component={setup} />
      </Stack.Navigator>
      <StatusBar backgroundColor="#A2D9ED"/>
      </NavigationContainer>
    </Provider>
  );
}

export default App;