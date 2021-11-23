import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Paragraph from './Paragraph';
import Title from './Title';
import Subtitle from './Subtitle';
import Italicized from './Italicized';
import Image from './Image';
import FallenList from './FallenList';
import DmorHmorList from './DmorHmorList';

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
          <Text style={styles.cardTitle}>
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
        data={cards}
        renderItem={Card}
        keyExtractor={(item) => cards.indexOf(item)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
  },
  cardContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16,
    borderStyle: 'solid',
    borderWidth: 0.4,
    padding: 10,
    backgroundColor: '#E5E5E5',
  },
  cardTitle: {
    fontSize: 24,
    textAlign: 'center',
  },
});

WordDocumentCards.propTypes = {
  children: PropTypes.object,
  page: PropTypes.Array,
};
