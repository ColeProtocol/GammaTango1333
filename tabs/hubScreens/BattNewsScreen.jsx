import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card, CardItem, Body } from "native-base";
import axios from "axios";
import Colors from "../../constants/Colors";
import Dimensions from "../../constants/Dimensions";
import getData from "../../assets/Async/getData";

export default function BattUnitScreen({ route }) {
  const { id, name } = route.params;
  const [news, setNews] = useState([]);

  useEffect(() => {
    const getNews = async () => {
      let { jwt } = await getData();
      const request = await axios.get("http://3.19.67.76:1337/battalions/" + id, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      const newsArrayJSON = request.data.battalion_news;
      setNews(newsArrayJSON);
    };
    getNews();
  }, []);

  const styles = StyleSheet.create({
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
    battalionTitle: {
      fontSize: 36,
      color: Colors.darkGray,
    },
    title: {
      fontSize: 20,
      color: Colors.darkGray,
    },
    text: {
      fontSize: 14,
      color: Colors.darkGray,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.battalionTitle}>Battalion {name} News</Text>

      {news.map(({ news_description, news_title, id }) => (
        <Card key={id} style={styles.cardContainer}>
          <CardItem>
            <Text style={[styles.title, Dimensions.font]}>{news_title}</Text>
          </CardItem>

          <CardItem>
            <Body>
              <Text style={[styles.text, Dimensions.font]}>{news_description}</Text>
            </Body>
          </CardItem>
        </Card>
      ))}

    </View>
  );
}