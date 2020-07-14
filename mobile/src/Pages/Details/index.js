/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import BoxShadow from '../../components/BoxShadow';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/api';

export default function Details({navigation}) {
  const {id} = navigation.state.params;
  const [recipient, setRecipient] = useState([]);
  console.tron.log(recipient);

  const loadRecipient = async () => {
    try {
      const response = await api.get(`package/${id}`);
      setRecipient(response.data);
    } catch (err) {
      console.tron.log(err);
    }
  };

  useEffect(() => {
    loadRecipient();
  }, []);
  return (
    <View style={styles.background}>
      <BoxShadow
        iconName="local-shipping"
        margin={25}
        style={{marginHorizontal: 20}}
        title="Informações da entrega">
        <View style={{paddingBottom: 20}}>
          <View style={{paddingTop: 13, paddingLeft: 14.5}}>
            <Text style={styles.title}>DESTINATARIO</Text>
            <Text style={styles.content}>
              {recipient.length > 0 ? recipient[7].recipient : 'Aguarde'}
            </Text>
          </View>
          <View style={{paddingTop: 13, paddingLeft: 14.5}}>
            <Text style={styles.title}>ENDEREÇO DE ENTREGA</Text>
            <Text style={styles.content}>
              {recipient.length > 0
                ? `${recipient[0]}, ${recipient[1]}, ${recipient[2]} - MA, ${
                    recipient[4]
                  }`
                : 'Não foi possivel encontrar o endereço '}
            </Text>
          </View>
          <View style={{paddingTop: 13, paddingLeft: 14.5}}>
            <Text style={styles.title}>PRODUTO</Text>
            <Text style={styles.content}>
              {recipient.length > 0 ? recipient[7].product : 'Sem informação'}
            </Text>
          </View>
        </View>
      </BoxShadow>
      <BoxShadow
        iconName="event"
        margin={10}
        style={{marginHorizontal: 20}}
        title="Situação da entrega">
        <View style={{paddingLeft: 14, paddingTop: 8}}>
          <Text style={styles.title}>STATUS</Text>
          <Text style={styles.content}>
            {recipient.length > 0 ? recipient[8] : 'Sem informação'}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 14,
            paddingVertical: 17,
          }}>
          <View>
            <Text style={styles.title}>Data de retirada</Text>
            <Text style={styles.content}>
              {recipient.length > 0
                ? recipient[5]
                  ? recipient[5]
                  : 'Sem data de retirada'
                : null}
            </Text>
          </View>
          <View style={styles.title}>
            <Text style={styles.title}>Data de entrega</Text>
            <Text style={styles.content}>
              {recipient.length > 0
                ? recipient[6]
                  ? recipient[6]
                  : 'Ainda não foi entregue!'
                : null}
            </Text>
          </View>
        </View>
      </BoxShadow>
      <View
        style={{
          marginHorizontal: 20,
          marginTop: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          shadowOpacity: 0.4,
          shadowRadius: 2,
          shadowColor: '#666666',
          shadowOffset: {height: 0, width: 0},
          backgroundColor: '#F8F9FD',
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('CreateProblem', {id})}
          style={{
            borderRadius: 4,
            height: 83,
            alignItems: 'center',
            justifyContent: 'center',
            borderRightWidth: 1,
            borderColor: '#0000001A',
            paddingHorizontal: 26.5,
            // backgroundColor: '#444',
          }}>
          <Icon name="highlight-off" size={20} color="#E74040" />
          <Text style={styles.buttonsText}>Informar</Text>
          <Text style={styles.buttonsText}>Problema</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('ProblemsPage', {id})}
          style={{
            height: 83,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 25.5,
            // backgroundColor: '#444',
          }}>
          <Icon name="info-outline" size={20} color="#E7BA40" />
          <Text style={styles.buttonsText}>Visualizar</Text>
          <Text style={styles.buttonsText}>Problema</Text>
        </TouchableOpacity>
        {recipient[5] ? (
          <TouchableOpacity
            onPress={() => navigation.navigate('ConfirmDelivery', {id})}
            style={{
              borderRadius: 4,
              height: 83,
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: '#0000001A',
              borderLeftWidth: 1,
              paddingHorizontal: 26.5,
            }}>
            <Icon name="alarm-on" size={20} color="#7D40E7" />
            <Text style={styles.buttonsText}>Confirmar</Text>
            <Text style={styles.buttonsText}>Entrega</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={async () => {
              await api.put(`package/${id}`);
            }}
            style={{
              borderRadius: 4,
              height: 83,
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: '#0000001A',
              borderLeftWidth: 1,
              paddingHorizontal: 26.5,
            }}>
            <Icon name="alarm-on" size={20} color="#7D40E7" />
            <Text style={styles.buttonsText}>Retirar</Text>
            <Text style={styles.buttonsText}>Entrega</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    // position: 'absolute',
    height: 100,
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
});

Details.navigationOptions = {
  title: 'Detalhes da encomenda',
  headerStyle: {
    backgroundColor: '#7D40E7',
    shadowColor: 'transparent',
  },
};
