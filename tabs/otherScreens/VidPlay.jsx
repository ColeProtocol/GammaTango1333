import { ScrollView, StyleSheet, Text, View, FlatList, TouchableHighlight} from "react-native";
import React, { useState, useEffect } from "react";
import moment from 'moment';
import Post from "../../components/Post";
import Comment from "../../components/Comment";
import * as Firebase from "firebase";
import Button from "react-native-button";
import Colors from "../../constants/Colors";
import{ Video } from 'expo-av'
export default function VidPlay({ route}) {
  /*const {   videoURI,
 } = route.params*/
        /*<Video 
          style={styles.mediaPreview}
          shouldPlay={true}
          source = {{uri: props.route.params.source}}
        />*/
  console.log(route)
  console.log(route.params.videoURI)
  return (
    <View style = {styles.container}>
        
        <View style = {styles.formContainer}>
          <Video 
            style={styles.mediaPreview}
            shouldPlay={true}
            source = {{uri: route.params.videoURI}}
          />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mediaPreview: {
     backgroundColor: 'black',
      //flex: 1,
      width: 250,
     height: 500,
      /*flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',*/
  },
  formContainer :{
      margin: 20,
      flexDirection: 'row',
      
     },
  container: {
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  date: {
    fontWeight: "200",
    fontSize: 12,
    color: "#474747"
  },
  nameContainer: {
    flex: 1,
    flexDirection: "row",
    paddingTop: 20
  },
  buttonView: {
    width: "100%"
  },
  title: {
    fontSize: 24,
    paddingBottom: 10
  },
  name: {
    fontWeight: "500",
    fontSize: 12,
    marginRight: 5,
    color: "#474747"
  },
  post: {
    paddingBottom: 15
  },
  borderContainer: {
    borderBottomColor: "#939393",
    borderBottomWidth: .5
  },
  reply: {
    paddingBottom: 10
  },
  padding: {
    paddingHorizontal: 10
  }
});
