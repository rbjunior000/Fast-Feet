import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  Image,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import {signInRequest} from '../../store/modules/auth/actions';
import Background from '../../components/Background';
import Logo from '../../assets/logo.png';
import Button from '../../components/Button';

export default function SignIn({navigation}) {
  const [value, onChangeText] = useState('');
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit() {
    dispatch(signInRequest(value));
  }
  return (
    <Background>
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView
        enabled={Platform.OS === 'ios'}
        behavior="padding"
        style={styles.container}>
        <View style={styles.div}>
          <Image source={Logo} />
          <TextInput
            style={styles.input}
            onChangeText={text => onChangeText(text)}
            value={value}
            placeholder="Informe seu ID de cadastro"
            placeholderTextColor="#999999"
            keyboardType="numeric"
          />
          <Button loading={false} onPress={handleSubmit} color="#82BF18">
            Entrar no sistema
          </Button>
        </View>
      </KeyboardAvoidingView>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  div: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#FFFFFF',
    width: 325,
    height: 45,
    borderRadius: 4,
    borderWidth: 0.5,
    paddingHorizontal: 15,
    marginTop: 37.5,
  },
});
