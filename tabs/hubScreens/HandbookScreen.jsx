import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import PDFReader from 'rn-pdf-reader-js'

export default function HandbookScreen({route}) {

  const {bluebookURL} = route.params; //from hubtab.jsx
  //console.log(bluebookURL);
  return (
    <PDFReader style={styles.container}
      source={{
        uri: bluebookURL,
      }}
    />
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
  }
});