import React, { useState, useEffect } from "react";
import { View, Image, FlatList, StyleSheet, Text } from "react-native";
import RectButton from "../../components/RectButton";
import { useNavigation } from "@react-navigation/native";
import * as Firebase from "firebase";
import BookComponent from "../../components/BookComponent"
//import Firebase from "../../constants/FireBaseDb";

export default function Books({ navigation }) {
  const [topics, setTopics] = useState([]);
  useEffect(() => {
    const getTopics = async () => {
      try {        
        const response = await Firebase.app().firestore().collection('Books').get();
        //alert(response.data());
        const documents = [];
        response.forEach(doc => {
          documents.push(doc.id);
        });
        
        setTopics(documents.map(doc => {
          return {
            title: doc,
            id: doc,
            author: doc.author,
          }
        }));

      } catch (error) {
        alert(error);
      }
    }
    getTopics();
    
  }, [])
   const _handleOnPress = (post) => {
    
    navigation.navigate("VidPlay", { post });

  };
  return (
    <View style={styles.container}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Image
          source={require("../../assets/images/Torri.png")}
          style={{ width: 30, height: 30, top: "30%", marginBottom: 20 }}
        />
      </View>
      <FlatList
        data={topics}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.buttonView}>
           <tou
            <View>
              <BookComponent
                //topic_id={topic_id}
                //id={item.id}
                //picture={item.picture
                title={item.title}
                content={item.content}
                date={item.date}
                author={item.author}
              />
            </View>
            <RectButton
              text={item.title}
              onPress={() => navigation.navigate("ReadBook", { title: item.title, content: item.content, author:item.author})}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 25,
  },
  buttonView: {
    width: "100%",
  },
});
