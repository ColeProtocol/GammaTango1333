import React, { useEffect, useState } from "react";
import axios from "axios";
import { StyleSheet, SafeAreaView, Text } from "react-native";
import { Card, CardItem, Body } from "native-base";
import { ScrollView } from "react-native-gesture-handler";
import getData from "../../assets/Async/getData";
import { skipPartiallyEmittedExpressions } from "typescript";

export default function HistoryDetailScreen({route}) {

  const {name, division, conflict, yearHonor, citation} = route.params;

  const styles = StyleSheet.create({
    container: {
      width: "100%",
      height: "100%",
      flexDirection: "column",
      paddingHorizontal: 15,
      paddingVertical: 10,
    },
    title: {
      fontSize: 15,
      fontWeight: "500",
    },
    header: {
      fontSize: 20,
      fontWeight: "700",
      //marginTop: 20,
      //marginBottom: 20,
      textAlign: "center",
    },
    description: {
      fontSize: 12,
    },
    space: {
      marginTop: 20,
    },
  });
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>{name}</Text>
        <Text style={styles.header}>{division}</Text>
        <Text style={styles.header}>Conflict: {conflict}</Text>
        <Text style={styles.header}>Year of Honor: {yearHonor} </Text>

          <Card style={styles.space}>
            <Text style={styles.header}>Medal of Honor Citation</Text>
            <CardItem>
                <Text style={styles.title}>{citation}</Text>
            </CardItem>
          </Card>
        
      </ScrollView>
    </SafeAreaView>
  );
}
