export function signInRequest(id) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: {id},
  };
}

export function signInSuccess(id) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: {id},
  };
}

export function signUpRequest(name, email, password) {
  return {
    type: '@auth/SIGN_UP_REQUEST',
    payload: {name, email, password},
  };
}

export function signFailure() {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}
export function signOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}
