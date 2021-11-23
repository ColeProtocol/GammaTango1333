import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View, Image } from "react-native";
import ImagePicker from 'react-native-image-picker';
import { useNavigation } from "@react-navigation/native";


import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../constants/Colors";
import Dimensions from "../constants/Dimensions";
import ListItem from "../components/ListItem";
import UserIcon from "../components/UserIcon";
import Firebase from "../constants/FireBaseDb";

export default function UserProfile({ route }) {
  const { user, email } = route.params;
  const [picture, setPicture] = useState();
  const navigation = useNavigation();

  Firebase.app().firestore().collection('users').doc(email).get().then((docSnapshot) => {
      setPicture(docSnapshot.get('picture'));
      //alert(picture);
  });
  console.log(picture);
  console.log(email);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      height: "100%",
      backgroundColor: Colors.white,
    },
    profileContainer: {
      flexDirection: "row",
    },
    profileInfo: {
      flexDirection: "column",
      justifyContent: "center",
    },

    listContainer: {
      backgroundColor: Colors.white,
      width: "100%",
      borderBottomColor: Colors.darkGray,
      borderBottomWidth: 1,
    },
    logoutContainer: {
      backgroundColor: Colors.white,
      width: "100%",
      borderBottomColor: Colors.darkGray,
      borderBottomWidth: 1,
      marginTop: 35,
    },
    name: {
      fontSize: 26,
      color: Colors.darkGray,
      textTransform: "capitalize",
    },
    email: {
      fontSize: 16,
      color: Colors.gray,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: picture }}
          style={{ width: 100, height: 100, borderRadius: 400/ 2, margin:10 }}
        />

        <View style={styles.profileInfo}>
          <Text style={[styles.name, Dimensions.font]}>{user}</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <ListItem
          title="Send a message"
          leftIcon="chevron-right"
          onPress={() => navigation.navigate("UserList")} 
        />
      </View>
    </View>
    
  );
}
