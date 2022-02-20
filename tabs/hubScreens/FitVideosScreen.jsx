import React from "react";
import {useState, useCallback, useRef, styles} from "react";
import { StyleSheet, Text, View } from "react-native";
import {Button, Alert} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
const FitVideosScreen = () => {
  const [playing, setPlaying] = useState(false);
  const togglePlaying = () => {
    setPlaying((prev) => !prev);
  }
  return (
    <View>
      <YoutubePlayer
        height={300}
        play={playing}
        videoId={'G4h51l7d3gA'}
      />
      <Button title={playing ? 'pause' : 'play'} onPress={togglePlaying} />
    </View>
  );
};
export default FitVideosScreen;
