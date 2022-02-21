import React, {useEffect, useState } from "react";

import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

import Colors from "../constants/Colors";
import Dimensions from "../constants/Dimensions";
import SquareButton from "../components/SquareButton";
import Button from "react-native-button";
import AppleMap from "../components/AppleMap";

import axios from "axios";
import getData from "../assets/Async/getData";

let pdfURL;

const getBluebook = async () => {
  let { jwt } = await getData();
  const request = await axios.get("http://3.19.67.76:1337/Bluebooks", {
       headers: {
            Authorization: `Bearer ${jwt}`,
       },
  });
  const url = request.data;
  pdfURL = url[0].URL;
  //console.log(pdfURL);
};

export default function HubTab() {
  const navigation = useNavigation();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [id, setID] = useState();

  getBluebook();

  useEffect(() => {
    const getData = async () => {
      const val = await AsyncStorage.getItem("@user_data").catch(console.log);
      const json = JSON.parse(val);

      setUsername(json.user.username);
      setEmail(json.user.email);
      setID(json.user.id);

      Firebase.app().firestore().collection('users').doc(email).get().then((docSnapshot) => {
        setPicture(docSnapshot.get('picture'));
      });
    };

    getData();
  });

  return (
    <ScrollView style={styles.contentContainerStyle}>
      <View style={styles.container}>
        <Image
          source={require("../assets/images/Torri.png")}
          style={{ width: 30, height: 30, top: "2%", paddingBottom: 5 }}
        />
        <Text style={[styles.maptext, Dimensions.font]}>3rd BDE AO</Text>
        <TouchableOpacity
          onPressIn={() => navigation.navigate("KMZ Map")}
          style={styles.map}
          accessibilityRole="imagebutton"
        >
          <AppleMap />
        </TouchableOpacity>

        <View style={[styles.buttonView, { paddingTop: 5 }]}>
          <SquareButton
            name="Battalions"
            text="Battalions"
            buttonSize={75}
            textSize={10}
            onPress={() => navigation.navigate("Battalions")}
            hubIcon={true}
          />
          <SquareButton
            name="History"
            text="RAK History"
            buttonSize={75}
            textSize={10}
            onPress={() => navigation.navigate("RAK History")}
            hubIcon={true}
          />
        </View>
        <View style={styles.buttonView}>
          <SquareButton
            name="Bluebook"
            text="Bluebook"
            buttonSize={75}
            textSize={10}
            onPress={() => navigation.navigate("Bluebook", {bluebookURL: pdfURL})}
            hubIcon={true}
          />
          <SquareButton
            name="Training"
            text="Training & Schools"
            buttonSize={75}
            textSize={10}
            onPress={() => navigation.navigate("Training & Schools")}
            hubIcon={true}
          />
        </View>
        <View style={styles.buttonView}>
          <SquareButton
            name="Processing"
            text="In/Out Processing"
            buttonSize={75}
            textSize={10}
            onPress={() => navigation.navigate("Processing")}
            hubIcon={true}
          />
          <SquareButton
            name="Forums"
            text="Forums"
            buttonSize={75}
            textSize={11}
            onPress={() => navigation.navigate("Topics")}
            //onPress={() => test()}
            hubIcon={true}
          />
           <SquareButton
            name="Video Posts"
            text="Videos"
            buttonSize={75}
            textSize={11}
            onPress={() => navigation.navigate("VidPosts")}
            //onPress={() => test()}
            hubIcon={true}
          />
        </View>
        <View style={[styles.buttonView]}>
          <SquareButton
            name="Resources"
            text="Army Resources"
            buttonSize={75}
            textSize={10}
            onPress={() => navigation.navigate("Army Resources")}
            hubIcon={true}
          />
          <SquareButton
            name="RAKFIT"
            text="RAKFIT"
            buttonSize={75}
            textSize={11}
            onPress={() => navigation.navigate("RAKFIT")}
            hubIcon={true}
          />
        </View>
        <View style={[styles.buttonView, { paddingBottom: 45 }]}>
          <SquareButton
            name="Calendar"
            text="Calendar"
            buttonSize={75}
            textSize={10}
            onPress={() => navigation.navigate("Calendar")}
            hubIcon={true}
          />
          <SquareButton
            name="Reading List"
            text="Reading List"
            buttonSize={75}
            textSize={11}
            onPress={() => navigation.navigate("Reading List")}
            hubIcon={true}
          />
        </View>
        <Button
          containerStyle={{
            marginTop: -20,
            padding: 10,
            paddingBottom: 15,
            height: 45,
            width: "75%",
            overflow: "hidden",
            borderRadius: 20,
            backgroundColor: Colors.primary,
          }}
          //disabledContainerStyle={{ backgroundColor: "white" }}
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "bold",
          }}
          onPress={() => navigation.navigate("Request a Feature")}
        >
          Request a Feature
        </Button>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    //flexGrow: 1,
    //backgroundColor: Colors.white,
    //width: "100%",
    //height: "100%",
    paddingBottom: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainerStyle: {
    flexGrow: 1,
    //alignItems: "center",
    //justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  buttonView: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingBottom: 15,
  },

  map: {
    flex: 1,
    elevation: 2, // android
    shadowColor: "black", // shadow - ios
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.26,
    top: 10,
    height: 200,
    width: "90%",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  maptext: {
    fontSize: 20,
    color: Colors.blue3,
    paddingTop: 32,
  },
});
