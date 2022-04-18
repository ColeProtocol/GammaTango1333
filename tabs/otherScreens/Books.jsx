import React, { useState, useEffect } from "react";
import {TouchableHighlight, FlatList, StyleSheet, Text, View} from "react-native";
import moment from "moment";
import Colors from "../../constants/Colors";
import { useIsFocused } from "@react-navigation/native";
import Post from "../../components/Post";
import BookComponent from "../../components/BookComponent";
import Button from "react-native-button";
import * as Firebase from "firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Books({ route, navigation }) {

  //const creator= route.params.creator;

  function unsubscribe(orderby, direction) {
    Firebase.app().firestore().collection("Books")
    .orderBy(orderby, direction).onSnapshot((snapshot) =>
      setPosts(
        snapshot.docs.map((doc) => ({
          
          id: doc.id,
          content: doc.data().content,
          title: doc.data().bookTitle,
          author: doc.data().author,
          //date: doc.data().date,

        }))
      )
    );
    //posts.array.sort((a, b) => a.author.localeCompare(b.author));
  }
  const [refresh, setRefresh] = useState(true);
  const [isauthor, setIsauthor] = useState(true);
  const [isAsc, setIsAsc] = useState(true);
  var order = "author";
  var direction = "desc";
  //var refresh = true;
  function changeOrder(orderby) {
       // var x = 0
      //while ( x < 5) {
      if(orderby === "author"){
        if(isauthor) {
            setIsAsc(!isAsc);
            setIsauthor(true);

            console.log("swapped dir")
        } else {
            setIsauthor(true);
            console.log("swapped type to author")
        }
        if(isAsc) {
        setRefresh(!refresh)
           setPosts(posts.sort((a, b) => a.author.localeCompare(b.author)))
           setRefresh(!refresh)
          }
          else {
          setRefresh(!refresh)
            setPosts(posts.sort((a, b) => !a.author.localeCompare(b.author)))
            setRefresh(!refresh)
          }
      }
      else if(orderby === "bookTitle") {
        if(!isauthor) {
             setIsauthor(false);
             setIsAsc(!isAsc);

             console.log("swapped type to title")
                
        } else {
           setIsauthor(false);
           console.log("swapped dir")

        }
        if(isAsc) {
            setRefresh(!refresh)
           setPosts(posts.sort((a, b) => a.title.localeCompare(b.title)))
           setRefresh(!refresh)
          }
          else {
            setRefresh(!refresh)
            setPosts(posts.sort((a, b) => !a.title.localeCompare(b.title)))
            setRefresh(!refresh)
          }
      }
      
      //x++
      /*if(isauthor) {
          if(isAsc) {
           setPosts(posts.sort((a, b) => a.author.localeCompare(b.author)))
          }
          else {
            setPosts(posts.sort((a, b) => !a.author.localeCompare(b.author)))
          }
      }
      else {
        if(isAsc) {
           setPosts(posts.sort((a, b) => a.title.localeCompare(b.title)))
          }
          else {
            setPosts(posts.sort((a, b) => !a.title.localeCompare(b.title)))
          }
      }*/
      
      setRefresh(!refresh)
      setRefresh(!refresh)
      //}
      
      /* console.log(order == orderby);
       console.log(order === orderby);
       if(order === orderby) {
           direction = (direction === "desc") ? "asc" : "desc";
           console.log(order)
           console.log(orderby)
           
           console.log(direction)
       
           //unsubscribe(order, direction);
       } else {
        order = orderby
        console.log(order)
        console.log(orderby)
        console.log(direction)
        //unsubscribe(order, direction);
       }
       //posts.orderBy(order, direction)
      
       if(order === "author") {
           if(direction === "asc") {
           console.log(direction)
           setPosts(posts.sort((a, b) => a.author.localeCompare(b.author)))
           } else {
           console.log(direction)
           console.log("else")


           setPosts(posts.sort((a, b) => !a.author.localeCompare(b.author)))
           }
       } else {
        console.log("order else")
           if(direction === "asc") {
           console.log(direction)
               setPosts(posts.sort((a, b) => a.title.localeCompare(b.title)))
           } else {
           console.log(direction)
               setPosts(posts.sort((a, b) => !a.title.localeCompare(b.title)))
                console.log("else")
               }
       }*/
  
   
   //console.log(posts)
      /*if() {
        order = orderby;
        console.log(order)
        unsubscribe(order, direction)
      } else {
        console.log(direction)
          if (direction == "desc") {
              direction = "asc";
          } else {
              direction = "desc";
          }
          unsubscribe(order, direction);
      }*/
  }
  
  
  const [posts, setPosts] = useState(() => unsubscribe("bookTitle", "asc"));

  const _listEmptyComponent = () => {
    return (
      <View
        style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}
      >
        <Text style={{ textAlign: "center" }}>
          this is empty

        </Text>
      </View>
    );
  };

    
  
    //console.log(posts);
    //console.log(posts2);
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.topicTitle}>Books</Text>
        <View style = {styles.buttons}>
        <Button
          containerStyle={{
            padding: 10,
            height: 45,
            margin: 20,
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
          onPress={() => changeOrder("bookTitle")}
        >
          order by title
        </Button>
        <Button
          containerStyle={{
            padding: 10,
            height: 45,
            overflow: "hidden",
            borderRadius: 20,
            margin:20,
            backgroundColor: Colors.primary,
          }}
          disabledContainerStyle={{ backgroundColor: "grey" }}
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "bold",
          }}
          onPress={() => changeOrder("author")}
        >
          order by author
        </Button>
        </View>
      </View>
      <FlatList
        extraData={refresh}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={_listEmptyComponent}
        contentContainerStyle={{ flexGrow: 1 }}
        style={{ flex: 1 }}
        data = {posts}
        renderItem={({ item }) => (
          <TouchableHighlight
            style={styles.item}
            onPress={() => navigation.navigate('ReadBook', {content: item.content, date : item.date, title: item.title, author : item.author})}/*{

              
            }}*/
          >
            <View>
              <BookComponent
                id={item.id}
                username={item.displayName}
                title={item.title}
                content={item.content}
                author={item.author}
                date={item.date}
                
              />
            </View>
          </TouchableHighlight>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  buttons: {
  flexDirection: 'row',
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: 'column',
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
