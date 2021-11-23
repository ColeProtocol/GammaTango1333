import React from 'react';
import {
  View, StyleSheet, Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Colors from '../../constants/Colors';
import RectButton from '../../components/RectButton';

import HistoryPic from '../../assets/images/history2.png';
import Flag from '../../assets/images/Flag.jpg';
import { ScrollView } from 'react-native-gesture-handler';

export default function HistoryScreen() {
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
          <RectButton
            text="Document 1"
            onPress={() => {
              //navigation.navigate('Notable Events');
            }}
            icons
          />
        </View>
      </View>
    </ScrollView>
  );
}
