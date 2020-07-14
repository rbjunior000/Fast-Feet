export function meetupRequest() {
  return {
    type: '@meetup/LOADING_ALL',
  };
}

export function meetupSuccess(response) {
  return {
    type: '@meetup/LOADING_ALL_SUCCESS',
    payload: response,
  };
}

export function handleID(response) {
  return {
    type: '@meetup/handleID',
    id: response,
  };
}

export function updateMeetupRequest(data) {
  return {
    type: '@meetup/UPDATE_MEETUP_REQUEST',
    payload: data,
  };
}
export function CreateMeetupRequest(data) {
  return {
    type: '@meetup/CREATE_MEETUP_REQUEST',
    payload: data,
  };
}

export function updateMeetupSuccess(profile) {
  return {
    type: '@user/UPDATE_MEETUP_SUCCESS',
    payload: { profile },
  };
}
