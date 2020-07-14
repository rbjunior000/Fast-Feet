import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import history from '../../../services/history';

import api from '../../../services/api';
import { meetupSuccess } from './actions';

export function* loadingMeetup() {
  try {
    const response = yield call(api.get, 'meetupindex', {
      params: {
        page: 1,
      },
    });
    yield put(meetupSuccess(response.data));
  } catch (err) {
    toast.error('aiusdhuiads');
  }
}

export function* updateMeetup({ payload }) {
  try {
    yield call(api.put, `meetupupdate/${payload.id}`, payload);
    toast.success('Meetup atualizada com sucesso');
  } catch (err) {
    toast.error('Falha na atualização, verifique os seus dados');
  }
}

export function* CreateMeetup({ payload }) {
  try {
    const { title, description, date, location, fileid } = payload;
    const meetup = {
      file_id: fileid,
      title,
      description,
      location,
      date,
    };
    yield call(api.post, 'meetupcreate', meetup);
    toast.success('Meetup criada com sucesso!');
    history.push('/dashboard');
  } catch (err) {
    toast.error('Falha na criação, verifique os seus dados');
  }
}

export default all([
  takeLatest('@meetup/UPDATE_MEETUP_REQUEST', updateMeetup),
  takeLatest('@meetup/CREATE_MEETUP_REQUEST', CreateMeetup),
  takeLatest('@meetup/LOADING_ALL', loadingMeetup),
]);
