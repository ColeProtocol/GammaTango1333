import React from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Colors from "../../constants/Colors";
import SquareButton from "../../components/SquareButton";
import ExampleVideo from "../../tabs/otherScreens/TempVideo";

export default function Creator1() {
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
    <View style={styles.container}>
      <View style={[styles.buttonView, { paddingTop: 10 }]}>
        <SquareButton
          name="video"
          text="ExampleVideo"
          buttonSize={90}
          textSize={13}
          onPress={() => navigation.navigate("TempVideo")}
        />
      </View>
    </View>
  );
}