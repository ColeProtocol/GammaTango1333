import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Table, Rows } from "react-native-table-component";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../constants/Colors";
import RectButton from "../../components/RectButton";
import Dimensions from "../../constants/Dimensions";

export default function BattShopScreen({ route }) {
  const navigation = useNavigation();
  const {
    name,
    image,
    shop_number,
    shop_location,
    shop_email,
    shop_hours,
    //shop_open_hours,
    //shop_close_hours,
    shop_phone_num,
  } = route.params;

  const shopInfo = [
    ["Shop:", `${shop_number || "...loading"}`],
    ["Location:", `${shop_location || "...loading"}`],
    ["Hours:", `${shop_hours || "...loading"}`],
  ];

  const titleWidth = Dimensions.window.width * 0.28;
  const contentWidth = Dimensions.window.width * 0.65;
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      // justifyContent: "center",
      alignItems: "center",
      backgroundColor: Colors.white,
    },
    title: {
      fontSize: 30,
      color: Colors.darkGray,
      marginBottom: 10,
    },
    titlePic: {
      width: 100,
      height: 100,
      top: "-5%",
    },
    titleContainer: {
      alignItems: "center",
    },
    buttonContainer: {
      marginTop: 10,
      width: "90%",
    },
    buttonView: {
      marginTop: 35,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-evenly",
      paddingBottom: 15,
      width: "100%",
    },
    tableText: {
      fontSize: 18,
      margin: 5,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}> {name} </Text>
        <Image source={{ uri: image }} style={styles.titlePic} />
      </View>

      <View style={styles.buttonContainer}>
        <Table
          style={{ marginBottom: 10 }}
          borderStyle={{ borderWidth: 3, borderColor: Colors.lightGray }}
        >
          <Rows
            data={shopInfo}
            textStyle={[styles.tableText, Dimensions.font]}
            widthArr={[titleWidth, contentWidth]}
          />
        </Table>

        <RectButton
          text="Contact Info/Details"
          onPress={() =>
            navigation.navigate("Batt Shop Contact", {
              shop_email: shop_email,
              shop_phone_num: shop_phone_num,
            })
          }
        />
        <RectButton
          text="Security Clearance"
          onPress={() => navigation.navigate("Batt Shop Clearance")}
        />
        <RectButton
          text="Regulations"
          onPress={() => navigation.navigate("Batt Shop Regulations")}
        />
        <RectButton
          text="Function"
          onPress={() => navigation.navigate("Batt Shop Function")}
        />
      </View>
    </View>
  );
}
