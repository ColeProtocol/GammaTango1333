import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, Image, SafeAreaView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { ScrollView } from "react-native-gesture-handler";
import SquareButton from "../../components/SquareButton";
import Colors from "../../constants/Colors";
import ResourceCard from "../../components/ResourceCard";
import getData from "../../assets/Async/getData";
import ResourceButton from '../../components/ResourceButton';


export default function ResourcesScreen() {
  const navigation = useNavigation();
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const getArmyResources = async () => {
      try {
        let { jwt } = await getData();
        const request = await axios.get("http://3.19.67.76:1337/resources", {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        //console.log(request.data);
        //const armyResources = request.data.filter(
        //(data) => data.resource_type === 'army',
        //);

        setResources(request.data);
      } catch (error) {
        console.error(error);
      }
    };

    getArmyResources();
  }, []);

  const styles = StyleSheet.create({
    sv: {
      backgroundColor: Colors.white,
    },
    container: {
      flexWrap: "wrap",
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "center",
      backgroundColor: Colors.white,
      width: "100%",
      paddingTop: 15,
    },
    image: {
      marginTop: "5%",
      width: "100%",
    },
    buttons: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-evenly",
      paddingBottom: 20,
    },
  });
  return (
    <ScrollView style={styles.sv}>
      <View style={styles.container}>
        {resources.map(({ Id, Name, Logo, Description, Events}) => (
          <View style={styles.buttons} key={Id} >
            <ResourceButton
              key={Id}
              text={Name + '\n' + Description}
              image={Logo.url}
              iconWidth={70}
              iconHeight={70}
              onPress={() =>
                navigation.navigate("Resource", {
                  id: Id,
                  name: Name,
                  events: Events,
                  image: Logo.url,
                  description: Description,
                })
              }
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
