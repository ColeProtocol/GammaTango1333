import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

import Colors from '../constants/Colors';
import Icon from './Icon';
import Dimensions from '../constants/Dimensions';

export default function TextBox({ icon, ...otherProps }) {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: Colors.lightGray,
      borderRadius: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 15,
      marginVertical: 10,
      width: '100%',
    },
    icon: {
      marginLeft: 10,
    },
    textInput: {
      fontSize: 18,
    },
  });
  return (
    <View style={styles.container}>
      <TextInput style={[styles.textInput, Dimensions.font]} {...otherProps} />
      {icon && (
        <Icon style={styles.icon} name={icon} size={20} color={Colors.gray} />
      )}
    </View>
  );
}
