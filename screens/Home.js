import React, { useState } from "react";
import { View } from "react-native";
import {Avatar, Badge, withBadge } from 'react-native-elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import Search from './Search.js';
import Profile from './Profile.js';
import Messages from './Messages.js';

// Definition of the Home Screen
const Tab = createBottomTabNavigator();

export default function Home({ navigation}) {
  // Return the bottom bar (Navigation Bar) between Profile, Search and Messages
  return (
    <Tab.Navigator initialRouteName="Search" screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Profile" component={Profile} options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="user" size={size} color={color} />
        )
      }} />
      <Tab.Screen name="Search" component={Search} options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="search" size={size} color={color} />
        )
      }} />
      <Tab.Screen name="Messages" component={Messages} options={{
        tabBarIcon: ({ color, size }) => (
          <View>
            <Icon name="comments" size={size} color={color} />
              <Badge
                status="error"
                value={15}
                containerStyle={{ position: 'absolute', top: -4, right: -4 }}
              />
          </View>
          )
        }} />
    </Tab.Navigator>
  );
}