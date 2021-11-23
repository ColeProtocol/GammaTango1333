import React, { useState } from 'react';
import {
  GiftedChat,
  Bubble,
} from 'react-native-gifted-chat';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
/// this is the actual component for the chatroom, might move it to components
export default function chatScreen() {
  const [messages, setMessages] = useState([
    {
      _id: 1,
      text: 'New room created.',
      createdAt: new Date().getTime(),
      system: true,
    },
    {
      _id: 2,
      text: 'Hello World',
      createdAt: new Date().getTime(),
      user: {
        _id: 2,
        name: 'Soldier Boy',
      },
    },
    {
      _id: 3,
      text: 'Hello there soldier',
      createdAt: new Date().getTime(),
      user: {
        _id: 3,
        name: 'Tay',
      },
    },
    {
      _id: 4,
      text: 'Welcome to the chat',
      createdAt: new Date().getTime(),
      user: {
        _id: 4,
        name: 'John',
      },
    },
  ]);
  const styles = StyleSheet.create({
    // scrolling
    bottomComponentContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },

    // this is for the loading anim
    loadingContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  // helper method that is sends a message
  function handleSend(newMessage = []) {
    setMessages(GiftedChat.append(messages, newMessage));
  }

  function renderBubble(props) {
    return (
      // Step 3: return the component
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            // Here is the color change
            backgroundColor: '#6646ee',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    );
  }
  function renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6646ee" />
      </View>
    );
  }
  function scrollToBottomComponent() {
    return (
      <View style={styles.bottomComponentContainer}>
        <IconButton icon="chevron-double-down" size={36} color="#6646ee" />
      </View>
    );
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={(newMessage) => handleSend(newMessage)}
      user={{ _id: 1 }} // just a placeholder user, have to update it to Kyle's user
      renderBubble={renderBubble}
      placeholder="Type in a message"
      // showUserAvatar add this prop when Matt has Avatars
      alwaysShowSend
      scrollToBottomComponent={scrollToBottomComponent}
      renderLoading={renderLoading}
    />
  );
}
