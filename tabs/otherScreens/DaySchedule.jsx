import React, { useState, useEffect } from "react";
import {TouchableHighlight, FlatList, StyleSheet, Text, View} from "react-native";
import moment from "moment";
import Colors from "../../constants/Colors";
import { useIsFocused } from "@react-navigation/native";
import Post from "../../components/Post";
import VideoComponent from "../../components/VideoComponent";
import Button from "react-native-button";
import * as Firebase from "firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DaySchedule(route) {
  //const topic_id = route.params.topic_id;
  //const topic_title = route.params.topic_title;

  function unsubscribe() {
    Firebase.app().firestore().collection("Videos")//.doc(topic_id).collection("videos")
    .orderBy("timestamp", "desc").onSnapshot((snapshot) =>
      setPosts(
        snapshot.docs.map((doc) => ({
          //topic: topic_id,
          id: doc.id,
          uri : doc.data().uri,
          strapiID: doc.data().id,
          displayName: doc.data().displayName,
          body: doc.data().body,
          title: doc.data().title,
          email: doc.data().email,

          created_at: "3/8/2022",
          picture: doc.data().picture,
          videoURI : doc.data().videoURI,
          //timestamp: doc.data().timestamp.toDate().toString(),
          timestamp: doc.data().timestamp,
          likes: doc.data().likes,
          dislikes: doc.data().dislikes,
        }))
      )
    );
  }

  const [posts, setPosts] = useState(() => unsubscribe());

  const _handleOnPress = (post) => {
    
    navigation.navigate("VidPlay", { post });
    //console.log(post)
  };

  const _listEmptyComponent = () => {
    return (
      <View
        style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}
      >
        <Text style={{ textAlign: "center" }}>
          There don't seem to be any Videos on this topic. Why not be the first?
        </Text>
      </View>
    );
  };

  function newVideo() {
    navigation.navigate("VideoScreen")
   
  }
    console.log(posts);
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.topicTitle}>Videos</Text>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={_listEmptyComponent}
        contentContainerStyle={{ flexGrow: 1 }}
        style={{ flex: 1 }}
        renderItem={({ item }) => (
          <TouchableHighlight
            style={styles.item}
            onPress={() => navigation.navigate('VidPlay', {content: item.body, date : item.date, title: item.title, username : item.displayName})}
          >
            <View>
              <VideoComponent
               
                id={item.id}
                
                username={item.displayName}
                VideoURI = {item.VideoURI}
                title={item.title}
                content={item.body}
                email={item.email}
                date={item.timestamp}
                likes={item.likes}
                dislikes={item.dislikes}
                //date={moment(item.created_at).format("Do MMM YY, HH:mm:ss")}
              />
            </View>
          </TouchableHighlight>
        )}
      />

      <View style={{ width: "80%", marginBottom: 5 }}>
        <Button
          containerStyle={{
            padding: 10,
            height: 45,
            overflow: "hidden",
            borderRadius: 20,
            backgroundColor: Colors.primary,
          }}
          disabledContainerStyle={{ backgroundColor: "grey" }}
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "bold",
          }}
          onPress={() => newVideo()}
        >
          Submit New Video
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  topicTitle: {
    fontSize: 30,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
    textTransform: "capitalize"
  },
});
