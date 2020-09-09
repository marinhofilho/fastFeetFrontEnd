import { all } from 'redux-saga/effects';
// saga it's a middleware of actions - intercept them and provides informations etc.

import auth from './auth/sagas';
import user from './user/sagas';

export default function* rootSaga() {
  return yield all([auth, user]);
}
