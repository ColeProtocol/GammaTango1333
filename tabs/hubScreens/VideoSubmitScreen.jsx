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
import {useDispatch } from 'react-redux';
import { GestureHandlerRefContext } from '@react-navigation/stack';
import { TaskManager } from 'expo';
import uuid from 'uuid-random'
import { NewLineKind } from 'typescript';
//import {vidPost} from './../otherScreens/vidPost';

export default function VideoSaveScreen(props) {
  const navigation = useNavigation();
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState(''); 
  const [requestRunning, setRequestRunning] = useState(false)
  const [time, setTime] = useState('');
  const [RandomUuid, setRandomUuid] = uuid();
  const [user, setUser] = useState('');
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

 const handleSavePost = ()=> {
    setRequestRunning(true)

    createPost(props.route.params.source)
     .then(setRequestRunning(false))
     .then(console.log("video was posted?"))
     .catch(() => reject())

  }
  console.log(props.route.params.source)
  const saveMediaToStorage = (media, path) => new Promise((resolve, reject) => {
    const fileRef = firebase.storage().ref().child(path);
    fetch(media)
    .then(response => response.blob())
    .then(blob => fileRef.put(blob))
    .then(task => task.ref().getDownloadURL())
    .then(downloadUrl => resolve(downloadUrl))

    .catch(() => reject())
  });
  const  createPost = (media) => new Promise((resolve, reject) => {
    console.log('Videos/${' + firebase.currentUser.uid + '/${' +uuid() +'}}')
    saveMediaToStorage(media, 'Videos/${' + firebase.currentUser.uid + '/${' +uuid() +'}}')
    .then((downloadUrl) => {
      firebase.firestore()
      .collection('Videos')
      .add({
          body: props.route.params.source,
          VideoURI: downloadUrl,
          displayName: currentUser,
          email: currentEmail,

          title: title,
          description: description,
          timestamp: date,
          likes: 0,
          dislikes: 0,
      })
      .then (() => resolve())
      .catch(() => reject())
    }).catch(() => reject())
  });

  function newVideo() {
    const getData = async () => {
      const val = await AsyncStorage.getItem("@user_data").catch(console.log);
      const json = JSON.parse(val);
      console.log(json)
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
        });
    };

    getData();
  }



  const uploadFile = async (blob) => {
    const val = await AsyncStorage.getItem("@user_data").catch(console.log);
      const json = JSON.parse(val);
    const ref = await firebase.storage()
      .ref('Videos/' +user +'/' +title + "" + RandomUuid )
      .put(blob);

    const url = ref.getDownloadURL();

    return ref; // <-- Url that returns your uploaded image

}
const uploadImage = async(imageResp) => {
  const blob = await imageResp.blob();
  var ref =   firebase.storage().ref().child("Videos/" + user + RandomUuid);
  return ref.put(blob);
}
 const handleSubmit = async (currentEmail, currentUser, currentPicture) => {
    try {
      const val = await AsyncStorage.getItem("@user_data").catch(console.log);
      const json = await JSON.parse(val);
       setUser( json.user['Title'] + " " +  json.user['name'] + " " +  json.user['Battalion']);
      console.log(json.user['Title']);

      setRequestRunning(true);
      const res = await fetch(props.route.params.source)
      console.log(res + "res");
      if(res == null || res == undefined) {
        console.log("its gone")
      }
      var blobs = await res.blob();
        console.log(blobs + "blobs");
      if(blobs == null || blobs == undefined) {
        console.log("blobs its gone")
      }
      console.log("user is " + currentUser);
      console.log(RandomUuid + "uuid")
      const fileRefs = firebase.storage().ref().child('Videos/' +currentUser +'/' + title + '/' + RandomUuid);

      var downlod = await fileRefs.put(blobs);
         console.log(blobs + "downlod");
      if(downlod == null || downlod == undefined) {
        console.log("downlod its gone")
      }
      var urly = await downlod.ref.getDownloadURL();
       console.log(urly + "urly");
      if(urly == null || urly == undefined) {
        console.log("urly its gone")
      } 
      var dlurly = /*await resolve(*/urly/*);*/
      console.log(dlurly + "dlurly");
      if(dlurly == null || dlurly == undefined) {
        console.log("dlurly its gone")
      } 

      const dateInMillis  = firebase.firestore.Timestamp.now().seconds * 1000
      var date = new Date(dateInMillis).toDateString() + ' at ' + new Date(dateInMillis).toLocaleTimeString()
      setTime(date)

       firebase.app()
        .firestore()
        .collection("Videos")
        .doc(currentUser).set({id: currentUser})
      firebase.app()
        .firestore()
        .collection("Videos")
        .doc(currentUser)
        .collection("Videos")
        .add({
          body:urly,
          VideoURI:urly,
          displayName: currentUser,
          email: currentEmail,
          title: title,
          description: description,
          timestamp: date,
          likes: 0,
          dislikes: 0,
        })
        .then(() => {
          alert("Your post has been submitted!");
           setRequestRunning(false);
          navigation.goBack();
          

        })
        .catch((error) => {
          console.log("Error adding document: ", error);
           setRequestRunning(false);
        });

      
        
    } catch (error) {
      console.log(error);
      setRequestRunning(false);
    }
    
  };







 if(requestRunning){
   console.log(requestRunning)
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
              
              style = {styles.cancelbutton}>
                <Feather name = "x" size = {48} color = "red"/>
                <Text style = {styles.cancelButtonTxt}>submitting</Text>
            </TouchableOpacity>
             <TouchableOpacity
              //onPress = {() => newVideo()}
              
              style = {styles.postbutton}>
                <Feather name = "check" size = {48} color = "white"/>
               
                   
                  <Text style = {styles.postButtonTxt}>Submitting</Text>
                   
                
            </TouchableOpacity>
          </View>
          
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
              //onPress = {() => newVideo()}
              onPress = {() => newVideo()}
              style = {styles.postbutton}>
                <Feather name = "check" size = {48} color = "white"/>
               
                   
                  <Text style = {styles.postButtonTxt}>Submit</Text>
                   
                
            </TouchableOpacity>
          </View>
          
    </View>
    
  );
}

