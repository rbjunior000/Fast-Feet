/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Alert} from 'react-native';
import BoxShadow from '../../components/BoxShadow';
import Button from '../../components/Button';
import api from '../../services/api';

export default function CreateProblem({navigation}) {
  const {id} = navigation.state.params;
  const [text, setText] = useState({});
  console.tron.log(text);

  const handleSubmit = async () => {
    try {
      const response = await api.post(`/delivery/${id}/problems`, text);
      Alert.alert(response.data.message);
      navigation.goBack();
    } catch (err) {
      console.tron.log(err);
    }
  };
  return (
    <View style={styles.background}>
      <BoxShadow
        spaceBetween={false}
        margin={25}
        style={{
          marginHorizontal: 20,
          minHeight: 300,
        }}>
        <TextInput
          multiline
          numberOfLines={2}
          style={styles.input}
          onChangeText={t => setText({description: t})}
          placeholder="Inclua aqui o problema que ocorreu na
          entrega."
          placeholderTextColor="#999999"
          blurOnSubmit
          autoFocus
        />
      </BoxShadow>
      <Button
        onPress={() => handleSubmit()}
        a={{paddingHorizontal: 20}}
        color="#7D40E7">
        Enviar
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    height: 155,
    backgroundColor: '#7D40E7',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#999999',
  },
  content: {
    fontSize: 14,
    color: '#666666',
  },
  buttonsText: {
    fontSize: 12,
    color: '#999999',
    marginTop: 2,
  },
  input: {
    paddingHorizontal: 20,
  },
});

CreateProblem.navigationOptions = {
  title: 'Informar problema',
  headerStyle: {
    backgroundColor: '#7D40E7',
    shadowColor: 'transparent',
  },
};
