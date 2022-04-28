import React, { useState, useEffect } from "react";

import {TouchableHighlight, FlatList, StyleSheet, Text, View, SearchBar,TextInput} from "react-native";

import moment from "moment";
import Colors from "../../constants/Colors";
import { useIsFocused } from "@react-navigation/native";
import Post from "../../components/Post";
import BookComponent from "../../components/BookComponent";
import Button from "react-native-button";
import * as Firebase from "firebase";
import { Searchbar } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Books({ route, navigation }) {

  //const creator= route.params.creator;
  const [searchQuery, setSearchQuery] = React.useState("");

  const onChangeSearch = (query) => setSearchQuery(query);
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

  const [posts, setPosts] = useState(() => unsubscribe("bookTitle", "asc"));
  
   var searchtext= "";
   // var   data= posts;
  const [filteredData, setFilteredData] = useState([]);
  //search = (searchText) => {
  function search(searchText) {
  searchtext = searchText
  let filtereddata = posts.filter(function (item) {
    
    return (item.title.toLowerCase().includes(searchText.toLowerCase())||item.author.toLowerCase().includes(searchText.toLowerCase())||item.content.toLowerCase().includes(searchText.toLowerCase()));
  });
  setFilteredData(filtereddata);
  setRefresh(!refresh);

};
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

    

  return (
    <View style={styles.container}>
         
      <View>
        <Text style={styles.topicTitle}>Books</Text>
        <TextInput
          placeholder="Search..."
          style={styles.titleInput}
          placeholderTextColor={Colors.gray}
          autoCorrect={false}
          autoCapitalize="none"
          
          onChangeText={(val) => search(val)}
          maxLength={300}
        />

      </View>
      <FlatList
        extraData={refresh}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={_listEmptyComponent}
        contentContainerStyle={{ flexGrow: 1 }}
        style={{ flex: 1 }}


        data={(filteredData && filteredData.length > 0) ? filteredData : posts}

        renderItem={({ item }) => (
          <TouchableHighlight
            style={styles.item}
            onPress={() => navigation.navigate('ReadBook', {content: item.content, date : item.date, title: item.title, author : item.author})}
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
