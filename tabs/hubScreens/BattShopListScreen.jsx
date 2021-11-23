import React from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../constants/Colors";
import RectButton from "../../components/RectButton";

export default function BattShopListScreen({ route }) {
  const navigation = useNavigation();
  const { name, image, shops } = route.params;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      // justifyContent: "center",
      alignItems: "center",
      backgroundColor: Colors.white,
    },
    buttonContainer: {
      marginTop: 20,
      width: "90%",
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        {/* <Text style={styles.title}> {name} </Text>
        <Image source={image} style={styles.titlePic} /> */}

        {shops.map(
          ({
            id,
            shop_number,
            shop_location,
            shop_email,
            shop_hours,
            //shop_open_hours,
            //shop_close_hours,
            shop_phone_num,
          }) => (
            <RectButton
              key={id}
              text={shop_number}
              onPress={() =>
                navigation.navigate("Batt Shop", {
                  name: name,
                  image: image,
                  shop_number: shop_number,
                  shop_location: shop_location,
                  shop_email: shop_email,
                  shop_hours: shop_hours,
                  //shop_open_hours: shop_open_hours,
                  //shop_close_hours: shop_close_hours,
                  shop_phone_num: shop_phone_num,
                })
              }
              icons
            />
          )
        )}
      </View>
    </View>
  );
}
