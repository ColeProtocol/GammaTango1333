import React, { useEffect, useState } from "react";
import axios from "axios";
import { StyleSheet, SafeAreaView, Text } from "react-native";
import { Card, CardItem, Body } from "native-base";
import { ScrollView } from "react-native-gesture-handler";
import getData from "../../assets/Async/getData";

export default function LineageHonorsScreen() {
  const [honors, setHonors] = useState([]);

  useEffect(() => {
    const getHonors = async () => {
      let { jwt } = await getData();
      const request = await axios.get("http://3.19.67.76:1337/rak-histories", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      const response = request.data;
      setHonors(response[0].LineageHonors);
    };
    getHonors();
  }, []);

  const styles = StyleSheet.create({
    container: {
      width: "100%",
      height: "100%",
      flexDirection: "column",
      paddingHorizontal: 15,
      paddingVertical: 10,
    },
    title: {
      fontSize: 15,
      fontWeight: "500",
    },
    header: {
      fontSize: 20,
      fontWeight: "700",
      marginTop: 20,
      marginBottom: 20,
      textAlign: "center",
    },
    description: {
      fontSize: 12,
    },
  });
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>187th Infantry Regiment</Text>
        {honors.map((type) => (
          <Card key={type.id}>
            <Text style={styles.header}>Lineage</Text>
            <CardItem>
              <Text style={styles.title}>{type.lineage}</Text>
            </CardItem>
            <Text style={styles.header}>Honors</Text>
            <CardItem>
              <Body>
                <Text style={styles.title}>{type.honors}</Text>
              </Body>
            </CardItem>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
