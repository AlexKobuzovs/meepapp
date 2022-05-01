import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home.js';
import Login from './Login.js';
import Profile from './Profile.js';
import Settings from './Settings.js';
import Chat from './Chat.js';

// Helper file to navigate between screens fluently
const Stack = createNativeStackNavigator(screens);

const screens = {
  Login: {
    screen: Login
  },
  Home: {
    screen: Home
  },
  Profile: {
    screen: Profile
  },
  Settings: {
    screen: Settings
  },
  Chat: {
    screen: Chat
  }
}

// Creation of a Container to navigate between screens. Load as default the Login page.
export default () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false  }} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Chat" component={Chat} options={({route}) => ({title: route.params.userName})}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};