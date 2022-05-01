import * as React from 'react';
import { useState, useCallback, useEffect, useLayoutEffect } from 'react'
import { View, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

// Definition of the function
const Chat = ({ navigation }) => {
  // Definition and initialisation of the messages in the chat
  const [messages, setMessages] = useState([]);

  // onSend is a function to update the chat with the new message typed by the user. The chat does not save any message.
  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])
  // Return the chat under a SafeAreaView
  return (
    <SafeAreaView style={{ flex: 1}}>
      <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      alwaysShowSend
      scrollToBottom
      />
    </SafeAreaView>
  );

}
export default Chat;
