import React from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Title from './Title';

export default function WordDocumentCards({ page }) {
  const navigation = useNavigation();

  _attrs = { page: [] };

  cards = [];

  let title = '';

  page.map((section) => {
    if (title == '') {
      title = section.content;
      return;
    }

    if (section.type === 'Title' && _attrs != { page: [] }) {
      cards.push(_attrs);
      _attrs = { page: [] };
    }

    if (!(section.type in _attrs)) {
      _attrs[section.type] = [];
    }

    _attrs[section.type].push(section.content);
    _attrs.page.push(section);
  });

  cards.shift();

  cards.filter((card) => {
    Object.keys(card).length !== 0
    && 'Title' in card
    && card.Title != [];
  });

  const openDetails = (card) => {
    navigation.navigate('HistoryDetails', { page: card.page });
  };

  const styles = StyleSheet.create({

    container: {
      flex: 1,
      width: '100%',
      height: '100%',
      flexDirection: 'column',
      paddingHorizontal: 15,
      paddingVertical: 10,
    },

    cardContainer: {
      flexDirection: 'column',
      marginTop: 20,
      marginBottom: 20,
      borderStyle: 'solid',
      borderWidth: 0.4,
      padding: 10,
    },

    text: {
      fontSize: 15,
      fontWeight: '500',
    },
  });
  const Card = (attrs) => {
    console.log(attrs.item);
    return (
      <TouchableHighlight
        style={styles.cardContainer}
        onPress={() => openDetails(attrs.item)}
        underlayColor="#CFCFCF"
        activeOpacity={0.3}
      >
        <View>
          <Text style={styles.text}>
            {attrs.item.Title}
          </Text>
          {attrs.item.Subtitle
          && attrs.item.Subtitle.map((sub) => (
            <Text>{sub}</Text>
          ))}
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <View style={styles.container}>
      <Title content={title} />
      <FlatList
        style={styles.container}
        data={cards}
        renderItem={Card}
        keyExtractor={(item) => cards.indexOf(item)}
      />
    </View>
  );
}
