import React, { useState, useEffect } from "react";
import { View, Image, FlatList, StyleSheet, Text } from "react-native";
import RectButton from "../../components/RectButton";
import { useNavigation } from "@react-navigation/native";
import * as Firebase from "firebase";
import VideoComponent from "../../components/VideoComponent"
//import Firebase from "../../constants/FireBaseDb";

export default function Videos({ navigation }) {
  const [topics, setTopics] = useState([]);
  useEffect(() => {
    const getTopics = async () => {
      try {        
        const response = await Firebase.app().firestore().collection('Videos').get();
        //alert(response.data());
        const documents = [];
        response.forEach(doc => {
          documents.push(doc.id);
        });
        
        setTopics(documents.map(doc => {
          return {
            title: doc,
            id: doc,
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
            <View>
              <VideoComponent
                //topic_id={topic_id}
                id={item.id}
                //picture={item.picture}
                
                username={item.displayName}
                videoURI = {item.videoURI}
                title={item.title}
                content={item.body}
                email={item.email}
                date={item.timestamp}
                likes={item.likes}
                dislikes={item.dislikes}
                //date={moment(item.created_at).format("Do MMM YY, HH:mm:ss")}
              />
            </View>
            <RectButton
              text={item.title}
              onPress={() => navigation.navigate("Videos", { topic_id: item.id, topic_title: item.title })}
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
