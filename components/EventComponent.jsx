import React, { useState } from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firebase, * as Firebase from "firebase";
import {Feather } from '@expo/vector-icons';
import { IconButton, Colors, TouchableOpacity } from 'react-native-paper';
import{ Video } from 'expo-av'
import moment from 'react-moment';


export default function EventComponent({
    id,
    body,
    displayName,    
    title,
    description,
    timestamp,
    startTime,
    endTime,
    owner,
    currentday,
}) {
  const navigation = useNavigation();
  const starti = new Date();
  console.log("this is time " + startTime.seconds)
  const start = new Date(startTime.seconds*1000);
  const end = new Date(endTime.seconds*1000)

  /*async function deleteEvent() {
   Firebase.app().firestore().collection("calendar").doc(owner).collection(currentday).doc(id).delete()
  }*/

 console.log(startTime)
  console.log(
    body,
    displayName,    
    title,
    description,
    timestamp,
    startTime,
    endTime,);
  return (
    <View style={styles.container}>


      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        
        <View style={{flexDirection:'row'}}>
          <Text>    {body}
            
          </Text>
          <Text>    {description}
            
          </Text>
        </View>

        <Text style={styles.date}>{"Starting time: " + start}</Text> 
        <Text style={styles.date}>{"Starting time: " + end}</Text>
       
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
 cancelbutton: {
      alignItems: 'center',
      flex: 1,
      borderColor: 'gray',
      borderWidth: 1,
      flexDirection: 'row',
      paddingVertical: 10,
      paddingHorizontal : 20,
      justifyContent: 'center',
      borderRadius: 6,
      marginRight: 10
    },
cancelButtonTxt: {
      fontWeight: 'bold',
      color: 'red',
      marginLeft: 7,
      fontSize: 16
    },
  container: {
    width: 385,
    borderColor: "#D1D1D1",
    borderWidth: 1,
    marginHorizontal: 5,
    marginVertical: 10,
  },
  user: {
    flex: 1,
    textAlign: "center",
  },
  username: {
    fontSize: 20,
  },
  header: {
    flexDirection: "row",
    backgroundColor: "#EFEFEF",
    alignItems: "center",
  },
  content: {
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginTop: -15,
    fontWeight: "bold",
    textTransform: "capitalize"
  },
  content_text: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
  },
  date: {
    fontSize: 14,
    color: "dimgray",
    textAlign: "right",
    //marginTop: 15,
  },
});
