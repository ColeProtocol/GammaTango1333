import React from 'react';
import {
  View, StyleSheet, FlatList, Text,
} from 'react-native';
import { Card, CardItem, Body } from 'native-base';

export default function FallenList({ content }) {
  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 30,
    },
    textContainer: {
      flex: 1,
      flexDirection: 'row',
    },
    title: {
      fontSize: 15,
      fontWeight: '500',
      textAlign: 'center',
      marginBottom: 10,
      alignContent: 'center',
    },
  });
  const renderItem = ({ item }) => (
    <View style={styles.container}>
      <Card key={item.id}>
        <CardItem header>
          <Body>
            <Text style={styles.title}>{`${item.first_name} ${item.last_name}`}</Text>
            <Text>
              Battalion:
              {' '}
              {item.battalion}
            </Text>
            <Text>
              Unit:
              {' '}
              {item.unit}
            </Text>
            <Text>
              Rank:
              {' '}
              {item.rank}
            </Text>
            <Text>
              Campaign:
              {' '}
              {item.campaign}
            </Text>
            <Text>
              Date:
              {' '}
              {item.date}
            </Text>
            <Text>
              Location:
              {' '}
              {item.location}
            </Text>
          </Body>
        </CardItem>
      </Card>
    </View>

  );

  return (
    <View>
      <FlatList
        data={content}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
