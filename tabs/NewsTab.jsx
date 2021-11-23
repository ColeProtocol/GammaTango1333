import React, { useEffect, useState } from "react";
import { StyleSheet, Image, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";
import NewsCard from "../components/NewsCard";
import Colors from "../constants/Colors";
import getData from "../assets/Async/getData";
export default function NewsTab() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    try {
      const getNews = async () => {
        let { jwt } = await getData();
        const request = await axios.get("http://3.19.67.76:1337/articles", {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        const articles = request.data;
        setNews(articles);
      };
      getNews();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const navigation = useNavigation();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.white,
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
    view: {
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
    },
  });
  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <Image
          source={require("../assets/images/Torri.png")}
          style={{ width: 30, height: 30, top: "1%", paddingBottom: 5 }}
        />
        {news.map(({ description, image, title, id }) => (
          <NewsCard
            key={id}
            title={title}
            image={image.url}
            onPress={() =>
              navigation.navigate("News Article", {
                title,
                text: description,
                image: image.url,
              })
            }
          />
        ))}
      </SafeAreaView>
    </ScrollView>
  );
}
