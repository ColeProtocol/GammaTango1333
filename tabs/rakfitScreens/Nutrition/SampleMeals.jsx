import * as React from "react";
import { View, StyleSheet } from "react-native";
import PDFReader from "rn-pdf-reader-js";
import { Asset } from "expo-asset";

export default function SampleMeals() {
  return (
    <PDFReader
      style={styles.container}
      source={{
        uri: absolute_path,
      }}
    />
  );
}

let absolute_path = Asset.fromModule(
  require("../../../assets/pdfs/SampleMeals.pdf")
).uri;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});