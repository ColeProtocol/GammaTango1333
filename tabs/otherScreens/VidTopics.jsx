import React, { useState, useEffect } from "react";
import { View, Image, FlatList, StyleSheet, Text } from "react-native";
import RectButton from "../../components/RectButton";
import { useNavigation } from "@react-navigation/native";
import * as Firebase from "firebase";
//import Firebase from "../../constants/FireBaseDb";

export default function VidTopics({ navigation }) {
  const [topics, setTopics] = useState([]);
  useEffect(() => {
    console.log("bye");
    const getTopics = async () => {
      try {        
        const response = await Firebase.app().firestore().collection('Videos').get();

        const documents = [];
        //console.log(response.data())
        response.forEach(doc => {
          console.log("foo");
          
          documents.push(doc.id);
          console.log(doc.id);
        });
        
        setTopics(documents.map(doc => {
          return {
            user: doc,
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
              text={item.id}
              onPress={() => navigation.navigate("VidPosts", { creator: item.id })}//topic_id: item.id, topic_title: item.title
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
