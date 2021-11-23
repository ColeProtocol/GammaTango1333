import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import Colors from "../../constants/Colors";
import Dimensions from "../../constants/Dimensions";
import axios from "axios";
import getData from "../../assets/Async/getData";
import BattalionButton from "../../components/BattalionButton";

export default function BattScreen() {
  const navigation = useNavigation();
  const [battalions, setBattalions] = useState([]);

  useEffect(() => {
    try {
      const getBattalions = async () => {
        let { jwt } = await getData();
        const request = await axios.get("http://3.19.67.76:1337/battalions", {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        setBattalions(request.data);
      };
      getBattalions();
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
      width: "100%",
      height: Dimensions.window.height - 105,
    },
    buttonPair: {
      width: "40%",
      alignItems: "center",
      justifyContent: "space-evenly",
      paddingTop: 30,
    },
  });

  return (
    <ScrollView>
      <View style={styles.container}>
        {battalions.map(({ id, battalion_icon, battalion, shops, policy }) => (
          <View style={styles.buttonPair}>
            <BattalionButton
              key={id}
              text={battalion}
              image={battalion_icon.url}
              iconWidth={65}
              iconHeight={70}
              onPress={() =>
                navigation.navigate("Battalion", {
                  id: id,
                  name: battalion,
                  image: battalion_icon.url,
                  shops: shops,
                  policy: policy,
                })
              }
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
