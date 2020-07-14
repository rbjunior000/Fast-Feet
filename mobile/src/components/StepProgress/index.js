/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

// import { Container } from './styles';

export default function StepProgress({status}) {
  return (
    <View style={{}}>
      <View style={styles.container}>
        <View
          style={{
            ...styles.bullet,
            backgroundColor: '#7D40E7',
          }}
        />
        <View style={styles.line} />
        <View
          style={{
            ...styles.bullet,
            backgroundColor:
              status === 'RETIRADA' || status === 'ENTREGUE'
                ? '#7D40E7'
                : '#fff',
          }}
        />
        <View style={styles.line} />
        <View
          style={{
            ...styles.bullet,
            backgroundColor: status === 'ENTREGUE' ? '#7d40e7' : '#fff',
          }}
        />
      </View>
      <View style={styles.descriptions}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.text}>Aguardando</Text>
          <Text style={styles.text}>Retirada</Text>
        </View>
        <View>
          <Text style={styles.text}>Retirada</Text>
        </View>
        <View>
          <Text style={styles.text}>Entregue</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  bullet: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#7D40E7',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#7D40E7',
  },
  descriptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  text: {
    fontSize: 10,
    color: '#999999',
  },
});
