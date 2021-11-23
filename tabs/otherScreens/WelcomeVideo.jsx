import * as React from "react";
import { ScrollView, View, StyleSheet, Text } from "react-native";
import { Video } from "expo-av";
import Colors from "../../constants/Colors";
import Button from "../../components/Button";

export default function WelcomeVideo({ navigation }) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      //justifyContent: "center",
      //alignItems: "center",
      marginTop: 25,
      backgroundColor: "#ecf0f1",
    },
    text: {
      fontSize: 50,
      fontWeight: "bold",
      textAlign: "center",
    },
    video: {
      borderWidth: 1,
      borderColor: Colors.primary,
      alignSelf: "center",
      width: 400,
      height: 250,
      marginTop: 50,
    },
    secondaryText: {
      fontSize: 18,
      paddingHorizontal: 40,
      textAlign: "center",
      marginTop: 32,
    },
    buttons: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 40,
      marginTop: 50,
    },
  });
  return (
    <ScrollView style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.text}>Welcome to the RAKapp!</Text>
        <Text style={styles.secondaryText}>
          Start your rendezvous with destiny!
        </Text>
      </View>
      <Video
        style={styles.video}
        source={{
          uri:
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
        }}
        resizeMode="cover"
        useNativeControls
      />

      <View style={styles.buttons}>
        <Button
          title="Continue"
          onPress={() => navigation.navigate("Tab Bar")}
        />
      </View>
    </ScrollView>
  );
}
