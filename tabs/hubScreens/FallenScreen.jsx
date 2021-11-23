import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  Image,
  View,
  Linking,
} from "react-native";
import { Card, CardItem, Body } from "native-base";
import { ScrollView } from "react-native-gesture-handler";
import Dimensions from "../../constants/Dimensions";
import getData from "../../assets/Async/getData";

export default function FallenScreen() {
  const [fallen, setFallen] = useState([]);

  useEffect(() => {
    const getHonors = async () => {
      let { jwt } = await getData();
      const request = await axios.get("http://localhost:3001/fallens", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      const response = request.data;
      setFallen(response);
    };
    getHonors();
  }, []);

  const url = { uri: "https://picsum.photos/300/300" };
  const titleWidth = Dimensions.window.width * 0.27;
  const contentWidth = Dimensions.window.width * 0.65;

  const styles = StyleSheet.create({
    container: {
      width: "100%",
      height: "100%",
      flexDirection: "column",
      paddingHorizontal: 15,
      paddingVertical: 10,
    },
    title: {
      fontSize: 18,
      fontWeight: "500",
    },
    header: {
      fontSize: 20,
      fontWeight: "700",
      textAlign: "center",
    },
    description: {
      fontSize: 13,
    },
    image: {
      width: "100%",
      height: "30%",
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.header} />
        {fallen.map((type) => (
          <View key={type.id}>
            <Card>
              <Image style={styles.image} source={url} />
              <CardItem>
                <Text style={styles.title}>{type.title}</Text>
              </CardItem>
              <CardItem>
                <Body>
                  <Text style={styles.description}>{type.description}</Text>
                </Body>
              </CardItem>
              <CardItem>
                <View>
                  <Text>Document Links:</Text>
                  <Text
                    style={{ color: "blue", fontSize: 13 }}
                    onPress={() => Linking.openURL(`${type.documents[1].url}`)}
                  >
                    - {type.documents[1].name}
                  </Text>
                  <Text
                    style={{ color: "blue", fontSize: 13 }}
                    onPress={() => Linking.openURL(`${type.documents[0].url}`)}
                  >
                    - {type.documents[0].name}
                  </Text>
                </View>
              </CardItem>
            </Card>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
