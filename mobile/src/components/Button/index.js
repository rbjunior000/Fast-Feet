import React from 'react';
import {Text, StyleSheet, ActivityIndicator} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';

export default function Button({
  children,
  color = '',
  loading = false,
  a = {},
  ...rest
}) {
  return loading ? (
    <ActivityIndicator size="small" color="#FFF" />
  ) : (
    <RectButton
      style={{...styles.button, marginHorizontal: 20, backgroundColor: color}}
      {...rest}>
      <Text style={styles.text}>{children}</Text>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 45,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15.5,
  },
  text: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
