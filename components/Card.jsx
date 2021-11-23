import React from 'react';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  card: {
    elevation: 5, // android
    shadowColor: 'black', // shadow - ios
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    backgroundColor: 'transparent',
    padding: 15,
    borderRadius: 15,
  },
});

const Card = (props) => {
  const { style, children } = props;
  return (
    <View style={{ ...styles.card, ...style }}>{children}</View>
  );
};

export default Card;
