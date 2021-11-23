import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import PDFReader from 'rn-pdf-reader-js'

export default function BattPolicyScreen({route}) {

  const {battPolicy} = route.params; //from battunitscreen.jsx
  //console.log(battPolicy);
  return (
    <PDFReader style={styles.container}
      source={{
        uri: battPolicy,
      }}
    />
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
  }
});