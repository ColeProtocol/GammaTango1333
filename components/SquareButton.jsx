import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";
import Icon from "./Icon";
import Dimensions from "../constants/Dimensions";

export default function SquareButton({
  text,
  onPress,
  color = Colors.blue5,
  name,
  buttonSize,
  textSize,
  iconSize = 50,
  hubIcon = false,
}) {
  const styles = StyleSheet.create({
    button: {
      backgroundColor: Colors.white,
      padding: 10,
    },
    container: {
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      textAlign: "center",
      color: Colors.darkGray,
      paddingBottom: 6,
    },
  });
  return (
    <TouchableOpacity
      style={[styles.button, Dimensions.button]}
      onPress={onPress}
    >
      <View
        style={[styles.container, { height: buttonSize, width: buttonSize }]}
      >
        <Text style={[styles.text, Dimensions.font, { fontSize: textSize }]}>
          {text}
        </Text>
        <Icon name={name} iconColor={color} size={iconSize} hubIcon={hubIcon} />
      </View>
    </TouchableOpacity>
  );
}
