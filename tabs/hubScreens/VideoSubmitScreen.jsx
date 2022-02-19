import React, { useRef, useState, useEffect, ActivityIndicator} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as firebase from "firebase";
import {
  View,
  TextInput,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
  DrawerLayoutAndroidBase,
} from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import {Feather } from '@expo/vector-icons';
import{ Video } from 'expo-av'
//import {vidPost} from './../otherScreens/vidPost';

export default function VideoSaveScreen(props) {
  const navigation = useNavigation();
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState(''); 
  const [requestRunning, setRequestRunning] = useState(false)

  
 const styles = StyleSheet.create({
     container : {
           flex: 1,
           //marginTop: 50,
          backgroundColor: 'white',    
          paddingTop: 30
     },
     formContainer :{
      margin: 20,
      flexDirection: 'row',
      
     },
     space: {
       flex:1
     },
    inputText: {
      paddingVertical: 10,
      marginRight: 20,
      flex: 1
    },
    buttonsContainer : {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginVertical: 20
    },
    mediaPreview: {
      //aspectRatio : 9 / 16,
      backgroundColor: 'black',
      width: 200,
      height: 400,
    },
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
    uploadingContainer : {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    postbutton: {
      backgroundColor: 'green',
      alignItems: 'center',
      flex: 1,
      borderColor: 'gray',
      borderWidth: 1,
      flexDirection: 'row',
      paddingVertical: 10,
      paddingHorizontal : 20,
      justifyContent: 'center',
      borderRadius: 6,
      marginRight: 10,
      
    },
    postButtonTxt: {
      fontWeight: 'bold',
      color: 'white',
      marginLeft: 7,
      fontSize: 16
    }
     });
 /*const handleSavePost = ()=> {
    setRequestRunning(true)
    dispatch(vidPost(title, description, props.route.params.source))
      .then(() => navigation.dispatch(StackActions.popToTop()))
      .catch(() => setRequestRunning(false))
  }*/
  console.log(props.route.params.source)
  
  function newVideo() {
    const getData = async () => {
      const val = await AsyncStorage.getItem("@user_data").catch(console.log);
      const json = JSON.parse(val);
      console.log(json.user.email);
      console.log(json.user.username);
      console.log(json.user['Title'] + " " + json.user['name'] + " " + json.user['Battalion']);

      firebase.app()
        .firestore()
        .collection("users")
        .doc(json.user.email)
        .get()
        .then((docSnapshot) => {
          handleSubmit( json.user.email, json.user['Title'] + " " + json.user['name'] + " " + json.user['Battalion'], docSnapshot.get("picture"));
         /* navigation.navigate("New Video", {
            //topic_id: topic_id,
            topic_title: title,
            topic_description: description,
            uri: props.route.params.source,
            currentUser: json.user['Title'] + " " + json.user['name'] + " " + json.user['Battalion'],
            currentEmail: json.user.email,
            currentPicture: docSnapshot.get("picture"),
          });*/
        });
    };

    getData();
  }
 const handleSubmit = async (currentEmail, currentUser, currentPicture) => {
    try {
      const dateInMillis  = firebase.firestore.Timestamp.now().seconds * 1000
      var date = new Date(dateInMillis).toDateString() + ' at ' + new Date(dateInMillis).toLocaleTimeString()
      
      //console.log( title, props.route.params.source, currentEmail, currentUser, currentPicture);
      console.log( title, props.route.params.source, currentEmail, currentUser, currentPicture);
      firebase.app()
        .firestore()
        .collection("Videos")
        //.doc(topic_id)
        //.collection("posts")
        .add({
          body: props.route.params.source,
          VideoURI: props.route.params.source,
          displayName: currentUser,
          email: currentEmail,
          //picture: currentPicture,
          title: title,
          description: description,
          //timestamp: firebase.firestore.Timestamp.now(),
          timestamp: date,
          likes: 0,
          dislikes: 0,
        })
        .then(() => {
          alert("Your post has been submitted!");
          navigation.goBack();
        })
        .catch((error) => {
          console.log("Error adding document: ", error);
        });
    } catch (error) {
      console.log(error);
    }
  };







 if(false){
    return (
      <View style= {styles.uploadingContainer}>
          <ActivityIndicator color = 'red' size = 'large'/>
      </View>
    )
 }
  return (
    <View style = {styles.container}>
        
        <View style = {styles.formContainer}>
          <TextInput 
            style = {styles.inputText}
            multiline
            placeholder = "Title video"
            onChangeText= {(text) => setTitle(text)}
          />
          <TextInput 
            style = {styles.inputText}
            multiline
            placeholder = "Describe video"
            onChangeText= {(text) => setDescription(text)}
          />
        <Video 
          style={styles.mediaPreview}
          shouldPlay={true}
          source = {{uri: props.route.params.source}}
        />
         
        </View>
        <View style = {styles.space}/>
        <View style = {styles.buttonsContainer} >
            <TouchableOpacity
              onPress = {() => navigation.goBack()}
              style = {styles.cancelbutton}>
                <Feather name = "x" size = {48} color = "red"/>
                <Text style = {styles.cancelButtonTxt}>Cancel</Text>
            </TouchableOpacity>
             <TouchableOpacity
              onPress = {() => newVideo()}
              style = {styles.postbutton}>
                <Feather name = "check" size = {48} color = "white"/>
                <Text style = {styles.postButtonTxt}>Submit</Text>
            </TouchableOpacity>
          </View>
          
    </View>
    
  );
}
