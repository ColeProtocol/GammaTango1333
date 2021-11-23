import React from 'react';
import {
  View, Text, TouchableOpacity,
} from 'react-native';

export default function SquareButton({ text, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View>
        <Text>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}
