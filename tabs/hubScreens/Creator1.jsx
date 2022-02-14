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

export default function Creator1() {
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
      {/* <View style={styles.container2}>
        <Image
          source={require('../../assets/images/Torri.png')}
          style={{ width: 30, height: 30, top: '-3%' }}
        />
        <Text style={styles.challengetext}>Rakkasan Challenge</Text>
        <TouchableOpacity>
          <Card>
            <Image
              source={require('../../assets/images/fitness/fitness2.jpg')}
              style={{
                width: screenWidth / 1.2,
                height: screenWidth / 2.1,
                borderRadius: 10,
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
            itemWidth={screenWidth - 60}
            data={entries}
            renderItem={renderItem}
            hasParallaxImages
            firstItem={1}
          />
        </View>
        <View style={[styles.buttonView, { paddingTop: 10 }]}>
          <SquareButton
            name="food-apple"
            text="Nutrition"
            buttonSize={90}
            textSize={13}
            iconSize={50}
            // onPress={() => navigation.navigate("Program")}
          />
          <SquareButton
            name="food-fork-drink"
            text="DFAC"
            buttonSize={90}
            textSize={14}
            iconSize={50}
            // onPress={() => navigation.navigate("Program")}
          />
        </View>
      </View> */}
    </View>
  );
}
