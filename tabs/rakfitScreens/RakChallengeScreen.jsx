import React from "react";
import {
  FlatList,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Card, CardItem, Body } from "native-base";
import Colors from "../../constants/Colors";
import Dimensions from "../../constants/Dimensions";

export default function RakChallengeScreen({ route }) {
  const navigation = useNavigation();
  const { names, title, description } = route.params;

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
    name: {
      fontWeight: "normal",
      fontSize: 18,
    },
    score: {
      fontWeight: "bold",
      fontSize: 18,
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

  const renderItem = ({ item, index }) => (
    <Text style={styles.name}>
      {index + 1}. {item[0]}: <Text style={styles.score}>{item[1]}</Text>
    </Text>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container2}>
        <Text style={styles.title}> {title} </Text>
        <Card style={styles.cardContainer}>
          <CardItem>
            <Text style={styles.descriptionText}> {description} </Text>
          </CardItem>
        </Card>
        <Card style={styles.cardContainer}>
          <CardItem>
            <Body>
              <FlatList data={names} renderItem={renderItem} />
            </Body>
          </CardItem>
        </Card>
      </View>
    </ScrollView>
  );
}
