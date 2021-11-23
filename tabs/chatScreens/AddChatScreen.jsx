import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import {Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import Firebase from "../../constants/FireBaseDb";
import { Colors } from 'react-native/Libraries/NewAppScreen';

/**ADD CHAT SCREEN
 * Simple page with a text field to name and
 * create a new chat. This creates the chat in
 * firesbase as well.
 */
const AddChatScreen = ({navigation, route}) => {
    const {userList} = route.params;
    //alert(userList);
    const [input, setInput] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Add a New Chat",
            //headerBackTitle: "Chats",
            headerRight: null,
            headerLeft: () => (
                <TouchableOpacity 
                    style={{ marginLeft: 10}}
                    onPress={navigation.goBack}    
                >
                    <AntDesign name="arrowleft" size={24} color="white" />
                </TouchableOpacity>
            ), //back button
        })

    }, [navigation]);

    const createChat = async () => {
        await Firebase.app().firestore().collection('chats').add({
            chatName: input
        }).then((docRef) => {
            console.log(docRef.id)
            console.log(userList.length)
            for(var i = 0; i < userList.length ; i++){
                Firebase.app().firestore().collection('users').doc(userList[i]).collection('chats').add({
                    chatID: docRef.id, //just sets photo to a default, need to write function to set this in profile screen 
                  })
            }
            //navigation.goBack()
            navigation.navigate("Chat")
        }).catch((error) => alert(error));
    }; //function to put chat in firebase

    return (
        <View style={styles.container}>
            <Input 
                placeholder="Enter a chat name"
                value={input}
                onChangeText={(text) => setInput(text)}
                onSubmitEditing={createChat} //calls create chat when text is submitted
                leftIcon={
                    <Icon name="wechat" type="antdesign" size={24} color="black" />
                }
            />
            <Button disabled={!input} onPress={createChat} title="Create new Chat" buttonStyle={{ backgroundColor: "#020a41" }}/> 
        </View> //also calls create chat when button is hit
    )
} 

export default AddChatScreen;



const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 30,
        height: "100%",
        fontFamily: "andale-mono",
    }
});