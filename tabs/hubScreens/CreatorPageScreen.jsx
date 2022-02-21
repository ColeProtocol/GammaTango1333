import React from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Colors from "../../constants/Colors";
import SquareButton from "../../components/SquareButton";
import { Searchbar } from "react-native-paper";

export default function BattScreen() {
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
          name="creator"
          text="Creator1"
          buttonSize={90}
          textSize={13}
          onPress={() => navigation.navigate("Creator1")}
        />
      </View>
    </View>
  );
}