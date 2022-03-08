import React, { useState, useEffect } from "react";
import { View, Image, FlatList, StyleSheet, Text } from "react-native";
import RectButton from "../../components/RectButton";
import { useNavigation } from "@react-navigation/native";
import * as Firebase from "firebase";
//import Firebase from "../../constants/FireBaseDb";

export default function Topics({ navigation }) {
  const [topics, setTopics] = useState([]);
  useEffect(() => {
    const getTopics = async () => {
      try {        
        const response = await Firebase.app().firestore().collection('forums').get();
        //alert(response.data());
        console.log(response)
        const documents = [];
        response.forEach(doc => {
          console.log(doc.id)
          documents.push(doc.id);
        });
        
        setTopics(documents.map(doc => {
          return {
            title: doc,
            id: doc
          }
        }));

      } catch (error) {
        alert(error);
      }
    }
    getTopics();
    
  }, [])

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
            <RectButton
              text={item.title}
              onPress={() => navigation.navigate("Posts", { topic_id: item.id, topic_title: item.title })}
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
