import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Linking,
  Image,
} from "react-native";
import { Card, CardItem } from "native-base";
import { ScrollView } from "react-native-gesture-handler";
import getData from "../../assets/Async/getData";

export default function The38DEHistoryScreen() {

  const [history, setHistory] = useState([]);

  //console.log(history);
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
      setHistory(response[0].DEhistory);
      console.log(response[0].DEhistory);
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
    title: {
      fontSize: 16,
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
    images: {
      width: "100%",
      height: "80%",
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.header} />
        {history.map((type) => (
          <View key={type.id}>
            <Card>
              <Image style={styles.images} source={{uri: "http://3.19.67.76:1337" + type.image.url}} />
              <CardItem>
                <Text style={styles.title}>{type.title}</Text>
              </CardItem>
              <CardItem>
                <View>
                  <Text>Document Links:</Text>
                  <Text
                    style={{ color: "blue", fontSize: 13 }}
                    onPress={() => Linking.openURL(`https://home.army.mil/campbell/application/files/1916/2923/5800/101ABN_CAM_PAM_600_1_BlueBook.pdf`)}
                  >
                    - link 1
                  </Text>
                  <Text
                    style={{ color: "blue", fontSize: 13 }}
                    onPress={() => Linking.openURL(`https://home.army.mil/campbell/application/files/1916/2923/5800/101ABN_CAM_PAM_600_1_BlueBook.pdf`)}
                  >
                    - link 2
                  </Text>
                  <Text
                    style={{ color: "blue", fontSize: 13 }}
                    onPress={() => Linking.openURL(`https://home.army.mil/campbell/application/files/1916/2923/5800/101ABN_CAM_PAM_600_1_BlueBook.pdf`)}
                  >
                    - link 3
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
