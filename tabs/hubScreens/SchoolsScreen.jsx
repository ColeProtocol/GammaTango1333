import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import BattalionButton from "../../components/BattalionButton";
//import SquareButton from "../../components/SquareButton";
import Colors from "../../constants/Colors";
import axios from "axios";
import getData from "../../assets/Async/getData";

export default function SchoolsScreen() {
  const navigation = useNavigation();
  const [resources, setResources] = useState([]);

  useEffect(() => {
    try {
      const getSchoolResources = async () => {
        let { jwt } = await getData();
        const request = await axios.get(
          "http://3.19.67.76:1337/training-and-schools",
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        setResources(request.data);
      };

      getSchoolResources();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const styles = StyleSheet.create({
    container: {
      flexWrap: "wrap",
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "center",
      backgroundColor: Colors.white,
      width: "100%",
      height: "100%",
    },
    buttonView: {
      width: "45%",
      alignItems: "center",
      justifyContent: "space-evenly",
      paddingBottom: 30,
    },
    image: {
      marginTop: "5%",
      marginBottom: "15%",
      width: "100%",
    },
  });

  return (
    <View style={styles.container}>
      <View style={{ width: "100%" }}>
        <Image
          source={require("../../assets/images/Torri.png")}
          style={{
            width: 30,
            height: 30,
            top: "1%",
            marginBottom: 55,
            alignSelf: "center",
          }}
        />
      </View>

      {resources.map(
        ({
          id,
          school_logo,
          school,
          school_phone,
          school_email,
          grad_times,
          school_location,
          report_times,
        }) => (
          <View style={[styles.buttonView]}>
            <BattalionButton
              id={id}
              image={school_logo.url}
              //buttonSize={65}
              iconWidth={65}
              iconHeight={70}
              onPress={() =>
                navigation.navigate("School", {
                  image: school_logo.url,
                  name: school,
                  email: school_email,
                  location: school_location,
                  phone: school_phone,
                  grad_times: grad_times,
                  report_times: report_times,
                })
              }
            />
            <Text>{school}</Text>
          </View>
        )
      )}
    </View>
  );
}
