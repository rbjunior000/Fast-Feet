/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, StyleSheet, Text} from 'react-native';
import api from '../../services/api';

export default function ProblemsPage({navigation}) {
  const {id} = navigation.state.params;
  const [problems, setProblems] = useState([]);
  console.tron.log(problems);

  const loadProblems = async () => {
    try {
      const response = await api.get(`problems/${id}`);
      setProblems(response.data);
    } catch (err) {
      console.tron.log(err);
    }
  };

  useEffect(() => {
    loadProblems();
  }, []);

  return (
    <View style={styles.background}>
      <SafeAreaView style={{marginTop: 25, alignItems: 'center'}}>
        <Text style={styles.pageTitle}>{`Encomenda ${id}`}</Text>
      </SafeAreaView>
      {problems.map(item => (
        <View
          style={{
            shadowOpacity: 0.4,
            shadowRadius: 2,
            shadowColor: '#666666',
            shadowOffset: {height: 0, width: 0},
            backgroundColor: '#FFFFFF',
            marginHorizontal: 20,
            marginTop: 12.5,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 19,
            paddingVertical: 17,
          }}>
          <Text style={styles.contentDescription}>{item.description} </Text>
          <Text style={styles.contentData}>{item.date}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    height: 155,
    backgroundColor: '#7D40E7',
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  contentDescription: {
    maxWidth: 220,
    fontSize: 16,
    color: '#999999',
  },
  contentData: {
    fontSize: 12,
    color: '#C1C1C1',
  },
});

ProblemsPage.navigationOptions = {
  title: 'Visualizar problemas',
  headerStyle: {
    backgroundColor: '#7D40E7',
    shadowColor: 'transparent',
  },
};
