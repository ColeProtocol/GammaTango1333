import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import PDFReader from 'rn-pdf-reader-js'

export default function PolicyLettersScreen({route}) {

  const {letterURL} = route.params; //from cmdtab.jsx
  //console.log(letterURL);
  return (
    <PDFReader style={styles.container}
      source={{
        uri: letterURL,
      }}
    />
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
  }
});