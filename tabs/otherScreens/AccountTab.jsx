import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../../constants/Colors";
import Dimensions from "../../constants/Dimensions";
import ListItem from "../../components/ListItem";
import UserIcon from "../../components/UserIcon";
import Firebase from "../../constants/FireBaseDb";

export default function AccountTab({ navigation }) {
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [picture, setPicture] = useState();

  useEffect(() => {
    const getData = async () => {
      const val = await AsyncStorage.getItem("@user_data").catch(console.log);
      const json = JSON.parse(val);

      setUsername(json.user['Title'] + " " + json.user['name'] + " " + json.user['Battalion']);
      setEmail(json.user.email);
      //setImageUri(json.user.profile_picture.url);
      Firebase.app()
        .firestore()
        .collection("users")
        .doc(json.user.email)
        .get()
        .then((docSnapshot) => {
          setPicture(docSnapshot.get("picture"));
        });
      console.log(picture);
    };
    getData();
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      height: "100%",
      backgroundColor: Colors.white,
    },
    profileContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    profileInfo: {
      alignItems: "center",
      flexDirection: "column",
      justifyContent: "center",
      marginTop: 20,
      marginBottom: 20,
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
      fontSize: 20,
      color: Colors.gray,
    },
  });

  const signOutUser = () => {
    AsyncStorage.removeItem("@user_Data")
      .then(() =>
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        })
      )
      .catch(console.log);
  };

  const signOutAlert = () =>
    Alert.alert(
      "Sign out",
      "Are you sure you want to sign out of RAKapp?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Sign out",
          style: "destructive",
          onPress: signOutUser,
        },
      ],
      { cancelable: true }
    );

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.profileInfo}>
          <Text style={[styles.name, Dimensions.font]}>{username}</Text>
          <Text style={[styles.email, Dimensions.font]}>{email}</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <ListItem
          title="Preferences"
          leftIcon="chevron-right"
          onPress={
            () => navigation.navigate("Preferences")
            //navigation.dispatch("Account"))
          }
        />
        <ListItem
          title="Terms & Agreements"
          leftIcon="chevron-right"
          onPress={() =>
            alert(
              "This feature is not available in the alpha version of RAKapp. Check back at a later time."
            )
          }
        />
      </View>
      <View style={styles.logoutContainer}>
        <ListItem
          danger
          title="Sign out"
          leftIcon="close-box"
          onPress={signOutAlert}
        />
      </View>
    </View>
  );
}
