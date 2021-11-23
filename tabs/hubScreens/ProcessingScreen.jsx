import React from 'react';
import {
  View, StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Colors from '../../constants/Colors';
import SquareButton from '../../components/SquareButton';

export default function BattScreen() {
  const navigation = useNavigation();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.white,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonView: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      paddingBottom: 15,
    },
  });
  return (
    <View style={styles.container}>
      <View style={[styles.buttonView, { paddingTop: 10 }]}>
        <SquareButton
          name="shield"
          text="In"
          buttonSize={90}
          textSize={13}
          onPress={() => navigation.navigate('In Processing')}
        />
        <SquareButton
          name="history"
          text="Out"
          buttonSize={90}
          textSize={13}
          onPress={() => navigation.navigate('Out Processing')}
        />
      </View>
    </View>
  );
}
