import React, { useRef, useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as firebase from "firebase";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
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

export default function CalendarScreen() {
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
  function selectDate(day) {
    const getData = async () => {
      const val = await AsyncStorage.getItem("@user_data").catch(console.log);
      const json = await JSON.parse(val);

      
       firebase.app()
        .firestore()
        .collection("users")
        .doc(json.user.email)
        .get()
        .then((docSnapshot) => {
          SelectedDate( day, json.user['Title'] + " " + json.user['name'] + " " + json.user['Battalion']);

        });
    };

    getData();
  }

  function SelectedDate(day, creator){
  console.log(creator + " creator")

  navigation.navigate('DayEvents', { date: day, creater : creator});
  }
  
  

  return (
    <View style={{ paddingTop: 50, flex: 1 }}>
        <Calendar
          // Initially visible month. Default = Date()
          current={'2022-01-01'}
          // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
          minDate={'2012-05-10'}
          // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
          maxDate={'2022-05-30'}
          // Handler which gets executed on day press. Default = undefined
          onDayPress={day => {
            console.log('selected day', day);
            //navigation.navigate('SchedSubmitScreen', {date : day})
                selectDate(day);
          }}
          // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
          monthFormat={'yyyy MM'}
          // Handler which gets executed when visible month changes in calendar. Default = undefined
          onMonthChange={month => {
            console.log('month changed', month);
          }}
          // Hide month navigation arrows. Default = false
          hideArrows={true}
          // Do not show days of other months in month page. Default = false
          hideExtraDays={true}
          // If hideArrows=false and hideExtraDays=false do not swich month when tapping on greyed out
          // day from another month that is visible in calendar page. Default = false
          disableMonthChange={true}
          // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
          firstDay={1}
        />
      </View>
  );
}
