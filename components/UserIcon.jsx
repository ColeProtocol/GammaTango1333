import React from "react";
import { View, StyleSheet } from "react-native";
import { Avatar } from "react-native-elements";

import Colors from "../constants/Colors";
import Icon from "./Icon";

export default function UserIcon({ image }) {
  const styles = StyleSheet.create({
    icon: {
      margin: 20,
      marginBottom: 35,
      width: 100,
      height: 100,
      borderRadius: 50,
      borderWidth: 2,
      borderColor: Colors.darkGray,
      backgroundColor: Colors.lightGray,
      justifyContent: "center",
      alignItems: "center",
    },
  });

  return (
    <View style={styles.icon}>
      <Avatar
        position="absolute"
        rounded
        // WEB
        containerStyle={{
          position: "absolute",
        }}
        size={98}
        source={{
          uri: image,
          //"https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
        }}
      />
    </View>
  );
}
