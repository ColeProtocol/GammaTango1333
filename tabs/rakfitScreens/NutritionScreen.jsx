import React, { useEffect, useState } from 'react';
import {
  View, StyleSheet, Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Colors from '../../constants/Colors';
import RectButton from '../../components/RectButton';

import HistoryPic from '../../assets/images/history2.png';
import Flag from '../../assets/images/Flag.jpg';

import { ScrollView } from "react-native-gesture-handler";
import getData from "../../assets/Async/getData";
import axios from "axios";

export default function NutritionScreen() {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.white,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
    titleText: {
      color: Colors.primary,

      fontSize: 25,
    },
    buttonView: {
      width: '90%',
    },
    image: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
  });
  const navigation = useNavigation();
  return (
    <ScrollView>
    <View style={styles.container}>
      {/* <View style={styles.image}>
        <Image
          source={HistoryPic}
          style={{ width: 120, height: 120, marginTop: 15 }}
        />
        <Image
          source={Flag}
          style={{ width: 170, height: 120, marginLeft: 20, marginTop: 15 }}
        />
      </View> */}
      <View style={styles.buttonView}>
      <RectButton
          text="Meal Tips"
          onPress={() => {
            navigation.navigate('Meal Tips');
          }}
        //   icons
        />
        <RectButton
          text="Sample Meals and Snacks"
          onPress={() => {
            navigation.navigate('Sample Meals');
          }}
        //   icons
        />
        
        <RectButton
          text="Cooking Guide for Soldiers"
          onPress={() => {
            navigation.navigate('Cooking Guide');
          }}
        //   icons
        />
        <RectButton
          text="Cookbook"
          onPress={() => {
            navigation.navigate('Cookbook');
          }}
        //   icons
        />
        <RectButton
          text="Barracks Shopping List"
          onPress={() => {
            navigation.navigate('Barracks Shopping List');
          }}
        //   icons
        />
        <RectButton
          text="Suppliment Alternatives"
          onPress={() => {
            navigation.navigate('Suppliment Alternatives');
          }}
        //   icons
        />
        <RectButton
          text="pmcs"
          onPress={() => {
            navigation.navigate('PMCS');
          }}
        //   icons
        />
        <RectButton
          text="MRE Breakdown"
          onPress={() => {
            navigation.navigate('MRE');
          }}
        //   icons
        />
        <RectButton text="Grocery Store Coupons" onPress={() => {
            navigation.navigate('Grocery Store Coupons');
          }} 
        //   icons 
        />
        <RectButton
          text="Holiday Meal Plan"
          onPress={() => {
            navigation.navigate('Holiday Meal Plan');
          }}
        //   icons
        />
      </View>
    </View>
    </ScrollView>
  );
}
