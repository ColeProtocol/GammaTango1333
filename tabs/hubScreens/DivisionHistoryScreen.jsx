import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, Text } from "react-native";
import { Card, CardItem } from "native-base";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";
import getData from "../../assets/Async/getData";

export default function DivisionHistoryData() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const getHistory = async () => {
      let { jwt } = await getData();
      const request = await axios.get(
        "http://3.19.67.76:1337/rak-histories",
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      const response = request.data;
      setHistory(response[0].DivisionHistory);
    };
    getHistory();
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
        {history.map((history, id) => (
          <Card key={id}>
            <CardItem>
              <Text>{history.history}</Text>
            </CardItem>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
