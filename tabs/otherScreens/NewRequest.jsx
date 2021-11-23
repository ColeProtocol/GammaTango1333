import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Dimensions from "../../constants/Dimensions";
import Colors from "../../constants/Colors";
import getData from "../../assets/Async/getData";
import { useNavigation } from "@react-navigation/native";
//import Firebase from "../../constants/FireBaseDb";

const { width, height } = Dimensions.window;

export default function NewRequest({ route }) {
  const navigation = useNavigation();
  //const { topic_id, topic_title } = route.params;
  const [requestDescription, setPost] = useState("");
  //const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    try {
      const val = await AsyncStorage.getItem("@user_data").catch(console.log);
      const json = JSON.parse(val);

      //setEmail(json.user.email);
      let { jwt } = await getData();

      axios
        .post(
          "http://3.19.67.76:1337/requested-features",
          {
            email: json.user.email,
            requestDescription: requestDescription,
          },
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        )
        .then((response) => {
          // Handle success.
          alert("Submission was recorded! Thank you!");
          //console.log(response.data);
          navigation.navigate("Hub");
        })
        .catch((error) => {
          // Handle error.
          console.log("An error occurred:", error.response);
        });
    } catch (error) {
      console.log(error);
    }
  };

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
      fontSize: 25,
      paddingVertical: 20,
    },
  });

  return (
    <View>
      <Text style={styles.header}>
        Add what you would like to see in RAKapp!
      </Text>
      <TextInput
        placeholder="Enter a description of the feature you would like to see on RAKApp"
        style={styles.textInput}
        placeholderTextColor={Colors.gray}
        autoCorrect={false}
        autoCapitalize="none"
        value={requestDescription}
        onChangeText={(val) => setPost(val)}
        maxLength={300}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          Keyboard.dismiss();
          if (requestDescription == "") {
            alert("Please make sure a description is filled.");
          } else {
            handleSubmit();
          }
        }}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}
