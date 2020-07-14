/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {useSelector} from 'react-redux';
import api from '../../services/api';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BoxShadow from '../../components/BoxShadow';
import StelProgress from '../../components/StepProgress';

export default function Dashboard({navigation}) {
  const idDelivery = useSelector(state => state.auth.id);
  const [data, setData] = useState({});
  const [file, setFile] = useState({});
  const [packages, setPackages] = useState([]);
  const [active, setActive] = useState(true);
  const [filter, setFilter] = useState('PENDENTE');
  const [filter2, setFilter2] = useState('RETIRADA');

  const loadDelivery = async () => {
    try {
      const response = await api.get(`delivery/checkExist/${idDelivery}`);
      setFile(response.data.delivery.File);
      setData(response.data);
    } catch (err) {
      console.tron.log(err);
    }
  };

  const loadPackages = async () => {
    try {
      const response = await api.get(
        `delivery/${idDelivery}?filter=${filter}&filter2=${filter2}`,
      );
      setPackages(response.data);
    } catch (err) {
      console.tron.log(err);
    }
  };

  useEffect(() => {
    loadDelivery();
    loadPackages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.header}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View>
            {file.url ? (
              <Image style={styles.avatar} source={{uri: file.url}} />
            ) : (
              <Text style={{fontSize: 31, color: '#A28FD0'}}>GA</Text>
            )}
          </View>
          <View style={styles.texts}>
            <Text style={{color: '#666666', fontSize: 12}}>
              Bem vindo de volta,
            </Text>
            {data.delivery && (
              <Text style={styles.text}>{data.delivery.name}</Text>
            )}
          </View>
        </View>
        <Icon name="exit-to-app" size={30} color="#E74040" />
      </SafeAreaView>
      <View style={styles.nav}>
        <Text style={{fontSize: 22, color: '#444444', fontWeight: 'bold'}}>
          Entregas
        </Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => {
              setActive(true);
              setFilter('PENDENTE');
              setFilter2('RETIRADA');
            }}>
            <Text
              style={{
                fontSize: 12,
                color: active ? '#7D40E7' : '#999999',
                fontWeight: 'bold',
                marginRight: 15,
                textDecorationLine: active ? 'underline' : 'none',
              }}>
              Pendentes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setActive(false);
              setFilter('ENTREGUE');
              setFilter2('');
            }}>
            <Text
              style={{
                fontSize: 12,
                color: active ? '#999999' : '#7D40E7',
                fontWeight: 'bold',
                textDecorationLine: active ? 'none' : 'underline',
              }}>
              Entregues
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.package} />
      <ScrollView>
        {packages.map(item => (
          <BoxShadow
            key={item.id}
            title={`Encomenda ${item.id}`}
            iconName="local-shipping"
            height={170}
            margin={10.5}>
            <StelProgress status={item.status} />
            <View style={styles.footer}>
              <View>
                <Text
                  style={{fontSize: 10, color: '#999999', fontWeight: 'bold'}}>
                  Data
                </Text>
                <Text
                  style={{fontSize: 14, color: '#444444', fontWeight: 'bold'}}>
                  {item.start_date || '--/--/--'}
                </Text>
              </View>
              <View>
                <Text
                  style={{fontSize: 10, color: '#999999', fontWeight: 'bold'}}>
                  Cidade
                </Text>
                <Text
                  style={{fontSize: 14, color: '#444444', fontWeight: 'bold'}}>
                  {item.cidade}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('Details', {id: item.id})}>
                <Text />
                <Text
                  style={{fontSize: 14, color: '#7D40E7', fontWeight: 'bold'}}>
                  Ver detalhes
                </Text>
              </TouchableOpacity>
            </View>
          </BoxShadow>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatar: {
    width: 68,
    height: 68,
    backgroundColor: '#F4EFFC',
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texts: {
    marginLeft: 20,
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#444444',
  },
  nav: {
    marginTop: 22.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  package: {},
  footer: {
    height: 64,
    backgroundColor: '#F8F9FD',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 21.5,
  },
});

Dashboard.navigationOptions = {
  title: '',
  headerTransparent: true,
};
