import produce from 'immer';

const INITIAL_STATE = {
  meetups: [],
  meetupid: '',
};

export default function meetups(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@meetup/LOADING_ALL_SUCCESS':
      return produce(state, draft => {
        draft.meetups = action.payload;
      });
    case '@meetup/handleID':
      return produce(state, draft => {
        draft.meetupid = action.id;
      });
    case '@auth/SIGN_OUT':
      return produce(state, draft => {
        draft.meetups = [];
        draft.meetupid = null;
      });
    default:
      return state;
  }
}
