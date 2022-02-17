import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card, CardItem, Body } from "native-base";
import axios from "axios";
import Colors from "../../constants/Colors";
import Dimensions from "../../constants/Dimensions";
import getData from "../../assets/Async/getData";

export default function CookingTutorialScreen({ route }) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      height: "100%",
      alignItems: "center",
    },
    cardContainer: {
      marginTop: 50,
      width: "90%",
    },
    title: {
      fontSize: 20,
      color: Colors.darkGray,
    },
    text: {
      fontSize: 14,
      color: Colors.darkGray,
    },
    placeholder: {
      width: "90%",
      height: "100",
      backgroundColor: "teal",
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lasagna</Text>
      <View style={styles.placeholder}></View>
    </View>
  );
}
