import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Card, CardItem, Body } from "native-base";

import Colors from "../../constants/Colors";
import Dimensions from "../../constants/Dimensions";

export default function BattShopFunctionScreen() {
  const styles = StyleSheet.create({
    image: {
      width: "100%",
      height: "30%",
      borderWidth: 1,
      borderColor: Colors.primary,
    },
    title: {
      fontSize: 20,
      color: Colors.darkGray,
    },
    text: {
      fontSize: 14,
      color: Colors.darkGray,
    },
    container: {
      flex: 1,
      width: "100%",
      height: "100%",
      alignItems: "center",
    },

    cardContainer: {
      marginTop: 20,
      width: "90%",
    },
  });

  return (
    <View style={styles.container}>
      <Card style={styles.cardContainer}>
        <CardItem>
          <Text style={[styles.title, Dimensions.font]}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Text>
        </CardItem>
      </Card>
    </View>
  );
}
