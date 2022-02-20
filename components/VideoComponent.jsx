import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firebase, * as Firebase from "firebase";
import { IconButton, Colors } from 'react-native-paper';
import{ Video } from 'expo-av'
//import Icon from "react-native-vector-icons/FontAwesome";
/*import {
  FontAwesome as FontIcon,
  MaterialIcons as MatIcon,
  AntDesign as AntIcon,
  Entypo as EnIcon,
  Feather as FIcon,
} from "@expo/vector-icons";*/

export default function VideoComponent({
  //topic_id,
  //id,
  username,
  title,
  content,
  videoURI,
  date,
  email,
  picture,
  likes,
  dislikes,
}) {
  const navigation = useNavigation();
  const [likeIconColor, setLikeColor] = useState();
  const [dislikeIconColor, setDislikeColor] = useState();

  const getColor = async () => {
    const val = await AsyncStorage.getItem("@user_data").catch(console.log);
    const json = JSON.parse(val);

    var doc = await Firebase.app().firestore().collection("users").doc(json.user.email).get();
    var arrayLikesLength = doc.data().forumLikes.length
    for (var i = 0; i < arrayLikesLength; i++) {
        if (doc.data().forumLikes[i] == id) {
          setLikeColor(Colors.green500)
          setDislikeColor(Colors.black)
          break;
        }
    }

    var arrayDislikesLength = doc.data().forumDislikes.length
    for (var i = 0; i < arrayDislikesLength; i++) {
        if (doc.data().forumDislikes[i] == id) {
          setDislikeColor(Colors.red500)
          setLikeColor(Colors.black)
          break;
        }
    }
  };
  getColor();

  function addLike(currUserEmail) {
    try {
      Firebase.app()
        .firestore()
        .collection("Videos")
        //.doc(topic_id)
        //.collection("videos")
        .doc(id)
        .update({
          likes: firebase.firestore.FieldValue.increment(1),
        })
        .then(() => {
          //alert("This post has been liked");
          Firebase.app().firestore().collection("users").doc(currUserEmail).update({
            forumLikes: firebase.firestore.FieldValue.arrayUnion(id),
          })
          .catch((error) => {
            console.log("Error adding like to user profile: ", error);
          });
        })
        .catch((error) => {
          console.log("Error adding like: ", error);
        });
    } catch (error) {
      console.log(error);
    }
  };


  function undoLike(currUserEmail) {
    try {
      Firebase.app()
        .firestore()
        //.collection("trainings")
        //.doc(topic_id)
        .collection("Videos")
        .doc(id)
        .update({
          likes: firebase.firestore.FieldValue.increment(-1),
        })
        .then(() => {
          //alert("Your like on this post has been removed.");
          Firebase.app().firestore().collection("users").doc(currUserEmail).update({
            forumLikes: firebase.firestore.FieldValue.arrayRemove(id),
          })
          .catch((error) => {
            console.log("Error removing like from user profile: ", error);
          });
        })
        .catch((error) => {
          console.log("Error adding like: ", error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  function addDislike(currUserEmail) {
    try {
      Firebase.app()
        .firestore()
        //.collection("trainings")
        //.doc(topic_id)
        .collection("Videos")
        .doc(id)
        .update({
          dislikes: firebase.firestore.FieldValue.increment(1),
        })
        .then(() => {
          //alert("This post has been disliked. We are sorry that you do not like this post!");
          Firebase.app().firestore().collection("users").doc(currUserEmail).update({
            forumDislikes: firebase.firestore.FieldValue.arrayUnion(id),
          })
          .catch((error) => {
            console.log("Error adding dislike: ", error);
          });
        })
        .catch((error) => {
          console.log("Error adding dislike to user profile: ", error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  function undoDislike(currUserEmail) {
    try {
      Firebase.app()
        .firestore()
        .collection("trainings")
        .doc(topic_id)
        .collection("posts")
        .doc(id)
        .update({
          dislikes: firebase.firestore.FieldValue.increment(-1),
        })
        .then(() => {
          //alert("Your dislike on this post has been removed.");
          Firebase.app().firestore().collection("users").doc(currUserEmail).update({
            forumDislikes: firebase.firestore.FieldValue.arrayRemove(id),
          })
          .catch((error) => {
            console.log("Error removing dislike from user profile: ", error);
          });
        })
        .catch((error) => {
          console.log("Error adding dislike: ", error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  function likeFunction() {
    const getData = async () => {
      const val = await AsyncStorage.getItem("@user_data").catch(console.log);
      const json = JSON.parse(val);
      //console.log(json.user.email);

      var alreadyLiked;
      var doc = await Firebase.app().firestore().collection("users").doc(json.user.email).get();
      var arrayLength = doc.data().forumLikes.length

      for (var i = 0; i < arrayLength; i++) {
          if (doc.data().forumLikes[i] == id) {
            setLikeColor(Colors.green500)
            alreadyLiked = true;
            break;
          }
      }

      if (alreadyLiked) {
        undoLike(json.user.email)
        setLikeColor(Colors.black)
        alreadyLiked = false
      } else {
        addLike(json.user.email)
        setLikeColor(Colors.green500)
        setDislikeColor(Colors.black)
        var arrayLength = doc.data().forumDislikes.length

        for (var i = 0; i < arrayLength; i++) {
            if (doc.data().forumDislikes[i] == id) {
              undoDislike(json.user.email);             
              break;
            }
        }
      }
    };

    getData();
  }

  function dislikeFunction() {
    const getData = async () => {
      const val = await AsyncStorage.getItem("@user_data").catch(console.log);
      const json = JSON.parse(val);
      //console.log(json.user.email);

      var alreadyDisliked;
      var doc = await Firebase.app().firestore().collection("users").doc(json.user.email).get();
      var arrayLength = doc.data().forumDislikes.length

      for (var i = 0; i < arrayLength; i++) {
          if (doc.data().forumDislikes[i] == id) {
            alreadyDisliked = true;
            break;
          }
      }

      if (alreadyDisliked) {
        undoDislike(json.user.email)
        setDislikeColor(Colors.black)
        alreadyDisliked = false;
      } else {
        addDislike(json.user.email)
        setDislikeColor(Colors.red500)
        setLikeColor(Colors.black)
        var arrayLength = doc.data().forumLikes.length

        for (var i = 0; i < arrayLength; i++) {
            if (doc.data().forumLikes[i] == id) {
              undoLike(json.user.email);             
              break;
            }
        }
      }
    };

    getData();
  }
  console.log(username,
  title,
  content,
  videoURI,
  date,
  email,
  picture,
  likes,
  dislikes,);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: picture }}
          style={{ width: 50, height: 50, borderRadius: 400 / 2, margin: 7 }}
        />
        
        <View style={styles.user}>
          <Text
            style={styles.username}
            onPress={() => {
              navigation.navigate("User Profile", {
                user: username,
                email: email,
              });
            }}
          >
            {username}
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        
         <Video  style={{ width: 300, height: 300, borderRadius: 0, margin: 7 }} source= {{uri: content}}/>
        <View style={{flexDirection:'row'}}>
          <Text>      
            <IconButton
              icon="thumb-up"
              color={likeIconColor}
              size={20}
              onPress={() => likeFunction()}
            /> {likes}
            <IconButton
                icon="thumb-down"
                color={dislikeIconColor}
                size={20}
                onPress={() => dislikeFunction()}
            /> {dislikes}
          </Text>
        </View>

        <Text style={styles.date}>{date}</Text> 
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 385,
    borderColor: "#D1D1D1",
    borderWidth: 1,
    marginHorizontal: 5,
    marginVertical: 10,
  },
  user: {
    flex: 1,
    textAlign: "center",
  },
  username: {
    fontSize: 20,
  },
  header: {
    flexDirection: "row",
    backgroundColor: "#EFEFEF",
    alignItems: "center",
  },
  content: {
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginTop: -15,
    fontWeight: "bold",
    textTransform: "capitalize"
  },
  content_text: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
  },
  date: {
    fontSize: 14,
    color: "dimgray",
    textAlign: "right",
    //marginTop: 15,
  },
});
