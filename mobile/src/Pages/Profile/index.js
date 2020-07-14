/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet, SafeAreaView} from 'react-native';
import {signOut} from '../../store/modules/auth/actions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from '../../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import api from '../../services/api';

export default function Dashboard() {
  const idDelivery = useSelector(state => state.auth.id);
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const [file, setFile] = useState({});
  console.tron.log({data, file});
  const handleLogut = () => {
    dispatch(signOut());
  };

  const loadDelivery = async () => {
    try {
      const response = await api.get(`delivery/checkExist/${idDelivery}`);
      setFile(response.data.delivery.File);
      setData(response.data);
    } catch (err) {
      console.tron.log(err);
    }
  };

  useEffect(() => {
    loadDelivery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={{alignItems: 'center'}}>
          {file.url ? (
            <Image style={styles.avatar} source={{uri: file.url}} />
          ) : (
            <View
              style={{
                height: 136,
                width: 136,
                backgroundColor: '#F4EFFC',
                borderRadius: 68,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: 60, color: '#A28FD0'}}>GA</Text>
            </View>
          )}
        </View>
        <View style={styles.info}>
          <Text
            style={{
              fontSize: 12,
              color: '#666666',
            }}>
            Nome completo
          </Text>
          <Text
            style={{
              fontSize: 22,
              color: '#444444',
              fontWeight: 'bold',
            }}>
            {data ? data.delivery.name : 'Não foi possivel carregar!'}
          </Text>
        </View>
        <View style={{marginTop: 15}}>
          <Text
            style={{
              fontSize: 12,
              color: '#666666',
            }}>
            Email
          </Text>
          <Text
            style={{
              fontSize: 22,
              color: '#444444',
              fontWeight: 'bold',
            }}>
            {data ? data.delivery.email : 'Não foi possivel carregar!'}
          </Text>
        </View>
        <View style={{marginTop: 15}}>
          <Text
            style={{
              fontSize: 12,
              color: '#666666',
            }}>
            Data de cadastro
          </Text>
          <Text
            style={{
              fontSize: 22,
              color: '#444444',
              fontWeight: 'bold',
            }}>
            {data ? data.delivery.created : 'Não foi possivel carregar!'}
          </Text>
        </View>
        <Button color="#E74040" onPress={handleLogut}>
          Logout
        </Button>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 35.5,
    paddingTop: 85,
    // alignItems: 'center',
  },
  info: {
    marginTop: 41,
  },
  avatar: {
    width: 136,
    height: 136,
    backgroundColor: '#F4EFFC',
    borderRadius: 68,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Dashboard.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({tintColor}) => (
    <Icon name="account-circle" size={20} color={tintColor} />
  ),
};
