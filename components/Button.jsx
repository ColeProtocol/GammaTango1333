import React from 'react';
import { ActivityIndicator, TouchableOpacity, Text } from 'react-native';
import Colors from '../constants/Colors';

const Button = ({
  title, clear, loading, onPress,
}) => {
  const styles = {
    clearButton: {},
    button: {
      backgroundColor: clear ? 'transparent' : Colors.primary,
      padding: 15,
      width: 320,
      height: 62,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      shadowOffset: { width: 2, height: 2 },
      shadowColor: '#000',
      shadowOpacity: clear ? 0 : 0.3,
    },
    title: {
      fontSize: 20,
      color: clear ? Colors.primary : '#FFF',
      fontWeight: '600',
    },
  };
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      {loading ? (
        <ActivityIndicator color={clear ? Colors.primary : '#FFF'} />
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
