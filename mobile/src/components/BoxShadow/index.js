/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import { Container } from './styles';

export default function BoxShadow({
  style = {},
  margin,
  children,
  height,
  title,
  iconName = '',
  spaceBetween = true,
}) {
  return (
    <View
      style={{
        justifyContent: spaceBetween ? 'space-between' : 'flex-start',
        ...style,
        ...styles.box,
        height,
        marginTop: margin,
      }}>
      <View style={styles.header}>
        <Icon name={iconName} size={24} color="#7D40E7" />
        <Text
          style={{
            marginLeft: 10,
            color: '#7D40E7',
            fontWeight: 'bold',
            fontSize: 14,
          }}>
          {title}
        </Text>
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#fff',
    shadowOpacity: 0.4,
    shadowRadius: 2,
    shadowColor: '#666666',
    shadowOffset: {height: 0, width: 0},
  },
  header: {
    paddingTop: 13,
    paddingLeft: 14.5,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
