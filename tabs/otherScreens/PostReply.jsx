import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import { BaseRouter } from '@react-navigation/native';
import homeFeed from './PostClasses/DummyPosts';
import Firebase from '../../constants/FireBaseDb';
import Colors from '../../constants/Colors';
import Comment from '../../components/Comment';
import replyThread from './PostClasses/ReplyThread';

export default function PostReply({ navigation, route }) {
  const [post, setPost] = useState('');
  const userName = Firebase.auth().currentUser.displayName;
  const userEmail = Firebase.auth().currentUser.email;

  const handleSubmit = () => {
    console.log(replyThread.length);
    replyThread.unshift({ user: userName, username: userEmail, content: post });
    console.log(replyThread.length);
    // navigation.navigate("Post Detail");
    navigation.goBack();
    alert(`Replying to Post ${post}`);
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.blue5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      backgroundColor: Colors.primary,
      height: 65,
      marginHorizontal: 30,
      borderRadius: 35,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 5,
      shadowOffset: { width: 2, height: 2 },
      shadowColor: 'black',
      shadowOpacity: 0.2,
      marginTop: 10,
    },
    buttonText: {
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
    },
    textInput: {
      height: 300,
      width: 300,
      borderRadius: 25,
      borderWidth: 0.5,
      marginHorizontal: 20,
      paddingLeft: 15,
      marginVertical: 5,
      borderColor: 'rgba(0,0,0,0.2)',
    },
  });
  return (
    <View>
      <Comment data={route.params.post} />
      <TextInput
        placeholder="Enter Awesome Reply"
        style={styles.textInput}
        placeholderTextColor={Colors.gray}
        autoCorrect={false}
        autoCapitalize="none"
        value={post}
        onChangeText={(val) => setPost(val)}
        maxLength={300}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          Keyboard.dismiss();
          handleSubmit();
        }}
      >
        <Text style={styles.buttonText}>Reply</Text>
      </TouchableOpacity>
    </View>
  );
}
