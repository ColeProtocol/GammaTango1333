import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';

import Card from '../../components/Card';
import Colors from '../../constants/Colors';
import Dimensions from '../../constants/Dimensions';
import SquareButton from '../../components/SquareButton';

const screenWidth = Dimensions.window.width;
const screenHeight = Dimensions.window.height;

export default function Book3() {
  const navigation = useNavigation();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.white,
      width: '100%',
    },
    container2: {
      flex: 1,
      backgroundColor: Colors.white,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40,
    },
    buttonView: {
      width: '85%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      paddingBottom: 55,
    },
    challengetext: {
      fontSize: 25,
      color: Colors.primary,
    },
    fitnesstext: {
      fontSize: 22,
      color: Colors.primary,

      marginTop: 25,
      padding: 5,
    },
    item: {
      width: screenWidth - 60,
      height: screenHeight / 5.5,
    },
    scrollContainer: {
      flex: 1,
    },
    imageContainer: {
      flex: 1,
      marginBottom: Platform.select({ ios: 0, android: 1 }),
      backgroundColor: Colors.white,
      borderRadius: 30,
    },
    image: {
      ...StyleSheet.absoluteFillObject,
      resizeMode: 'cover',
    },
    title: {
      fontSize: 20,
      color: Colors.white,

      top: '-12%',
      left: '5%',
    },
  });

  return (
    <View style={styles.container}>

      <View style={[styles.buttonView, { paddingTop: 10 }]}>
        <SquareButton
          name="book"
          text="Information about the Author"
          buttonSize={90}
          textSize={13}
          onPress={() => navigation.navigate("Book1")}
        />
        <SquareButton
          name="book"
          text="Releated Reads"
          buttonSize={90}
          textSize={13}
          onPress={() => navigation.navigate("Book2")}
        />
        <SquareButton
          name="book"
          text="More information"
          buttonSize={90}
          textSize={13}
          onPress={() => navigation.navigate("Book3")}
        />
      </View>
    </View>
  );
}
