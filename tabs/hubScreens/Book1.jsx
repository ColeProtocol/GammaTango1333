import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import PDFReader from 'rn-pdf-reader-js'

export default function Book1({route}) {

  const {bluebookURL} = route.params; //from ReadingListScreen.jsx
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