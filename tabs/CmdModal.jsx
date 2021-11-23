import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Modal,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import Colors from "../constants/Colors";
import RectButton from "../components/RectButton";
import Dimensions from "../constants/Dimensions";

export default function CmdModal({route}) {
  
  const navigation = useNavigation();
  const {name, body} = route.params;
  const [modal1Visible, setModal1Visible] = useState(true);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.white,
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
    modalView: {
      width: "90%",
      height: "90%",
      backgroundColor: "white",
      borderRadius: 20,
      paddingTop: 35,
      paddingBottom: 25,
      paddingLeft: 35,
      paddingRight: 25,
      alignItems: "center",
      justifyContent: "space-between",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.6,
      shadowRadius: 3.84,
      elevation: 8,
    },
    modalTitle: {
      fontSize: 20,
      color: Colors.darkGray,
      marginBottom: 10,
    },
    modalBody: {
      fontSize: 16,
      color: Colors.darkGray,
    },
    modalBio: {
      marginBottom: 15,
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",

      // marginTop: 22,
    },
  });

  return (

    <ScrollView>
      <SafeAreaView style={styles.container}>
        <Modal animationType="slide" transparent visible={modal1Visible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <ScrollView style={styles.modalBio}>
                <Text style={[Dimensions.font, styles.modalTitle]}>
                  {name}
                </Text>
                <Text style={[Dimensions.font, styles.modalBody]}>
                  {body}
                </Text>
              </ScrollView>
              <RectButton
                text="Dismiss"
                onPress={() => {
                  navigation.navigate("Command");
                  setModal1Visible(!modal1Visible);
                }}
              />
            </View>
          </View>
        </Modal>

      </SafeAreaView>
    </ScrollView>
  );
}
