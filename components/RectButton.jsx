import React from 'react';
import {
  Text, StyleSheet, TouchableOpacity, Image,
} from 'react-native';

import Colors from '../constants/Colors';
import Dimensions from '../constants/Dimensions';

import Torri from '../assets/images/Torri.png';

export default function RectButton({
  text,
  onPress,
  color = 'primary',
  icons,
}) {
  const styles = StyleSheet.create({
    button: {
      backgroundColor: Colors.primary,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      width: '100%',
      marginVertical: 10,
      flexDirection: 'row',
    },
    text: {
      marginTop: 7,
      marginHorizontal: 30,
      fontSize: 18,
      color: Colors.white,
      backgroundColor: 'transparent',
      textTransform: "capitalize"
    },
    leftIcon: {
      width: 20,
      height: 20,
      marginLeft: 30,
    },
    rightIcon: {
      width: 20,
      height: 20,
      marginRight: 30,
    },
  });
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: Colors[color] }]}
      onPress={onPress}
    >
      {icons === true && (
        <Image
          source={Torri}
          style={styles.leftIcon}
        />
      )}
      <Text style={[styles.text, Dimensions.font]}>{text}</Text>
      {icons === true && (
        <Image
          source={Torri}
          style={styles.rightIcon}
        />
      )}
    </TouchableOpacity>
  );
}
