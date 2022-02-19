import React, { useState, useEffect } from "react";
import {TouchableHighlight, FlatList, StyleSheet, Text, View} from "react-native";
import moment from "moment";
import Colors from "../../constants/Colors";
import { useIsFocused } from "@react-navigation/native";
import Post from "../../components/Post";
import Video from "../../components/Video";
import Button from "react-native-button";
import * as Firebase from "firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function VidPosts({ route, navigation }) {
  const topic_id = route.params.topic_id;
  const topic_title = route.params.topic_title;

  function unsubscribe() {
    Firebase.app().firestore().collection("trainings").doc(topic_id).collection("videos")
    .orderBy("timestamp", "desc").onSnapshot((snapshot) =>
      setPosts(
        snapshot.docs.map((doc) => ({
          topic: topic_id,
          id: doc.id,
          uri : doc.data().uri,
          strapiID: doc.data().id,
          displayName: doc.data().displayName,
          body: doc.data().body,
          title: doc.data().title,
          email: doc.data().email,
          created_at: "7/29/2021",
          picture: doc.data().picture,
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
    navigation.navigate("Comments", { post });
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
    const getData = async () => {
      const val = await AsyncStorage.getItem("@user_data").catch(console.log);
      const json = JSON.parse(val);
      console.log(json.user.email);
      console.log(json.user.username);
      console.log(json.user['Title'] + " " + json.user['name'] + " " + json.user['Battalion']);

      Firebase.app()
        .firestore()
        .collection("users")
        .doc(json.user.email)
        .get()
        .then((docSnapshot) => {
          navigation.navigate("New Post", {
            topic_id: topic_id,
            topic_title: topic_title,
            uri: uri,
            currentUser: json.user['Title'] + " " + json.user['name'] + " " + json.user['Battalion'],
            currentEmail: json.user.email,
            currentPicture: docSnapshot.get("picture"),
          });
        });
    };

    getData();
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.topicTitle}>{topic_title}</Text>
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
            onPress={() => {
              _handleOnPress(item);
            }}
          >
            <View>
              <Post
                topic_id={topic_id}
                id={item.id}
                picture={item.picture}
                username={item.displayName}
                title={item.title}
                content={item.body}
                uri={item.uri}
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
          onPress={() => newPost()}
        >
          Submit New Post
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
