import { ScrollView, StyleSheet, Text, View, FlatList, TouchableHighlight} from "react-native";
import React, { useState, useEffect } from "react";
import moment from 'moment';
import Post from "../../components/Post";
import Comment from "../../components/Comment";
import * as Firebase from "firebase";
import Button from "react-native-button";
import Colors from "../../constants/Colors";

export default function Comments({ route, navigation }) {
  const { post } = route.params

  function unsubscribe() {
    Firebase.app().firestore().collection('forums')
    .doc(post.topic).collection('posts').doc(post.id).collection('comments')
    .onSnapshot((snapshot) => 
      setComments(
        snapshot.docs.map((doc) => ({
            id: doc.id,
            strapiID: doc.data().id,
            displayName: doc.data().displayName,
            content: doc.data().body,
            email: doc.data().email,
            picture: doc.data().picture,       
            //timestamp: doc.data().timestamp.toDate().toString(),
            timestamp: doc.data().timestamp,
            likes: doc.data().likes,
            dislikes: doc.data().dislikes,
        }))
      )
    )
  }

  const [comments, setComments] = useState(() => unsubscribe());

  const _handlePress = () => {
    navigation.navigate("New Comment", {
      post_id: post.id,
      topic_id: post.topic
    });
  }

  return (
    <View style={styles.container}>
      { post && (
        <Post
          picture={post.picture}
          username={post.displayName}
          title={post.title}
          content={post.body}
          email={post.email}
          date={post.timestamp}
          likes={post.likes}
          dislikes={post.dislikes}
        />
      )}
      {/*<Thread comments={comments} post={post} />*/}

      <FlatList
        data={comments}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ flexGrow: 1 }}
        style={{flex: 1}}
        renderItem={({ item }) => (
            <View>
              <Comment 
                id={item.id}
                topic_id={post.topic}
                post_id={post.id}
                picture={item.picture}
                username={item.displayName}
                title={item.title}
                content={item.content}
                email={item.email}               
                date={item.timestamp}
                likes={item.likes}
                dislikes={item.dislikes}
              />
            </View>
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
          onPress={() => _handlePress()}
        >
          Add a comment
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  date: {
    fontWeight: "200",
    fontSize: 12,
    color: "#474747"
  },
  nameContainer: {
    flex: 1,
    flexDirection: "row",
    paddingTop: 20
  },
  buttonView: {
    width: "100%"
  },
  title: {
    fontSize: 24,
    paddingBottom: 10
  },
  name: {
    fontWeight: "500",
    fontSize: 12,
    marginRight: 5,
    color: "#474747"
  },
  post: {
    paddingBottom: 15
  },
  borderContainer: {
    borderBottomColor: "#939393",
    borderBottomWidth: .5
  },
  reply: {
    paddingBottom: 10
  },
  padding: {
    paddingHorizontal: 10
  }
});
