import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import Colors from "../constants/Colors";
import CommandCard from "../components/CommandCard";
import SquareButton from "../components/SquareButton";

import axios from "axios";
import getData from "../assets/Async/getData";

let policyURL;

const getPolicyLetter = async () => {
  let { jwt } = await getData();
  const request = await axios.get("http://3.19.67.76:1337/policy-letters", {
       headers: {
            Authorization: `Bearer ${jwt}`,
       },
  });
  const url = request.data;
  policyURL = url[0].URL;
  //console.log(policyURL);
};

export default function CmdTab() {
  const navigation = useNavigation();

  const [commander, setCommander] = useState([]);

  let name;

  getPolicyLetter();

  useEffect(() => {
  try {
    const getCommander = async () => {
      let { jwt } = await getData();
      const request = await axios.get(
        "http://3.19.67.76:1337/commanders-bulletins",
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      const response = request.data;
      setCommander(response[0].commanders);
      //console.log(response[0].commanders[0].image[0].url);
    };
    getCommander();
  } catch (error) {
    console.log(error);
} }, 
  []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.white,
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
    cmdTeamContainer: {
      justifyContent: "center",
      width: "100%",
      marginTop: 20,
    },
    buttonTopPair: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-evenly",
      width: "100%",
    },
    buttonBottomPair: {
      marginTop: 35,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-evenly",
      width: "100%",
    },
    buttonsView: {
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
      marginTop: 20,
    },
  });

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <Image
          source={require("../assets/images/Torri.png")}
          style={{ width: 30, height: 30, top: "2%", paddingBottom: 5 }}
        />

        <View style={styles.cmdTeamContainer}>
        {commander.map((type) => (
          <CommandCard
            title={type.Name}
            source={{uri: type.image[0].url}}
            onPress={() => {
              navigation.navigate("Commander", { name: type.Name, body: type.Body })
            }}
          />
        ))}
        </View>


        <View style={styles.buttonsView}>
          <View style={[styles.buttonTopPair, { paddingTop: 20 }]}>
            <SquareButton
              name="email-open"
              text="Welcome Letter"
              buttonSize={90}
              textSize={12}
              onPress={() => navigation.navigate("Welcome Letter")}
            />
            <SquareButton
              name="eye-circle"
              text="Vision" // Could change to "Commanders' Vision", but it doesn't fit
              buttonSize={90}
              textSize={13}
              onPress={() => navigation.navigate("Commanders' Vision")}
            />
          </View>
          <View style={[styles.buttonBottomPair, { paddingBottom: 25 }]}>
            <SquareButton
              name="email-multiple"
              text="Policy Letters"
              buttonSize={90}
              textSize={12}
              onPress={() => navigation.navigate("Policy Letters", {letterURL: policyURL})}
            />
            <SquareButton
              name="home-city"
              text="Off Limits" // Could change to "Off Limit Establishments", but it doesn't fit
              buttonSize={90}
              textSize={12}
              onPress={() => navigation.navigate("Off Limits")}
            />
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
