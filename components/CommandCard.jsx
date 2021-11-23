import React from 'react';
import {
  TouchableOpacity, Text, StyleSheet, Image, View,
} from 'react-native';

import Colors from '../constants/Colors';
import Dimensions from '../constants/Dimensions';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    marginTop: 35,
    marginHorizontal: 20,
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  image: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    width: 75,
    height: 100,
    marginRight: 20,
  },
  titleContainer: {
    flex: 1,
  },
  text: {
    color: Colors.darkGray,
    fontSize: 20,
  },
});

export default function CommandCard({ source, title, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image style={styles.image} resizeMode="cover" source={source} />
      <View style={styles.titleContainer}>
        <Text style={[styles.text, Dimensions.font]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}
