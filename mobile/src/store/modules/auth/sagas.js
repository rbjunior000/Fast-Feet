import {Alert} from 'react-native';
import {takeLatest, call, put, all} from 'redux-saga/effects';

import api from '../../../services/api';
import {signInSuccess, signFailure} from './actions';

export function* signIn({payload}) {
  const {id} = payload;
  const response = yield call(api.get, `delivery/checkExist/${id}`);
  const {message} = response.data;
  if (response.data.id) {
    yield put(signInSuccess(id));
    // history.push('/dashboard');
  } else {
    Alert.alert('Erro no login', 'Verifique seu ID');
    yield put(signFailure());
  }
}

export function setToken({payload}) {
  if (!payload) {
    return;
  }
  const {token} = payload.auth;
  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function SignOut() {
  // history.push('/');
}

export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_OUT', SignOut),
]);
