import React, { useRef, useState, useEffect } from "react";
import {
  FlatList,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  Modal,
  TextInput,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Card, CardItem, Body } from "native-base";
import Colors from "../../constants/Colors";
import Firebase from "../../constants/FireBaseDb";

export default function RakChallengeScreen({ route }) {
  const navigation = useNavigation();
  const { names, title, description, username, challengeEnd } = route.params;

  const [listNames, setListNames] = useState(names);
  const [inputValue, setInputValue] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);

  function quickSort(arr, length = arr.length - 1, start = 0) {
    if (arr.length < 2) return arr;

    const pivot = arr[arr.length - 1];
    const left = [];
    const right = [];

    while (start < length) {
      if (arr[start][1] > pivot[1]) {
        left.push(arr[start]);
      } else {
        right.push(arr[start]);
      }
      start++;
    }
    return [...quickSort(left), pivot, ...quickSort(right)];
  }

  async function addChallengeEntry() {
    console.log(username);
    await Firebase.app()
      .firestore()
      .collection("rakfitChallenges")
      .doc("challengeInfo")
      .collection("entries")
      .add({
        attempt: parseInt(inputValue),
        name: username,
      });

    let entries = [];
    await Firebase.app()
      .firestore()
      .collection("rakfitChallenges")
      .doc("challengeInfo")
      .collection("entries")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const data = doc.data();
          entries.push([data.name, data.attempt]);
        });
      });
    entries = quickSort(entries);
    setListNames(entries);
  }

  const toggleModalVisibility = () => {
    if (isModalVisible) {
      addChallengeEntry();
    }
    setModalVisible(!isModalVisible);
  };

  function EmptyText() {
    if (listNames.length == 0) {
      return <Text style={styles.name}>No entries yet. Be the first!</Text>;
    } else {
      return null;
    }
  }

  const { width } = Dimensions.get("window");

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
    },
    title: {
      fontSize: 36,
      color: Colors.darkGray,
      marginBottom: 10,
    },
    cardContainer: {
      marginTop: 20,
      marginBottom: 20,
      width: "90%",
    },
    name: {
      fontWeight: "normal",
      fontSize: 18,
    },
    score: {
      fontWeight: "bold",
      fontSize: 18,
    },
    container2: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 10,
    },
    modalView: {
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      top: "50%",
      left: "50%",
      elevation: 5,
      transform: [{ translateX: -(width * 0.35) }, { translateY: 150 }],
      height: 100,
      width: width * 0.7,
      backgroundColor: "#fff",
      borderRadius: 7,
    },
    descriptionText: {
      fontSize: 14,
      color: Colors.darkGray,
    },
    endText: {
      fontSize: 14,
      color: Colors.gray,
      marginLeft: 20,
    },
  });

  let lastNum = -100;
  let outOfPlace = 0;

  const renderItem = ({ item, index }) => {
    if (item[1] == lastNum) {
      lastNum = item[1];
      outOfPlace++;
      return (
        <Text style={styles.name}>
          {index - outOfPlace + 1}. {item[0]}:{" "}
          <Text style={styles.score}>{item[1]}</Text>
        </Text>
      );
    } else {
      lastNum = item[1];
      return (
        <Text style={styles.name}>
          {index - outOfPlace + 1}. {item[0]}:{" "}
          <Text style={styles.score}>{item[1]}</Text>
        </Text>
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container2}>
        <Text style={styles.title}> {title} </Text>
        <Card style={styles.cardContainer}>
          <CardItem>
            <Text style={styles.descriptionText}> {description} </Text>
          </CardItem>
        </Card>
        <Button title="Submit Your Attempt" onPress={toggleModalVisibility} />
        <Modal
          animationType="slide"
          transparent
          visible={isModalVisible}
          presentationStyle="overFullScreen"
          onDismiss={toggleModalVisibility}
        >
          <View>
            <View style={styles.modalView}>
              <TextInput
                placeholder="Enter your score..."
                value={inputValue}
                onChangeText={(value) => setInputValue(value)}
              />

              {/** This button is responsible to close the modal */}
              <Button title="Submit" onPress={toggleModalVisibility} />
            </View>
          </View>
        </Modal>
        <Card style={styles.cardContainer}>
          <CardItem>
            <Body>
              <EmptyText />
              <FlatList data={listNames} renderItem={renderItem} />
            </Body>
          </CardItem>
        </Card>
        <Text style={styles.endText}>
          The challenge will change {new Date(challengeEnd).toString()}
        </Text>
      </View>
    </ScrollView>
  );
}
