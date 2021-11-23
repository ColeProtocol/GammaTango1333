import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CountDown from 'react-native-countdown-component';
import { LinearGradient } from 'expo-linear-gradient';

import Colors from '../constants/Colors';

export default function GameTab() {
  const styles = StyleSheet.create({
    text: {
      fontSize: 40,
      color: Colors.white,
      marginBottom: 30,
    },
  });
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <LinearGradient
        colors={[Colors.white, Colors.primary]}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: 950,
        }}
      />
      <Text style={styles.text}>COMING SOON!</Text>
      <CountDown
        until={3000000}
        onFinish={() => alert('finished')}
        onPress={() => alert('coming soon...')}
        digitStyle={{ backgroundColor: '#FFF' }}
        digitTxtStyle={{ color: Colors.primary }}
        // separatorStyle={{ color: Colors.primary }}
        timeToShow={['D', 'H', 'M', 'S']}
        timeLabels={{
          d: 'Days', h: 'Hours', m: 'Mins', s: 'Secs',
        }}
        timeLabelStyle={{ color: Colors.white }}
        size={30}
      />
    </View>
  );
}
