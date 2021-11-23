import React from "react";
import { Text, StyleSheet, Image, TouchableOpacity } from "react-native";

import Colors from "../constants/Colors";
import Dimensions from "../constants/Dimensions";

export default function ResourceCard({ info, title, onPress }) {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: Colors.lightGray,
      marginTop: 5,
      width: "100%",
      height: 175,
      alignItems: "center",
      borderWidth: 1,
      borderColor: Colors.primary,
    },
    titleText: {
      backgroundColor: Colors.primary,
      padding: 8,
      paddingBottom: 2,
      borderColor: Colors.white,
      borderWidth: 1,
      color: Colors.white,
      fontSize: 16,
      position: "absolute",
      top: 15,
      left: 15,
      shadowOffset: { width: 5, height: 5 },
      shadowColor: "black",
      shadowOpacity: 1.0,
    },
    infoText: {
      color: Colors.black,
      fontSize: 16,
      position: "absolute",
      top: 60,
      left: 15,
      width: '95%'
    },
    
  });
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.4}
    >
      <Text style={[styles.titleText, Dimensions.font]}>{title}</Text>
      <Text numberOfLines={5} style={[styles.infoText, Dimensions.font]}>{info}</Text>
    </TouchableOpacity>
  );
}
