import React, { useEffect, useLayoutEffect, useState } from 'react';
import {StyleSheet, View, Text } from 'react-native';
import { ListItem, Avatar } from "react-native-elements";
import Dimensions from '../constants/Dimensions';
import Firebase from "../constants/FireBaseDb";
//import CryptoJS from 'crypto-js';

/**CUSTOM LIST ITEM
 * creates the list of chats for the 
 * conversations page/home page.
 */
const CustomListItem = ({ id, chatName, enterChat }) => {
    const [chatMessages, setChatMessages] = useState([]);

    useEffect(() => {
        const unsubscribe = Firebase.app().firestore() //db
        .collection("chats")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => setChatMessages(snapshot.docs.map((doc) => doc.data())));
        //{CryptoJS.AES.decrypt(doc.data(), 'secret key 123').toString(CryptoJS.enc.Utf8)}
        
        return unsubscribe
    }); //accessing firebase


    return (
        <ListItem key={id} onPress={() => enterChat(id, chatName)} key={id} bottomDivider>
            <Avatar
                rounded
                source={{
                    uri: chatMessages?.[0]?.photoURL || "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png"
                }}
            />
            <ListItem.Content>
                <ListItem.Title style={{ fontWeight: "800", fontFamily: "andale-mono" }}>
                    {chatName} 
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                    {chatMessages?.[0]?.displayName}: {chatMessages?.[0]?.message}
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    ); //all the elements in the list
};

export default CustomListItem

const styles = StyleSheet.create({})