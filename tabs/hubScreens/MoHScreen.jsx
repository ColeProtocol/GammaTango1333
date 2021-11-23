import React, { useEffect, useState } from "react";
import axios from "axios";
import { StyleSheet, SafeAreaView, View, FlatList, Text, TouchableHighlight } from "react-native";
import { Card, CardItem, Body } from "native-base";
import getData from "../../assets/Async/getData";
import { NavigationEvents } from "react-navigation";
import { useNavigation } from "@react-navigation/native";

export default function MoHDocument() {
  const [moh, setMoh] = useState([]);

  useEffect(() => {
    const getMoh = async () => {
      let { jwt } = await getData();
      console.log(jwt);
      const request = await axios.get("http://3.19.67.76:1337/rak-histories", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      const mohData = request.data;
      setMoh(mohData[0].MedalofHonor);
    };
    getMoh();
  }, []);

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
      fontSize: 24,
      fontWeight: "500",
      textAlign: "center",
    },
    header: {
      fontSize: 20,
      fontWeight: "700",
      marginTop: 20,
      marginBottom: 20,
      textAlign: "center",
    },
    cardContainer: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      margin: 16,
      borderStyle: "solid",
      borderWidth: .4,
      padding: 10,
      backgroundColor: '#E5E5E5'
    },
  });

  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <View style={styles.main}>
        <Text style={styles.header}>Medal of Honor Recipients</Text>
        <FlatList
          data={moh}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.container}>
              <TouchableHighlight
                style={styles.cardContainer}
                underlayColor="#CFCFCF"
                activeOpacity={0.3}
                onPress={() => navigation.navigate("HistoryDetails", {name: item.name, division: item.soldierDivision, conflict: item.conflict, yearHonor: item.yearOfHonor, citation: item.citation})}
              >
              <Card key={item.id}>
                <CardItem>
                  <Text style={styles.title}>{item.name}</Text>
                </CardItem>
                <CardItem>
                  <Body>
                    <Text>{item.soldierDivision}</Text>
                    <Text>Conflict: {item.conflict}</Text>
                    <Text>Year of Honor: {item.yearOfHonor}</Text>
                    <Text>Medal of Honor Citation</Text>
                  </Body>
                </CardItem>
                <CardItem>
                  <Body>
                    <Text>{item.description}</Text>
                  </Body>
                </CardItem>
              </Card>
              </TouchableHighlight>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
