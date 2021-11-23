import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../constants/Colors";
import SquareButton from "../../components/SquareButton";

export default function BattUnitScreen({ route }) {
  const navigation = useNavigation();
  const { id, name, image, shops, policy } = route.params;

  //const whereToNavigate = name === "HHC" ? "Batt Shop" : "Batt Shop List";
  console.log(policy);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      // justifyContent: "center",
      alignItems: "center",
      backgroundColor: Colors.white,
    },
    title: {
      fontSize: 36,
      color: Colors.darkGray,
      marginBottom: 10,
    },
    titlePic: {
      width: 130,
      height: 130,
      top: "-5%",
      marginTop: 20,
    },
    titleContainer: {
      alignItems: "center",
      marginTop: 80,
    },
    buttonView: {
      marginTop: 35,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-evenly",
      paddingBottom: 15,
      width: "100%",
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}> {name} </Text>
        <Image source={{ uri: image }} style={styles.titlePic} />

        <View style={styles.buttonView}>
          <SquareButton
            name="earth"
            text="News"
            buttonSize={90}
            textSize={14}
            onPress={() =>
              navigation.navigate("Battalion News", {
                id: id,
                name: name,
              })
            }
          />

          <SquareButton
            name="book-open"
            text="Policies" // Could change to "Commanders' Vision", but it doesn't fit
            buttonSize={90}
            textSize={14}
            onPress={() =>
              navigation.navigate("Batt Policies", {battPolicy: policy})
            }
          />
        </View>

        <View style={[styles.buttonView, { paddingBottom: 25 }]}>
          <SquareButton
            name="account-group"
            text="Call Roster"
            buttonSize={90}
            textSize={14}
            onPress={() =>
              navigation.navigate("Call Roster", {
                id: id,
              })
            }
          />

          <SquareButton
            name="star-circle"
            text="S-Shop" // Could change to "Off Limit Establishments", but it doesn't fit
            buttonSize={90}
            textSize={14}
            onPress={() =>
              navigation.navigate("Batt Shop List", {
                id: id,
                name: name,
                image: image,
                shops: shops,
              })
            }
          />
        </View>
      </View>
    </View>
  );
}
