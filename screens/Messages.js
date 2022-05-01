import React, { Component } from "react";
import { FlatList, StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { Avatar } from 'react-native-elements';
import { SafeAreaView } from "react-native-safe-area-context";
import { data } from '../components/users.js';
import { nameToInitials } from '../helper/helper'

// Definition of the styles of the screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatItem: {
    display: 'flex',
    flexDirection: 'row',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 50,
  },
  button: {
    backgroundColor: "#DDDDDD",
    padding: 10
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
});

// Defnition of the Messages Screen
const Messages = ({ navigation }) => {
  // Return the list of the people with their link to the chat under a SafeAreaView
  return (
    <SafeAreaView style={{ paddingBottom:-50 }}>
      <FlatList 
        data={data} renderItem={({ item }) =>
          <TouchableOpacity style={styles.button} onPress={() =>
            navigation.navigate('Chat', {userName: item.name})
          }>
            <View style={styles.chatItem}>
              <Avatar
                rounded
                title={nameToInitials(item.name)}
                size='small'
                source={{
                  uri:
                    'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                }}
              />
              <Text style={styles.item}>
                {item.name}
              </Text>
            </View>
          </TouchableOpacity>}
      />
    </SafeAreaView>
  );
}

export default Messages;