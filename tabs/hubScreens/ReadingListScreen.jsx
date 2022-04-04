import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Colors from "../../constants/Colors";
import SquareButton from "../../components/SquareButton";
import { Searchbar } from "react-native-paper";

import axios from "axios";
import getData from "../../assets/Async/getData";

let pdfURL;

const getBluebook = async () => {
  let { jwt } = await getData();
  const request = await axios.get("http://3.19.67.76:1337/Bluebooks", {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  const url = request.data;
  pdfURL = url[0].URL;
  //console.log(pdfURL);
};

export default function BattScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = React.useState("");

  getBluebook();

    useEffect(() => {
      const getData = async () => {
        const val = await AsyncStorage.getItem("@user_data").catch(console.log);
        const json = JSON.parse(val);

        setUsername(json.user.username);
        setEmail(json.user.email);
        setID(json.user.id);

        Firebase.app()
          .firestore()
          .collection("users")
          .doc(email)
          .get()
          .then((docSnapshot) => {
            setPicture(docSnapshot.get("picture"));
          });
      };

      getData();
    });

  const onChangeSearch = (query) => setSearchQuery(query);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.white,
      width: "100%",
      //alignItems: "center",
      //justifyContent: "center",
    },
    buttonView: {
      width: "100%",
      flexDirection: "column",
      //alignItems: "center",
      justifyContent: "space-evenly",
      paddingBottom: 15,
    },
  });

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <View style={[styles.buttonView, { paddingTop: 10 }]}>
        <SquareButton
          name="book"
          text="Book1"
          buttonSize={90}
          textSize={13}
          onPress={() => navigation.navigate("Book1", { bluebookURL: pdfURL })}
        />
        <SquareButton
          name="book"
          text="Book2"
          buttonSize={90}
          textSize={13}
          onPress={() => navigation.navigate("Book2")}
        />
        <SquareButton
          name="book"
          text="Book3"
          buttonSize={90}
          textSize={13}
          onPress={() => navigation.navigate("Book3")}
        />
      </View>
    </View>
  );
}