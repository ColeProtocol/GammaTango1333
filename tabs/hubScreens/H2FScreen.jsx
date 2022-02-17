import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";


import Card from "../../components/Card";
import Colors from "../../constants/Colors";
import Dimensions from "../../constants/Dimensions";
import SquareButton from "../../components/SquareButton";

const screenWidth = Dimensions.window.width;
const screenHeight = Dimensions.window.height;

export default function H2FScreen() {
  const navigation = useNavigation();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.white,
      width: "100%",
    },
    container2: {
      flex: 1,
      backgroundColor: Colors.white,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 10,
    },
    buttonView: {
      flexDirection: "row",
      marginTop: 20,
      justifyContent: "space-evenly",
    },
  
    centerText: {
      justifyContent: "center",
      alignItems: "center",
    },
    imageContainer: {
      flex: 1,
      marginBottom: Platform.select({ ios: 0, android: 1 }),
      backgroundColor: Colors.white,
      borderRadius: 15,      
    },
    // image: {
    //   ...StyleSheet.absoluteFillObject,
    // },
    title: {
        marginTop:10,
        marginLeft: 10,
        fontSize: 25,
        fontWeight: "bold",
        color: Colors.primary,
        textAlign: "left",
    },
    body: {
        marginTop:10,
        marginLeft: 5,
        marginRight: 5,
        fontSize: 18,
        color: Colors.black,
        textAlign: "left",
    },
  });

  return (
    <ScrollView style={styles.container}>
      {/* <View style={styles.container2}> */}
        <Text style={styles.title}>Intro:</Text>

        <Text style={styles.body}>     H2F or Holistic Health and Fitness is an 
                enterprise-wide system that combines all aspects of physical and 
                non-physical human performance optimization under a single 
                governance to enable commanders to improve Soldier health and 
                fitness for combat.</Text>
        <Text style={styles.title}>Resources:</Text>

        <View style={[styles.buttonView]}>
          <SquareButton
            name="food-apple"
            text="ACFT"
            buttonSize={50}
            textSize={12}
            iconSize={30}
            onPress={() => navigation.navigate("ACFT")}
          />
          <SquareButton
            name="food-fork-drink"
            text="DFAC"
            buttonSize={50}
            textSize={12}
            iconSize={30}
            onPress={() => navigation.navigate("ConstructionScreen")}
          />
          <SquareButton
            name="Placeholder"
            text="H2F"
            buttonSize={50}
            textSize={12}
            iconSize={30}
            onPress={() => navigation.navigate("H2F")}
          />
          <SquareButton
            name="Placeholder"
            text="Placeholder"
            buttonSize={50}
            textSize={8}
            iconSize={30}
            onPress={() => navigation.navigate("ConstructionScreen")}
          />
        </View>
      {/* </View> */}
    </ScrollView>
  );
}
