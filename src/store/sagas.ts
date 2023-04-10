import { all, fork } from 'redux-saga/effects';
import { painelSagas } from './painel/sagas';

// eslint-disable-next-line import/no-anonymous-default-export
export default function* () {
  yield all([fork(painelSagas)]);
}
