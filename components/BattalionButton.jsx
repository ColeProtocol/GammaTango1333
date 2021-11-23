import React from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";

import Colors from "../constants/Colors";
import Dimensions from "../constants/Dimensions";

export default function BattalionButton({
  onPress,
  image,
  iconWidth,
  iconHeight,
  text,
}) {
  const styles = StyleSheet.create({
    button: {
      padding: 1,
      height: 85,
      width: 85,
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      textAlign: "center",
      color: Colors.darkGray,
      paddingTop: 8,
    },
    container: {
      alignItems: "center",
      justifyContent: "center",
    },
  });
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, Dimensions.button]}
        onPress={onPress}
      >
        <Image
          source={{ uri: image }}
          style={{ width: iconWidth, height: iconHeight }}
        />
      </TouchableOpacity>
      <Text style={[styles.text, Dimensions.font]}>{text}</Text>
    </View>
  );
}
