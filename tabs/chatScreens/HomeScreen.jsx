import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import CustomListItem from "../../components/CustomListItem";
import { Avatar } from "react-native-elements";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import Firebase from "../../constants/FireBaseDb";
import Colors from "../../constants/Colors";
import Dimensions from "../../constants/Dimensions";
import UserList from "./UserList";
import { IconButton } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { doc } from "prettier";
import { useFocusEffect } from '@react-navigation/native';
//import CryptoJS from 'crypto-js';

/**HOME SCREEN
 * This screen contains a list of all of the avaliable
 * conversations, from here you can click on any conversation
 * and navigate into that specifc chat screen.
 */
const HomeScreen = ({ route, navigation }) => {
  const [chats, setChats] = useState([]); //sign out function not necessary right now
  const [picture, setPicture] = useState();
  const [currentEmail, setUser] = useState();
  const [ids, setIds] = useState([]);

  /*     const signOutUser = () =>  {
        Firebase.auth().signOut().then(() => {
            navigation.replace("Login"); //change this to "Chat" to use our login
        });
    }; */

    function setData(){
      var email;
      const getData = async (callback) => {
        const val = await AsyncStorage.getItem("@user_data").catch(console.log);
        const json = JSON.parse(val);
        console.log(json.user.email);
        console.log(json.user.username);
        
        email = json.user.email;
        callback(getIDs(email));
      };
      console.log('read chat database')
      getData();
      
    }

    const getIDs = async (email) => {
      console.log("inside id function: " + email);
      const response = await Firebase.app().firestore().collection('users').doc(email).collection('chats').get();

        var chatArr = [];
        
        response.forEach(doc => {
          console.log(doc.data().chatID);
          chatArr.push(doc.data().chatID);
        });

        var chatInfo = [];
        for(var i = 0; i < chatArr.length; i++){
          await Firebase.app().firestore().collection("chats").doc(chatArr[i]).get().then((doc) => {
            console.log(doc.id);
            //console.log(doc);
            console.log(doc.get("chatName"));
             var elem = {
               id: doc.id,
               chatName: doc.get("chatName")
             }

             chatInfo.push(elem);
            
          });
        }
        
        console.log(chatInfo);
        setChats(chatInfo);

    }

    
    
    useEffect(() => {
      setData();
   
  }, []);

  useLayoutEffect(() => {
    
    navigation.setOptions({
      title: "Chat",
      headerStyle: {
        backgroundColor: Colors.primary,
        fontSize: 25,
        /*fontFamily: "fira-sans",*/
      },
      headerTitleStyle: {
        color: Colors.white,
        fontSize: 25,
        /*fontFamily: "fira-sans",*/
      },
      headerTintColor: "white", //button to log-out now needed rn
      /*              headerLeft: () => (
            <View style={{ marginLeft: 20 }}>
                <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
                    <Avatar rounded source={{ uri: Firebase.auth()?.currentUser?.photoURL }}/>
                </TouchableOpacity>
            </View>
            ), */ headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            //width: 40,
            //marginRight: 20,
          }}
        >
          {/*<TouchableOpacity activeOpacity={0.5}>
                <AntDesign name="camerao" size={24} color="black" />
          </TouchableOpacity> */}
          <TouchableOpacity
            style={{ marginTop: "15%" }}
            onPress={() => navigation.navigate(UserList)} //button to create a new chat
            activeOpacity={0.5}
          >
            <SimpleLineIcons name="pencil" size={24} color={Colors.white} />
          </TouchableOpacity>

          <TouchableOpacity
            style={{ marginTop: "15%", paddingLeft: 7 }}
            onPress={() => setData()} //button to create a new chat
            activeOpacity={0.5}
          >
            <SimpleLineIcons name="refresh" size={24} color={Colors.white} />
          </TouchableOpacity>

          <IconButton
            icon="account"
            onPress={() => navigation.navigate("Account")}
            title="Account"
            color="#fff"
          />
        </View>
      ),
    });
  }, [navigation]);

  const enterChat = (id, chatName) => {
    const getData = async () => {
      const val = await AsyncStorage.getItem("@user_data").catch(console.log);
      const json = JSON.parse(val);
  
      Firebase.app().firestore().collection('users').doc(json.user.email).get().then((docSnapshot) => {
        console.log(docSnapshot.get('picture'));
        navigation.navigate("ChatScreen", {
          id: id,
          chatName: chatName,
          currentUser: json.user['Title'] + " " + json.user['name'] + " " + json.user['Battalion'],
          currentEmail: json.user.email,
          currentPicture: docSnapshot.get('picture')
        });
      });
    };
  
    getData();
  }; //function to navigate with an id and chat name

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {chats.map(({ id, chatName}) => (
          <CustomListItem
            key={id}
            id={id}
            chatName={chatName}
            enterChat={enterChat}
          /> //sets up the list of conversations
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});
