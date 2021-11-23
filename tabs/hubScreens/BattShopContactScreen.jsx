import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Card, CardItem, Body } from "native-base";

import Colors from "../../constants/Colors";
import Dimensions from "../../constants/Dimensions";

export default function BattShopContactScreen({ route }) {
  const { shop_email, shop_phone_num } = route.params;

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
            Email: {shop_email}
          </Text>
        </CardItem>
        <CardItem>
          <Body>
            <Text style={[styles.text, Dimensions.font]}>
              Phone number: {shop_phone_num}
            </Text>
          </Body>
        </CardItem>
      </Card>
    </View>
  );
}
