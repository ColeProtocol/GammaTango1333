import React, { useState, useEffect } from "react";
import {TouchableHighlight, FlatList, StyleSheet, Text, View} from "react-native";
import RectButton from "../../components/RectButton";
import Button from "react-native-button";
import { useNavigation } from "@react-navigation/native";
import * as Firebase from "firebase";
import EventComponent from "../../components/EventComponent"
import Colors from "../../constants/Colors";

export default function DayEvents(props) {
console.log(props);

  const [topics, setTopics] = useState([]);
  const creator= props.route.params.creater;
  const date = props.route.params.date;
  const navigation = useNavigation();
  function unsubscribe() {
    Firebase.app().firestore().collection("calendar").doc(creator).collection(props.route.params.date.dateString)
    .orderBy("startTime").onSnapshot((snapshot) =>
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          strapiID: doc.data().id,
          displayName: doc.data().displayName,
          body: doc.data().body,
          description: doc.data().description,
          title: doc.data().title,
          startTime : doc.data().startTime,
          endTime : doc.data().endTime,
        }))
      )
    );
  }

  const [posts, setPosts] = useState(() => unsubscribe());


  const _listEmptyComponent = () => {
    return (
      <View
        style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}
      >
        <Text style={{ textAlign: "center" }}>
          There don't seem to be any Events Today. Why not plan the first?
        </Text>
      </View>
    );
  };
  console.log("this is the date " + date);
  console.log("this is the datestring " + props.route.params.date.timestamp)
  function newEvent() {
    navigation.navigate("SchedSubmitScreen", {date : date})

  }
    console.log(posts);
  
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.topicTitle}>Events</Text>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={_listEmptyComponent}
        contentContainerStyle={{ flexGrow: 1 }}
        style={{ flex: 1 }}
        renderItem={({ item }) => (

            <View>
              <EventComponent
                body={item.body}
                id={item.id}
                username={item.displayName}
                title={item.title}
                content={item.body}
                timestamp = {item.timestamp}
                startTime = {item.startTime}
                endTime = {item.endTime}
                
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
          onPress={() => newEvent()}
        >
          Add New Event!
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
