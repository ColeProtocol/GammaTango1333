import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firebase, * as Firebase from "firebase";
import { IconButton, Colors } from 'react-native-paper';

//import Icon from "react-native-vector-icons/FontAwesome";
/*import {
  FontAwesome as FontIcon,
  MaterialIcons as MatIcon,
  AntDesign as AntIcon,
  Entypo as EnIcon,
  Feather as FIcon,
} from "@expo/vector-icons";*/

export default function BookComponent({
  //topic_id,
  //id,
  title,
  content,
  date,
  author,


}) {
  const navigation = useNavigation();


  


  //console.log(
  //title,
  //content,
  //date,
  //);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        
        <View style={{flexDirection:'row'}}>

        </View>

        
        <Text style={styles.title}>{author}</Text>
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
    margin: 15,
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
