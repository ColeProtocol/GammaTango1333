import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import UserIcon from "../../components/UserIcon";
import axios from "axios";
import Dimensions from "../../constants/Dimensions";
import Colors from "../../constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import getData from "../../assets/Async/getData";
import Firebase from "../../constants/FireBaseDb";

const { width, height } = Dimensions.window;

export default function Preferences({ route }) {
  //const { image } = route.params;
  const navigation = useNavigation();
  //const { topic_id, topic_title } = route.params;
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [id, setId] = useState();

  const [displayName, setDisplay] = useState("");
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmNewPass, setConfirmNewPass] = useState("");
  const [picture, setPicture] = useState();

  useEffect(() => {
    const getData = async () => {
      const val = await AsyncStorage.getItem("@user_data").catch(console.log);
      const json = JSON.parse(val);

      setUsername(json.user['Title'] + " " + json.user['name'] + " " + json.user['Battalion']);
      setEmail(json.user.email);
      setId(json.user.id);
      await Firebase.app()
        .firestore()
        .collection("users")
        .doc(json.user.email)
        .get()
        .then((docSnapshot) => {
          setPicture(docSnapshot.get("picture"));
        });
    };

    getData();
  }, []);

  const confirmPasswords = async () => {
    try {
      let { jwt } = await getData();
      axios
        .put(
          "http://3.19.67.76:1337/users/" + id,
          {
            password: newPass,
          },
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        )
        .then((response) => {
          alert("\nPassword has been reset");
        })
        .catch((error) => {
          // Handle error.
          alert("An error occurred:" + error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  
  const newPassword = async () => {
    axios
      .post("http://3.19.67.76:1337/auth/local", {
        identifier: email,
        password: oldPass,
      })
      .then((response) => {
        if (newPass != null && newPass != "" && newPass == confirmNewPass) {
          confirmPasswords();
        } else {
          alert("New passwords must match");
        }
      })
      .catch((error) => {
        // Handle error.
        alert("Could not verify credentials");
      });
  };

  const handleSubmit = async () => {
    if (displayName != null && displayName != "") {
      newUserName();
    }
    if (oldPass != null && oldPass != "") {
      newPassword();
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.blue5,
      alignItems: "center",
      justifyContent: "center",
    },
    button: {
      backgroundColor: Colors.primary,
      height: 45,
      marginHorizontal: 60,
      borderRadius: 35,
      alignItems: "center",
      justifyContent: "center",
      marginVertical: 5,
      shadowOffset: { width: 2, height: 2 },
      shadowColor: "black",
      shadowOpacity: 0.2,
      marginTop: 10,
    },
    buttonText: {
      color: "white",
      fontSize: 20,
      fontWeight: "bold",
      ///*fontFamily: "fira-sans",*/
    },
    titleInput: {
      ///*fontFamily: "fira-sans",*/
      height: 40,
      borderRadius: 15,
      borderWidth: 0.5,
      marginHorizontal: 20,
      paddingLeft: 15,
      marginVertical: 5,
      borderColor: "rgba(0,0,0,0.2)",
    },
    textInput: {
      ///*fontFamily: "fira-sans",*/
      height: 300,
      borderRadius: 25,
      borderWidth: 0.5,
      marginHorizontal: 20,
      paddingLeft: 15,
      marginVertical: 5,
      borderColor: "rgba(0,0,0,0.2)",
    },
    header: {
      textAlign: "center",
      fontSize: 25,
      paddingVertical: 20,
    },
    name: {
      fontSize: 26,
      color: Colors.darkGray,
      textTransform: "capitalize",
    },
    email: {
      fontSize: 16,
      color: Colors.gray,
    },
  });

  return (
    <View>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Image
          source={{ uri: picture }}
          style={{ width: 100, height: 100, borderRadius: 400 / 2, margin: 7 }}
        />
        <Text style={[styles.name, Dimensions.font]}>{username}</Text>
        <Text style={[styles.email, Dimensions.font]}>{email}</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("Avatar List", {
            email: email,
            id: id,
          });
        }}
      >
        <Text style={styles.buttonText}>Change Profile Picture</Text>
      </TouchableOpacity>

      <Text style={styles.header}>Change Password</Text>
      <TextInput
        placeholder="enter old password"
        style={styles.titleInput}
        placeholderTextColor={Colors.gray}
        secureTextEntry
        autoCorrect={false}
        autoCapitalize="none"
        value={oldPass}
        onChangeText={(val) => setOldPass(val)}
        maxLength={300}
      />
      <TextInput
        placeholder="enter new password"
        style={styles.titleInput}
        placeholderTextColor={Colors.gray}
        secureTextEntry
        autoCorrect={false}
        autoCapitalize="none"
        value={newPass}
        onChangeText={(val) => setNewPass(val)}
        maxLength={300}
      />
      <TextInput
        placeholder="confirm new password"
        style={styles.titleInput}
        placeholderTextColor={Colors.gray}
        secureTextEntry
        autoCorrect={false}
        autoCapitalize="none"
        value={confirmNewPass}
        onChangeText={(val) => setConfirmNewPass(val)}
        maxLength={300}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          Keyboard.dismiss();
          handleSubmit();
        }}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}
