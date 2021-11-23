import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, View, FlatList, Text } from "react-native";
import { Card, CardItem, Body } from "native-base";
import axios from "axios";
import getData from "../../assets/Async/getData";

export default function NotableEventsScreen() {
  const styles = StyleSheet.create({
    main: {
      marginBottom: 200,
    },
    container: {
      flex: 1,
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
  });

  const [history, setHistory] = useState([]);

  useEffect(() => {
    try {
      const getHistory = async () => {
        let { jwt } = await getData();
        const request = await axios.get("http://3.19.67.76:1337/rak-histories", {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        const module = request.data;
        //console.log(module[0].NotableEvents[0]);
        setHistory(module[0].NotableEvents);
      };
      getHistory();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.main}>
        <Text style={styles.header}>
          History of the 187th Infantry Regiment and the 3d Brigade Combat Team
        </Text>
        <FlatList
          data={history}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View key={item.id} style={styles.container}>
              <Card>
                <CardItem>
                  <Text style={styles.title}>{item.description}</Text>
                </CardItem>
                <CardItem>
                  <Body>
                    <Text>
                      Unit: {item.unit}
                    </Text>
                    <Text>
                      Date: {item.date}
                    </Text>
                  </Body>
                </CardItem>
              </Card>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
