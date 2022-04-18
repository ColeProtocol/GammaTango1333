import React, { useState, useEffect } from "react";
import Firebase from "../../constants/FireBaseDb";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Dimensions from "../../constants/Dimensions";
import Colors from "../../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as firebase from "firebase";

const { width, height } = Dimensions.window;

export default function NewVid({ route }) {
  const navigation = useNavigation();
  const {
    //topic_id,
    topic_title,
    uri,
    currentEmail,
    currentUser,
    currentPicture,

  } = route.params;

  const [vid, setvid] = useState("");
  const [title, setTitle] = useState("");

  //console.log(topic_id, title, vid, currentEmail, currentUser, currentPicture);

  const handleSubmit = async () => {
    
    try {
        if(title == "") {
         alert("title  required");
         throw new Error('Required');
        }
      const dateInMillis  = firebase.firestore.Timestamp.now().seconds * 1000
      var date = new Date(dateInMillis).toDateString() + ' at ' + new Date(dateInMillis).toLocaleTimeString()

      Firebase.app()
        .firestore()

        .collection("UserInfo")
        .doc(currentUser)
        .collection("vids")
        .add({
          body: vid,
          displayName: currentUser,
          email: currentEmail,
          picture: currentPicture,
          title: title,
          timestamp: date,
          likes: 0,
          dislikes: 0,
        })
        .then(() => {
          alert("Your vid has been submitted!");
          navigation.goBack();
        })
        .catch((error) => {
          console.log("Error adding document: ", error);
        });
    } catch (error) {
      console.log(error);
    }
    }
  };

  return (
    <ScrollView>
      <View>
        <Text style={styles.header, styles.topicTitle}>{topic_title}</Text>
        <TextInput
          placeholder="Enter title"
          style={styles.titleInput}
          placeholderTextColor={Colors.gray}
          autoCorrect={false}
          autoCapitalize="none"
          value={title}
          onChangeText={(val) => setTitle(val)}
          maxLength={300}
        />
        <TextInput
          placeholder="Enter vid"
          style={styles.textInput}
          placeholderTextColor={Colors.gray}
          autoCorrect={false}
          autoCapitalize="none"
          value={vid}
          onChangeText={(val) => setvid(val)}
          maxLength={300}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            handleSubmit();
          }}
        >
          <Text style={styles.buttonText}>vid</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blue5,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: Colors.primary,
    height: 65,
    marginHorizontal: 30,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.2,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    ///*fontFamily: "fira-sans",*/
  },
  topicTitle: {
    fontSize: 30,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
    textTransform: "capitalize"
  },
  titleInput: {
    ///*fontFamily: "fira-sans",*/
    height: 50,
    borderRadius: 15,
    borderWidth: 0.5,
    marginHorizontal: 20,
    paddingLeft: 15,
    marginVertical: 5,
    borderColor: "rgba(0,0,0,0.2)",
  },
  textInput: {
    ///*fontFamily: "fira-sans",*/
    height: 300,
    borderRadius: 25,
    borderWidth: 0.5,
    marginHorizontal: 20,
    paddingLeft: 15,
    marginVertical: 5,
    borderColor: "rgba(0,0,0,0.2)",
  },
  header: {
    textAlign: "center",
    paddingVertical: 20,
  },
});
