import React, { useState } from "react";
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

export default function NewComment({ route }) {
  const navigation = useNavigation();
  const { topic_id, post_id } = route.params;

  const [comment, setComment] = useState("");
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [uID, setID] = useState();
  const [picture, setPicture] = useState();


  const getData = async () => {
    const val = await AsyncStorage.getItem("@user_data").catch(console.log);
    const json = JSON.parse(val);

    Firebase.app()
        .firestore()
        .collection("users")
        .doc(json.user.email)
        .get()
        .then((docSnapshot) => {
          setPicture(docSnapshot.get("picture"))
        });

    setUsername(json.user.username);
    setEmail(json.user.email);
    setID(json.user.id);
  };

  getData();

  const handleSubmit = async () => {
    try {
      const dateInMillis  = firebase.firestore.Timestamp.now().seconds * 1000
      var date = new Date(dateInMillis).toDateString() + ' at ' + new Date(dateInMillis).toLocaleTimeString()

      Firebase.app().firestore().collection('forums').doc(topic_id).collection('posts').doc(post_id)
      .collection('comments').doc().set({
        body: comment,
        email: email,
        id: uID,
        displayName: username,
        picture: picture,
        //timestamp: firebase.firestore.Timestamp.now(),
        timestamp: date,
        likes: 0,
        dislikes: 0,
      })
      .then(() => {
        alert("Your comment has been posted!");
        navigation.goBack();
      })
      .catch((error) => {
        alert("Error adding document: ", error);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView>
      <View>
        <TextInput
          placeholder="Enter Post"
          style={styles.textInput}
          placeholderTextColor={Colors.gray}
          autoCorrect={false}
          autoCapitalize="none"
          value={comment}
          onChangeText={(val) => setComment(val)}
          maxLength={300}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            Keyboard.dismiss();
            handleSubmit();
          }}
        >
          <Text style={styles.buttonText}>Post</Text>
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
});