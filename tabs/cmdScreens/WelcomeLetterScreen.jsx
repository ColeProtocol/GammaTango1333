import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, Text } from "react-native";
import { Card, CardItem } from "native-base";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";
import getData from "../../assets/Async/getData";

export default function WelcomeLetterScreen() {
  const [letter, setLetter] = useState([]);

  useEffect(() => {
    const getLetter = async () => {
      let { jwt } = await getData();
      const request = await axios.get(
        "http://3.19.67.76:1337/commanders-bulletins",
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      const response = request.data;
      setLetter(response[0].welcomeLetter);
      //console.log(response[0].welcomeLetter);
    };
    getLetter();
  }, []);

  const styles = StyleSheet.create({
    container: {
      width: "100%",
      height: "100%",
      flexDirection: "column",
      paddingHorizontal: 15,
      paddingVertical: 10,
    },
  });
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      <Text style={styles.header} />
        {letter.map((letter, id) => (
          <Card key={id}>
            <CardItem>
              <Text>{letter.description}</Text>
            </CardItem>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
