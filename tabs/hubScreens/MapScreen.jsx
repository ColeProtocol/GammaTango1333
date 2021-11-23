import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppleMap from '../../components/AppleMap';
import Colors from '../../constants/Colors';

export default function MapScreen() {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.white,
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  return (
    <View style={styles.container}>
      <AppleMap height={910} />
    </View>
  );
}
