import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
  FlatList,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import Firebase from "../../constants/FireBaseDb";

import axios from "axios";
import getData from "../../assets/Async/getData";
import { Card, CardItem, Body } from "native-base";
import Colors from "../../constants/Colors";
import Dimensions from "../../constants/Dimensions";
import SquareButton from "../../components/SquareButton";

const screenWidth = Dimensions.window.width;
const screenHeight = Dimensions.window.height;

export default function RakFitScreen() {
  const navigation = useNavigation();
  const [exercises, setExercises] = useState([]);
  const [challengeEntries, setChallengeEntries] = useState([]);
  const [top5Entries, setTop5Entries] = useState([]);
  const [challengeInfo, setChallengeInfo] = useState([]);

  const carouselRef = useRef(null);
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
  const test = "testttttesttest";
  useEffect(() => {
    try {
      const getExercises = async () => {
        let { jwt } = await getData();
        const request = await axios.get("http://3.19.67.76:1337/exercises", {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        var slides = [];
        let size = 2;
        let tempEx = request.data;
        while (tempEx.length > 0) {
          slides.push(tempEx.splice(0, size));
        }
        setExercises(slides);
      };
      getExercises();

      const getChallengeEntries = async () => {
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
        setChallengeEntries(entries);
        setTop5Entries(entries.slice(0, 5));
      };
      getChallengeEntries();

      const getChallengeInfo = async () => {
        let gotChallengeInfo;
        await Firebase.app()
          .firestore()
          .collection("rakfitChallenges")
          .doc("challengeInfo")
          .get()
          .then((snapshot) => {
            gotChallengeInfo = {
              challengeName: snapshot.data()["challengeName"],
              challengeIndex: snapshot.data()["challengeIndex"],
              challengeDescription: snapshot.data()["challengeDescription"],
              challengeEnd: snapshot.data()["challengeEnd"].toDate(),
            };
          });
        setChallengeInfo(gotChallengeInfo);
        if (gotChallengeInfo.challengeEnd.getTime() < new Date().getTime()) {
          await updateChallenge(gotChallengeInfo.challengeEnd);
        }
      };
      getChallengeInfo();

      async function updateChallenge(challEnd) {
        challEnd = new Date(challEnd);
        let challenges = [];
        await Firebase.app()
          .firestore()
          .collection("rakfitChallenges")
          .doc("challengeInfo")
          .collection("challenges")
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              const data = doc.data();
              challenges.push([data.index, data.name, data.description]);
            });
          });
        let challLen = challenges.length;
        let newChallengeInfo;
        let newChallengeIndex =
          (parseInt(challengeInfo.challengeIndex) + 1) % challLen;
        let newChallengeEnd = new Date(challEnd.getTime() + 12096e5);
        for (let i = 0; i < challLen; i++) {
          if (challenges[i][0] == newChallengeIndex) {
            newChallengeInfo = {
              challengeName: challenges[i][1],
              challengeIndex: challenges[i][0],
              challengeDescription: challenges[i][2],
              challengeEnd: newChallengeEnd,
            };
            setChallengeInfo(newChallengeInfo);
            break;
          }
        }
        let firebaseNewInfo = newChallengeInfo;
        firebaseNewInfo.challengeEnd = Firebase.firestore.Timestamp.fromDate(
          newChallengeEnd
        );
        await Firebase.app()
          .firestore()
          .collection("rakfitChallenges")
          .doc("challengeInfo")
          .set(firebaseNewInfo);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.white,
      width: "100%",
    },
    container2: {
      flex: 1,
      backgroundColor: Colors.white,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 10,
    },
    buttonView: {
      width: "95%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-evenly",
      paddingBottom: 30,
    },
    challengetext: {
      fontSize: 25,
      color: Colors.primary,
    },
    centerText: {
      justifyContent: "center",
      alignItems: "center",
    },
    fitnesstext: {
      fontSize: 22,
      color: Colors.primary,

      marginTop: 15,
      padding: 5,
    },
    item: {
      width: screenWidth / 2.7,
      height: screenHeight / 4,
    },
    stackItem: {
      width: screenWidth / 2.7,
      height: screenHeight / 7,
    },
    scrollContainer: {
      flex: 1,
      marginLeft: 10,
    },
    imageContainer: {
      flex: 1,
      marginBottom: Platform.select({ ios: 0, android: 1 }),
      backgroundColor: Colors.white,
      borderRadius: 15,
    },
    image: {
      ...StyleSheet.absoluteFillObject,
      resizeMode: "cover",
    },
    title: {
      fontSize: 14,
      color: Colors.black,
      top: "-15%",
    },
    name: {
      fontWeight: "normal",
      fontSize: 18,
    },
    score: {
      fontWeight: "bold",
      fontSize: 18,
    },
    challengeCard: {
      width: "90%",
    },
  });

  const renderItem = ({ item, index }, parallaxProps) => {
    if (item.length == 2) {
      return (
        <View>
          <TouchableOpacity
            style={styles.stackItem}
            onPress={() =>
              navigation.navigate("Fast Fitness", {
                id: item[0].id,
                name: item[0].title,
                form_image: item[0].form_image.url,
                description: item[0].description,
              })
            }
          >
            <ParallaxImage
              source={{ uri: item[0].cover_image.url }}
              containerStyle={styles.imageContainer}
              style={styles.image}
              parallaxFactor={0.4}
              {...parallaxProps}
            />
            <View style={styles.centerText}>
              <Text style={styles.title}>{item[0].title}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.stackItem}
            onPress={() =>
              navigation.navigate("Fast Fitness", {
                id: item[1].id,
                name: item[1].title,
                form_image: item[1].form_image.url,
                description: item[1].description,
              })
            }
          >
            <ParallaxImage
              source={{ uri: item[1].cover_image.url }}
              containerStyle={styles.imageContainer}
              style={styles.image}
              parallaxFactor={0.4}
              {...parallaxProps}
            />
            <View style={styles.centerText}>
              <Text style={styles.title}>{item[1].title}</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.stackItem}
          onPress={() =>
            navigation.navigate("Fast Fitness", {
              id: item[0].id,
              name: item[0].title,
              form_image: item[0].form_image.url,
              description: item[0].description,
            })
          }
        >
          <ParallaxImage
            source={{ uri: item[0].cover_image.url }}
            containerStyle={styles.imageContainer}
            style={styles.image}
            parallaxFactor={0.4}
            {...parallaxProps}
          />
          <View style={styles.centerText}>
            <Text style={styles.centerText}>{item[0].title}</Text>
          </View>
        </TouchableOpacity>
      );
    }
  };

  const renderTop5 = ({ item, index }) => (
    <Text style={styles.name}>
      {index + 1}. {item[0]}: <Text style={styles.score}>{item[1]}</Text>
    </Text>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container2}>
        <Text style={styles.challengetext}>Rakkasan Challenge</Text>

        <Card style={styles.challengeCard}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Rak Challenge", {
                names: challengeEntries,
                title: challengeInfo.challengeName,
                description: challengeInfo.challengeDescription,
              })
            }
          >
            <CardItem>
              <Body>
                <FlatList data={top5Entries} renderItem={renderTop5} />
              </Body>
            </CardItem>
          </TouchableOpacity>
        </Card>

        <Text style={styles.fitnesstext}>Fast Fitness</Text>
        <View style={styles.scrollContainer}>
          <Carousel
            ref={carouselRef}
            sliderWidth={screenWidth}
            sliderHeight={screenWidth}
            itemWidth={screenWidth / 2.7 + 5}
            data={exercises}
            renderItem={renderItem}
            hasParallaxImages
            firstItem={0}
            activeSlideAlignment={"start"}
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
          />
        </View>
        <View style={[styles.buttonView, { paddingTop: 25 }]}>
          <SquareButton
            name="food-apple"
            text="Nutrition"
            buttonSize={50}
            textSize={12}
            iconSize={30}
            onPress={() => navigation.navigate("Nutrition")}
          />
          <SquareButton
            name="food-fork-drink"
            text="DFAC"
            buttonSize={50}
            textSize={12}
            iconSize={30}
            onPress={() => navigation.navigate("DFAC")}
          />
          <SquareButton
            name="food-variant"
            text="H2F"
            buttonSize={50}
            textSize={12}
            iconSize={30}
            onPress={() => navigation.navigate("H2F")}
          />
          <SquareButton
            name="video"
            text="Cooking Tutorials"
            buttonSize={50}
            textSize={8}
            iconSize={30}
            onPress={() => navigation.navigate("Cooking Tutorials")}
          />
        </View>
      </View>
    </ScrollView>
  );
}
