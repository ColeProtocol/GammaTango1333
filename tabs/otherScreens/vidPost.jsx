import React, { useState, useEffect } from "react";
import {TouchableHighlight, FlatList, StyleSheet, Text, View} from "react-native";
import moment from "moment";
import Colors from "../../constants/Colors";
import { useIsFocused } from "@react-navigation/native";
import Post from "../../components/Post";
import Button from "react-native-button";
import firebase, * as Firebase from "firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from 'uuid-random'
//equire('firebase/firebase-auth')
//require('firebase/firestore')
export const vidPost = (title, description, video ) => dispatch => new Promise((resolve, reject) => {
  /*saveMediaToStorage (video, 'post/${firebase.auth().currentUser.uid}/$uuid()}')
  .then((downloadURL) => {
    firebase.firestore()
    .collection('post')
    .add({
      creator: firebase.auth().currentUser.uid,
      downloadUrl,
      description,
      title,
      likesCount: 0,
      commentsCount: 0,
      creation: firebase.firestore.FieldValue.serverTimestamp()
    }

    ).them(() => resolve())
    .catch(() => reject())
  }).catch(() => reject())*/
})
export const saveMediaToStorage = (media, path) => dispatch => new Promise((resolve, reject) => {
  /*const fileRed = firebase.storage().ref().child(path)
  fetch(media)
    .then(response => response.blob())
    .then(blob => fileRef.put(blob))
    .then(task => task.ref.getDownloadURL())
    .then(downloadURL => resolve(downloadUrl))*/
})

