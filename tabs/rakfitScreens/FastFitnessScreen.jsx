import React from "react";
import { ScrollView, View, Text, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Card, CardItem, Body } from "native-base";
import Colors from "../../constants/Colors";
import Dimensions from "../../constants/Dimensions";

export default function FastFitnessScreen({ route }) {
  const navigation = useNavigation();
  const { id, name, form_image, description } = route.params;

  //console.log(policy);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
    },
    title: {
      fontSize: 36,
      color: Colors.darkGray,
      marginBottom: 10,
    },
    cardContainer: {
      marginTop: 20,
      width: "90%",
    },
    formPic: {
      resizeMode: "contain",
      height: 200,
      width: "100%",
    },
    container2: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 10,
    },
    descriptionText: {
      fontSize: 14,
      color: Colors.darkGray,
    },
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container2}>
        <Text style={styles.title}> {name} </Text>
        <Card style={styles.cardContainer}>
          <CardItem>
            <Image source={{ uri: form_image }} style={styles.formPic} />
          </CardItem>
        </Card>
        <Card style={styles.cardContainer}>
          <CardItem>
            <Body>
              <Text style={styles.descriptionText}> {description} </Text>
            </Body>
          </CardItem>
        </Card>
      </View>
    </ScrollView>
  );
}
