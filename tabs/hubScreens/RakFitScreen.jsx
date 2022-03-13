import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";

import axios from "axios";
import getData from "../../assets/Async/getData";
import Card from "../../components/Card";
import Colors from "../../constants/Colors";
import Dimensions from "../../constants/Dimensions";
import SquareButton from "../../components/SquareButton";

const screenWidth = Dimensions.window.width;
const screenHeight = Dimensions.window.height;
const ENTRIES1 = [
  [
    {
      title: "City Jog",
      illustration: require("../../assets/images/fitness/jog.jpeg"),
    },
    {
      title: "Agility",
      illustration: require("../../assets/images/fitness/agility.jpeg"),
    },
  ],
  [
    {
      title: "Sprints",
      illustration: require("../../assets/images/fitness/fitness2.jpg"),
    },
    {
      title: "Lifting",
      illustration: require("../../assets/images/fitness/lifting.jpeg"),
    },
  ],
  [
    {
      title: "Yoga",
      illustration: require("../../assets/images/fitness/fitness3.jpg"),
    },
    {
      title: "Yoga",
      illustration: require("../../assets/images/fitness/fitness3.jpg"),
    },
  ],
];

export default function RakFitScreen() {
  const navigation = useNavigation();
  const [exercises, setExercises] = useState([]);
  const carouselRef = useRef(null);
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
        let size = 2; //Based on the size you want
        let tempEx = request.data;
        while (tempEx.length > 0) {
          slides.push(tempEx.splice(0, size));
        }
        setExercises(slides);
      };
      getExercises();
    } catch (error) {
      console.log(error);
    }
    //setEntries(ENTRIES1);
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
      width: "85%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-evenly",
      paddingBottom: 55,
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

      marginTop: 25,
      padding: 5,
    },
    item: {
      width: screenWidth / 2.7,
      height: screenHeight / 4,
    },
    stackItem: {
      width: screenWidth / 2.7,
      height: screenHeight / 8,
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
      console.log(item);
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
            <Text style={styles.title}>{item[0].title}</Text>
          </View>
        </TouchableOpacity>
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container2}>
        <Text style={styles.challengetext}>Rakkasan Challenge</Text>
        <TouchableOpacity>
          <Card>
            <Image
              source={require("../../assets/images/fitness/fitness2.jpg")}
              style={{
                width: screenWidth / 1.5,
                height: screenWidth / 2.5,
              }}
            />
          </Card>
        </TouchableOpacity>

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
            firstItem={1}
            activeSlideAlignment={"start"}
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
          />
        </View>
        <View style={[styles.buttonView, { paddingTop: 10 }]}>
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
