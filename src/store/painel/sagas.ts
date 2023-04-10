import { takeLatest, put, call } from 'redux-saga/effects';
import { api } from '@/services/axios/index';
import { Types } from './actions';

async function getWorkOrders() {
  return api.get('/workorders');
}

function* loadWorkOrders() {
  try {
    const { data } = yield call(getWorkOrders);
    // console.log('data', data);
    yield put({
      type: Types.SET_WORK_ORDERS,
      payload: data,
    });
  } catch (err) {
    yield put({ type: Types.LOAD_ERROR });
  }
}

export function* painelSagas() {
  yield takeLatest(Types.LOAD_WORK_ORDERS, loadWorkOrders)
}