/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {RNCamera} from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/api';
import Button from '../../components/Button';
// import { Container } from './styles';

export default function ConfirmDelivery() {
  const [camera, setCamera] = useState();
  const [file, setFile] = useState();

  const handleSubmit = async () => {
    const data = new FormData();
    data.append('file', {
      type: 'image/jpg',
      uri: file,
      name: 'assignature.jpg',
    });
    const response = await api.post('files', data);
    console.tron.log(response);
  };

  const takePicture = async () => {
    if (camera) {
      const options = {quality: 0.5, base64: true};
      const data = await camera.takePictureAsync(options);
      setFile(data.uri);
    }
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.background} />
      <View style={styles.content}>
        <View style={styles.cameraWrapper}>
          <RNCamera style={styles.preview} ref={ref => setCamera(ref)} />
          <TouchableOpacity onPress={takePicture} style={styles.capture}>
            <Icon name="photo-camera" size={25} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
      <Button onPress={handleSubmit}>
        <Text>Enviar</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    height: 130,
    backgroundColor: '#7D40E7',
  },
  content: {
    flex: 1,
    marginTop: -60,
  },
  cameraWrapper: {
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    borderRadius: 4,
    height: '80%',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  preview: {
    flex: 1,
  },
  capture: {
    width: 61,
    height: 61,
    borderRadius: 30.5,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    backgroundColor: '#fff',
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

ConfirmDelivery.navigationOptions = {
  title: 'Detalhes da encomenda',
  headerStyle: {
    backgroundColor: '#7D40E7',
    shadowColor: 'transparent',
  },
};
