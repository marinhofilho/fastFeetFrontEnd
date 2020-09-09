export function signInRequest(email, password_hash) {
  // does the api check
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { email, password_hash },
    // payload for any information other than type
  };
}

export function signInSuccess(token, user) {
  // after SIGN_IN_REQUEST is processed
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { token, user },
  };
}

export function signFailure() {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}
