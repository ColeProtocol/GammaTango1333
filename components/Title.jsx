import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Title({ content }) {
  const styles = StyleSheet.create({
    title: {
      textAlign: 'center',
      fontSize: 30,
      marginVertical: 10,
    },
  });
  return (
    <View>
      <Text style={styles.title}>{content}</Text>
    </View>
  );
}
