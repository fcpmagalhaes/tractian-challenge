import { all, fork } from 'redux-saga/effects';
import { managementPanelSagas } from './managementPanel/sagas';

// eslint-disable-next-line import/no-anonymous-default-export
export default function* () {
  yield all([
    fork(managementPanelSagas),
  ]);
}
