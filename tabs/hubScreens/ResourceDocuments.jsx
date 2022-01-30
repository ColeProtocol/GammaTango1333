import {
  View, StyleSheet, Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Colors from '../../constants/Colors';
import RectButton from '../../components/RectButton';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import getData from "../../assets/Async/getData";

export default function ResourceDocuments({route}) {
  const {documents} = route.params;
  console.log(documents);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.white,
      width: '100%',
      alignItems: 'center',
    },
    sv: {
      backgroundColor: Colors.white,
    },
    titleText: {
      color: Colors.primary,

      fontSize: 25,
    },
    buttonView: {
      width: '90%',
      justifyContent: 'space-evenly',
    },
  });
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.sv}>
      <View style={styles.container}>
        <View style={styles.buttonView}>
        {documents.map(({ Document, Name, id}) => (
            <RectButton
              text={Name}
              onPress={() => {
                //console.log(Document[0].url)
                navigation.navigate('ResourcesPDF',{url: Document[0].url});
              }}
              icons
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

/**/