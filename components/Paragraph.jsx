import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Paragraph({ content }) {
  const styles = StyleSheet.create({
    paragraph: {
      fontSize: 16,
      textAlign: 'left',
      marginVertical: 5,
    },
  });
  return (
    <View>
      <Text style={styles.paragraph}>{content}</Text>
    </View>
  );
}
