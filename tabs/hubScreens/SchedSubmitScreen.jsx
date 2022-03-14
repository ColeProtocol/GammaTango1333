import React, { useRef, useState, useEffect, ActivityIndicator} from 'react';

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as firebase from "firebase";
import DateTimePicker from '@react-native-community/datetimepicker';

import {
  View,
  TextInput,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
  DrawerLayoutAndroidBase,
  Button, 
} from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import {Feather } from '@expo/vector-icons';
import{ Video } from 'expo-av'
import {useDispatch } from 'react-redux';
import { GestureHandlerRefContext } from '@react-navigation/stack';
import { TaskManager } from 'expo';
import uuid from 'uuid-random'
import { NewLineKind } from 'typescript';



export default function SchedSubmitScreen(props) {
    console.log(props);
  const navigation = useNavigation();
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState(''); 
  const [requestRunning, setRequestRunning] = useState(false)
  const [time, setTime] = useState('');
  const [RandomUuid, setRandomUuid] = useState('');
  const [user, setUser] = useState('');

  const [date1, setDate1] = useState(new Date(props.route.params.date.timestamp));
  const [date2, setDate2] = useState(new Date(props.route.params.date.timestamp));
  const [mode, setMode] = useState('time');//time mode
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [showEnd, setShowEnd] = useState(false);
  const [showStart, setShowStart] = useState(false);
  console.log("date 1 " + date1)
  console.log("date 2 " + date2)
  const onChange1 = (event, selectedTime) => {
    //const currentDate = selectedTime || date1;//original info. don't think its wrong so wont delete.'
    const currentDate = new Date(selectedTime.setDate(date2.getDate()))//new Date(new Date(props.route.params.date.timestamp).setHours(selectedTime.getHours(), selectedTime.getMinutes(), selectedTime.getSeconds()))//moment(selectedTime).add(date1);
    setShow1(Platform.OS === 'ios');
    setDate1(currentDate);
    setShow1(false);
    setShowStart(true);
    if(showEnd && showStart) {
        if(date1 > date2) {
            const date3 = date2;
            date2 = date1;
            date1 = date3;
        }
    }
   };
  const onChange2 = (event, selectedTime) => {
    //const currentDate = selectedTime || date2;
    const currentDate = new Date(selectedTime.setDate(date2.getDate()))//new Date(new Date(props.route.params.date.timestamp).setHours(selectedTime.getHours(), selectedTime.getMinutes(), selectedTime.getSeconds()))//moment(selectedTime).add(date1);
    setShow2(Platform.OS === 'ios');
    setDate2(currentDate);
    setShow2(false);
    setShowEnd(true);
    if(showEnd && showStart) {
        if(date1 > date2) {
            const date3 = date2;
            date2 = date1;
            date1 = date3;
        }
    }
   };
   const showTimepicker1 = () => {
    
    setShow1(true);
  };
    const showTimepicker2 = () => {
    
    setShow2(true);
  };

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
    },
    baseText: {
    fontFamily: "Cochin"
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold"
  },

     });




  function newSched() {
    const getData = async () => {
      const val = await AsyncStorage.getItem("@user_data").catch(console.log);
      const json = JSON.parse(val);



      
      firebase.app()
        .firestore()
        .collection("users")
        .doc(json.user.email)
        .get()
        .then((docSnapshot) => {
          handleSubmit( json.user.email, json.user['Title'] + " " + json.user['name'] + " " + json.user['Battalion']);

        });
    };

    getData();
  }



  

 const handleSubmit = async (currentEmail, currentUser) => {
    try {

   
      const dateInMillis  = firebase.firestore.Timestamp.now().seconds * 1000
      var date = new Date(dateInMillis).toDateString() + ' at ' + new Date(dateInMillis).toLocaleTimeString()
      setTime(date)
      setRandomUuid(uuid(16));
      await firebase.app()
        .firestore()
        .collection("calendar")
        .doc(currentUser).set({id: currentUser});
        
     
        console.log("datestring " );
        console.log( props.route.params.date.dateString);
      await firebase.app()
        .firestore()
        .collection("calendar")
        .doc(currentUser)
        .collection(props.route.params.date.dateString)
        .add({
          
          body:description,

          displayName: currentUser,
            
          title: title,
          description: description,
          timestamp: date,
          startTime: date1,
          endTime: date2,

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





  return (
    <View style = {styles.container}>
        
        <View style = {styles.formContainer}>
          <TextInput 
            style = {styles.inputText}
            multiline
            placeholder = "Title Event"
            onChangeText= {(text) => setTitle(text)}
          />
          <TextInput 
            style = {styles.inputText}
            multiline
            placeholder = "Describe Event"
            onChangeText= {(text) => setDescription(text)}
          />
         
        </View>
        <View style = {styles.buttonsContainer}>
         {showStart && (
        <Text>{"Starting time: " + date1}</Text>
        )}
        </View>
        <View style = {styles.buttonsContainer}>
        {showEnd && (
        <Text>{"Ending time: " + date2}</Text>
        )}
        </View>
         <View style = {styles.buttonsContainer} >
        </View>
         <View style = {styles.buttonsContainer} >
             <View style = {styles.buttonsContainer} >
                   <View>
                    <Button onPress={showTimepicker1} title="Select Start Time" />
                  </View>
            </View>
             <View style = {styles.buttonsContainer} >
                  <View>
                    <Button onPress={showTimepicker2} title="Select End Time!" />
                  </View>
            </View>
                  {show1 && (
                    <DateTimePicker
                    minimumDate={new Date(new Date(props.route.params.date.timestamp).setHours(24))}
                      testID="dateTimePicker1"
                      value={date1}
                      mode={mode}
                      is24Hour={true}
                      display="default"
                      onChange={onChange1}
                    />
                    )}
                    {show2 && (
                    <DateTimePicker
                    minimumDate={new Date(new Date(props.route.params.date.timestamp).setHours(24))}

                      testID="dateTimePicker2"
                      value={date2}
                      mode={mode}
                      is24Hour={true}
                      display="default"
                      onChange={onChange2}
                    />
                    )}
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
              onPress = {() => {
              newSched()
              }}
              style = {styles.postbutton}>
                <Feather name = "check" size = {48} color = "white"/>
               
                   
                  <Text style = {styles.postButtonTxt}>Submit</Text>
                   
              
            </TouchableOpacity>
        </View>
           
        </View>
    
  );
}

