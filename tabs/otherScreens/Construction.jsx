import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import Button from '../../components/Button';
import { ScrollView } from "react-native-gesture-handler";

const Construction = ({ navigation }) => (
  <ScrollView style={ styles.contentContainerStyle}>
    <View style={{ flex: 6, justifyContent: 'center', alignItems: 'center' }}>
      <Text
        style={{
          fontSize: 28,
          marginBottom: 32,
          textAlign: 'center',
          fontWeight: '500',
        }}
      >
        This feature is not available in the alpha version of RAKapp.
      </Text>
      <View>
        <Image
          source={require('../../assets/images/blocked.png')}
          style={{
            width: 400,
            height: 300,
            backgroundColor: 'red',
          }}
        />
      </View>
      <Text
        style={{
          fontSize: 28,
          marginTop: 15,
          textAlign: 'center',
          fontWeight: '500',
        }}
      >
        Check back at a later time.
      </Text>
    </View>

    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button title="Back" onPress={() => console.log(navigation.goBack())} />
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  contentContainerStyle:{
    flexGrow: 1,
    //alignItems: "center",
    //justifyContent: "center",
    width: "100%",
    height: "100%",
  },
});


export default Construction;
