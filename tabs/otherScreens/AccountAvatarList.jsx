import React, { useEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Image, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import Colors from "../../constants/Colors";
import axios from "axios";
import getData from "../../assets/Async/getData";
//import * as ImagePicker from "react-native-image-picker";
import { ActionSheet, Root } from "native-base";
import * as ImagePicker from "expo-image-picker";
import Firebase from "../../constants/FireBaseDb";
import FormData from 'form-data';

export default function AccountAvatarList({ route }) {
  const navigation = useNavigation();
  const { id, email } = route.params;
  const [avatar, setAvatar] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    try {
      const getAvatar = async () => {
        let { jwt } = await getData();
        const request = await axios.get(
          "http://3.19.67.76:1337/profile-pictures-options",
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        setAvatar(request.data);
      };
      getAvatar();

      (async () => {
        if (Platform.OS !== "web") {
          const {
            status,
          } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== "granted") {
            alert("Sorry, we need camera roll permissions to make this work!");
          }
        }
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const setNewAvatar = async (profile_picture_avatar) => {
    try {
      console.log(profile_picture_avatar);
      let { jwt } = await getData();
      axios
        .put(
          "http://3.19.67.76:1337/users/" + id,
          {
            profile_picture: profile_picture_avatar,
          },
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        )
        .then((response) => {
          Firebase.app()
            .firestore()
            .collection("users")
            .doc(email)
            .update({
              picture: profile_picture_avatar.url,
            })
            .then((response) => {
              alert("Your avatar has been updated");

              navigation.navigate("Hub");
              navigation.reset();
            });
        })
        .catch((error) => {
          // Handle error.
          alert("An error occurred:" + error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const launchCamera = async () => {
    //e.preventDefault();

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);

      const uri = result.uri;
      const CMSEndpoint = 'http://3.19.67.76:1337';
      const formData = new FormData();
      formData.append(
        'files',
        { uri, name: 'image.jpg', type: 'image/jpeg' },
      );

      try {
        const response = await axios
          .post(`${CMSEndpoint}/auth/local`, {
            identifier: 'imageupload@rakapp.com',
            password: 'imageuploader',
          });
        const { jwt } = response.data;

        if (jwt) {
          const imageResponse = await axios.post(`${CMSEndpoint}/upload`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${jwt}`,
            },
          });
          console.log(imageResponse.data);
          setNewAvatar(imageResponse.data[0]);
        }
      } catch (error) {
        console.log('File Upload Error', error);
      }

  };

  const selectImages = () => {
    const buttons = ["Camera", "Photo Library", "Cancel"];
    ActionSheet.show(
      {
        options: buttons,
        cancelButtonIndex: 2,
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            launchCamera();
            break;
          case 1:
            pickImage();
            break;
          default:
            break;
        }
      }
    );
  };

  const styles = StyleSheet.create({
    container: {
      flexWrap: "wrap",
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "center",
      width: "100%",
      paddingBottom: 15,
    },
    button: {
      backgroundColor: Colors.primary,
      height: 45,
      marginHorizontal: 50,
      borderRadius: 35,
      alignItems: "center",
      justifyContent: "center",
      shadowOffset: { width: 2, height: 2 },
      shadowColor: "black",
      shadowOpacity: 0.2,
      padding: 6,
    },
    buttonText: {
      color: "white",
      fontSize: 20,
      fontWeight: "bold",
      padding: 6,
      ///*fontFamily: "fira-sans",*/
    },
    picture: {
      height: 100,
      width: 100,
      borderRadius: 50,
      borderColor: "black",
      borderWidth: 1,
      marginBottom: 50,
      backgroundColor: Colors.white,
    },
    buttonPair: {
      width: "40%",
      alignItems: "center",
      justifyContent: "space-evenly",
    },
    header: {
      textAlign: "center",
      fontSize: 25,
      paddingVertical: 20,
    },
  });

  return (
    <ScrollView>
      <Text style={styles.header}>Select a profile picture</Text>
      <View style={styles.container}>
        {avatar.map(({ id, profile_picture_avatar }) => (
          <TouchableOpacity
            key={id}
            style={styles.buttonPair}
            onPress={() => {
              setNewAvatar(profile_picture_avatar);
            }}
          >
            <Image
              style={styles.picture}
              source={{
                uri: profile_picture_avatar.url,
              }}
            />
          </TouchableOpacity>
        ))}

        {/*<TouchableOpacity
          style={styles.button}
          onPress={() => {
            pickImage();
          }}
        >
          <Text style={styles.buttonText}>Request a profile picture</Text>
        </TouchableOpacity>*/}
      </View>

      <Root>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              selectImages();
            }}
          >
            <Text style={styles.buttonText}>
              Upload your own profile picture
            </Text>
          </TouchableOpacity>
        </View>
      </Root>
    </ScrollView>
  );
}