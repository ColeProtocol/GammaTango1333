import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Subtitle({ content }) {
  const styles = StyleSheet.create({
    subtitle: {
      textAlign: 'center',
      fontSize: 24,
      marginVertical: 10,
    },
  });
  return (
    <View>
      <Text style={styles.subtitle}>{content}</Text>
    </View>
  );
}
