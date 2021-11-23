// components/login.js
import React from "react";
import {Text, View, StatusBar, TextInput, Alert, StyleSheet, Image} from "react-native";
import axios from "axios";
import Firebase from "../constants/FireBaseDb";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../constants/Colors";
import Button from "../components/Button";

const Login = ({ navigation }) => {
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [loading, setLoading] = React.useState(false);

  const storeData = async (value) => {
    await AsyncStorage.setItem("@user_data", JSON.stringify(value)).catch(
      console.log
    );
  };

  const userLogin = () => {
    if (email === "" && password === "") {
      Alert.alert("Enter details to signin!");
    } else {
      setLoading(true);
      axios
        .post("http://3.19.67.76:1337/auth/local", {
          identifier: email,
          password: password,
        })
        .then((response) => {
          // Handle success.
          console.log("Login successful!");
          // console.log('User profile', response.data.user);
          // console.log('User token', response.data.jwt);
          console.log(response.data.user);
          console.log(response.data.user["Title"]);
          console.log(response.data.user["Battalion"]);
          console.log(response.data.user["mame"]);
          storeData(response.data);

          const ref = Firebase.app().firestore().collection("users").doc(email);
          ref.get().then((docSnapshot) => {
            console.log(docSnapshot.exists);
            if (docSnapshot.exists) {
              navigation.reset({
                index: 0,
                routes: [{ name: "Tab Bar" }],
              });
            } else {
              Firebase.app().firestore().collection("users").doc(email).set({
                //Default user image (Torri)
                picture: "https://rakkasans.s3.us-east-2.amazonaws.com/Torri_62c8d090ee.png",
                userEmail: email,
                username: response.data.user.username,
                title: response.data.user["Title"],
                battlion: response.data.user["Battalion"],
                name: response.data.user["name"],
                forumLikes: [],
                forumDislikes: [],
              }); // create the document
              navigation.reset({
                index: 0,
                routes: [{ name: "Welcome Video" }],
              });
            }
          });
        })
        .catch((error) => {
          // Handle error.
          console.log("An error occurred:", error.response);
          setLoading(false);
          Alert.alert("Incorrect Credentials!");
          setPassword("");
        });
    }
  };

  const styles = StyleSheet.create({
    button: {
      backgroundColor: Colors.primary,
      marginHorizontal: 30,
      padding: 15,
      width: 275,
      height: 55,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
      shadowOffset: { width: 2, height: 2 },
      shadowColor: "black",
      shadowOpacity: 0.3,
      marginTop: 32,
    },

    buttonText: {
      color: "white",
      fontSize: 20,
      fontWeight: "bold",
    },

    textInput: {
      width: 300,
      height: 45,
      borderRadius: 9,
      borderBottomWidth: 1,
      borderColor: Colors.primary,
      marginHorizontal: 20,
      paddingLeft: 15,
      marginVertical: 5,
      fontSize: 16,
    },
    // logoText: {
    //   fontSize: 60,
    //   paddingTop: "84%",
    //   paddingLeft: 25,
    // },
  });

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <StatusBar barStyle="dark-content" />
      <View
        style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}
      >
        {/* <Text style={{ fontSize: 50, fontFamily: "reggae-one" }}>
          RAKKASANS
        </Text> */}
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          top: "-10%",
        }}
      >
        <Image
          source={require("../assets/images/rakklogo.png")}
          style={{ width: 320, height: 45 }}
        />

        <Text style={{ fontSize: 18, fontFamily: "reggae-one", top: "3%" }}>
          101st Airborne
        </Text>

        {/* <Text style={{ fontSize: 250 }}>⛩️</Text> */}
        <Image
          source={require("../assets/images/Torri.png")}
          style={{ width: 175, height: 175, top: "5%" }}
        />
      </View>

      <View style={{ flex: 1 }}>
        <TextInput
          placeholder="Email"
          style={styles.textInput}
          placeholderTextColor={Colors.gray}
          autoCorrect={false}
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Password"
          style={styles.textInput}
          placeholderTextColor={Colors.gray}
          secureTextEntry
          autoCorrect={false}
          autoCapitalize="none"
          value={password}
          onChangeText={setPassword}
          maxLength={30}
        />
      </View>

      <View style={{ flex: 0.5, alignItems: "center" }}>
        <Button title="Sign in" loading={loading} onPress={userLogin} />
        <Text
          style={{ height: 60, paddingVertical: 10, color: Colors.primary }}
        >
          Forgot password
        </Text>
      </View>
    </View>
  );
};

export default Login;
