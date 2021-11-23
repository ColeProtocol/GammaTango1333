import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Table, Rows } from "react-native-table-component";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";
import Colors from "../../constants/Colors";
import Dimensions from "../../constants/Dimensions";

export default function CallRosterScreen({ route }) {
  const id = route.params.id;
  const [roster, setRoster] = useState([]);

  useEffect(() => {
    const getRoster = async () => {
      let { jwt } = await getData();
      const request = await axios.get("http://3.19.67.76:1337/battalions/" + id, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      const rosterArrayJSON = request.data.call_roster;
      const nameList = [];
      rosterArrayJSON.map(({ person_name }) => nameList.push([person_name]));

      setRoster(nameList);
    };
    getRoster();
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
    },

    tableText: {
      fontSize: 20,
      margin: 8,
    },
  });

  return (
    <ScrollView style={styles.container}>
      {/* <Text style={styles.title}> {name} </Text>
        <Image source={image} style={styles.titlePic} /> */}
      <Table borderStyle={{ borderWidth: 1, borderColor: Colors.gray }}>
        <Rows data={roster} textStyle={[styles.tableText, Dimensions.font]} />
      </Table>
    </ScrollView>
  );
}
