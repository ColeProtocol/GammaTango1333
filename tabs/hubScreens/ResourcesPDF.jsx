import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import PDFReader from 'rn-pdf-reader-js'

export default function ResourcesPDF({route}) {
    
    const {url} = route.params;
    //console.log("http://3.19.67.76:1337"+url);

    return (
      <PDFReader style={styles.container}
        source={{
          uri: url,
        }}
      />
    )
  
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
});