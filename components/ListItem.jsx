import React from 'react';
import {
  View, StyleSheet, TouchableHighlight, Text,
} from 'react-native';

import Colors from '../constants/Colors';
import Icon from './Icon';
import Dimensions from '../constants/Dimensions';

export default function ListItem({
  title,
  subTitle,
  onPress,
  rightIcon,
  leftIcon,
  danger,
}) {
  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      flexDirection: 'row',
      padding: 20,
      backgroundColor: Colors.lightGray,
      borderTopColor: Colors.darkGray,
      borderTopWidth: 1,
    },
    detailsContainer: {
      flex: 1,
      marginLeft: 20,
    },
    subTitle: {
      color: Colors.gray,
    },
    title: {
      color: Colors.darkGray,
      fontSize: 16,
    },
    danger: {
      color: Colors.accent,
    },
  });
  return (
    <TouchableHighlight underlayColor={Colors.lightGray} onPress={onPress}>
      <View style={styles.container}>
        {rightIcon && (
          <Icon color={Colors.darkGray} name={rightIcon} size={25} />
        )}
        <View style={styles.detailsContainer}>
          <Text
            style={[styles.title, danger && styles.danger, Dimensions.font]}
            numberOfLines={1}
          >
            {title}
          </Text>
          {subTitle && (
            <Text style={[styles.subTitle, Dimensions.font]} numberOfLines={2}>
              {subTitle}
            </Text>
          )}
        </View>

        {leftIcon && (
          <Icon
            color={danger ? Colors.accent : Colors.darkGray}
            name={leftIcon}
            size={25}
          />
        )}
      </View>
    </TouchableHighlight>
  );
}
