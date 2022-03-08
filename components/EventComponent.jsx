import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firebase, * as Firebase from "firebase";
import { IconButton, Colors } from 'react-native-paper';
import{ Video } from 'expo-av'
import moment from 'react-moment';
//import Icon from "react-native-vector-icons/FontAwesome";
/*import {
  FontAwesome as FontIcon,
  MaterialIcons as MatIcon,
  AntDesign as AntIcon,
  Entypo as EnIcon,
  Feather as FIcon,
} from "@expo/vector-icons";*/

export default function EventComponent({
    body,
    displayName,    
    title,
    description,
    timestamp,
    startTime,
    endTime,
}) {
  const navigation = useNavigation();
  const starti = new Date();
  console.log("this is time " + startTime.seconds)
  const start = new Date(startTime.seconds);
  const end = new Date(endTime.seconds)


  
  //let date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(start)
  //const star = moment(startTime,"hh:mm A")
 //const endi = moment(endTime,"hh:mm A");
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
