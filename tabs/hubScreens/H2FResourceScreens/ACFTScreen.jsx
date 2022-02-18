import * as React from "react";
import { View, StyleSheet } from "react-native";
import PDFReader from "rn-pdf-reader-js";
import { Asset } from "expo-asset";

let absolute_path = Asset.fromModule(
  require("../../../assets/pdfs/ACFT_fueling.pdf")
).uri;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


export default function Cookbook() {
  return (
    <PDFReader
      style={styles.container}
      source={{
        uri: absolute_path,
      }}
    />
  );
}

