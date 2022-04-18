import { ScrollView, StyleSheet, Text, View, FlatList, TouchableHighlight} from "react-native";
import React, { useState, useEffect } from "react";
import moment from 'moment';
import Post from "../../components/Post";
import Comment from "../../components/Comment";
import firebase, * as Firebase from "firebase";
import Button from "react-native-button";
import Colors from "../../constants/Colors";

export default function ReadBook({ route}) {
  /*const {   videoURI,
 } = route.params*/
        /*<Video 
          style={styles.mediaPreview}
          shouldPlay={true}
          source = {{uri: props.route.params.source}}
        />*/
  //console.log(route)
  //console.log(route.params.content)
  //firebase.database().ref('Videos/${' + json.user['Title'] + " " + json.user['name'] + " " + json.user['Battalion'] + '/${' +title + "" + time+/*+uuid()*/ +'}}'))
 const author = route.params.author
 const content = route.params.content
  return (
    <View style = {styles.container}>
        
        <View style = {styles.formContainer}>
          <Text style = {styles.title}>
          {route.params.title}
          
          
          </Text>
          <Text style = {styles.author}>
          {route.params.author}
          </Text>
          <ScrollView>
           <Text>
          
          {route.params.content}
          </Text>
          </ScrollView>
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
      flexDirection: 'column',
      
     },
  title :{
      fontSize: 20,
     },
  author :{
    fontSize: 15,
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
