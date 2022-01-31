import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Bold({ content }) {
  const styles = StyleSheet.create({
    bold: {
      fontStyle: 'bold',
      fontSize: 18,
      fontWeight: '600',
      textAlign: 'left',
      marginVertical: 5,
    },
  });
  return (
    <View>
      <Text style={styles.bold}>{content}</Text>
    </View>
  );
}
