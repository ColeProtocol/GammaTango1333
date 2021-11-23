import React from 'react';
import { View, Image } from 'react-native';

export default function DocumentImage({ uri }) {
  return (
    <View>
      <Image source={{ uri }} />
    </View>
  );
}
