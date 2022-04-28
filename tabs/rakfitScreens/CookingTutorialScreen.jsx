import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
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
      marginTop: 10,
    },
    scrollContainer: {
      flex: 1,
      width: "100%",
      height: "100%",
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
      height: 200,
      backgroundColor: "teal",
      marginBottom: 30,
    },
  });

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Lasagna</Text>
        <View style={styles.placeholder}></View>

        <Text style={styles.title}>Grilled Chicken Sandwich</Text>
        <View style={styles.placeholder}></View>

        <Text style={styles.title}>Beef Cheeseburgers</Text>
        <View style={styles.placeholder}></View>

        <Text style={styles.title}>Fajitas</Text>
        <View style={styles.placeholder}></View>
      </View>
    </ScrollView>
  );
}
