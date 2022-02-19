import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Linking } from 'react-native';

import Colors from "../../constants/Colors";

export default function TempVideo() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = React.useState("");

  const onChangeSearch = (query) => setSearchQuery(query);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.white,
      width: "100%",
      //alignItems: "center",
      //justifyContent: "center",
    },
    buttonView: {
      width: "100%",
      flexDirection: "column",
      //alignItems: "center",
      justifyContent: "space-evenly",
      paddingBottom: 15,
    },
  });
  return (
    <View style={{ alignItems: 'center' }}>
        <Text></Text>
        <Text style={{color: 'blue', fontSize: 25}}
              onPress={() => Linking.openURL('https://www.youtube.com/watch?v=K4TOrB7at0Y')}>
          ExampleVideoLink
        </Text>
        <Text></Text>
        <Text style={{fontSize: 20, textAlign: 'center'}}> This is a temporary hyperlink to an example video. </Text>
    </View>
  );
}
