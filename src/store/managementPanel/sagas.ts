import { takeLatest, put, call } from 'redux-saga/effects';
// import _ from 'lodash';
import { api } from '@/services/axios/index';
import { Types } from './actions';


// async function getResearchResult(values) {
//   return api.post('/research', {
//     data: values,
//   });
// }

// async function getIesByYears(values) {
//   const payload = {
//     range: values,
//   };

//   return api.post('/ies_names', {
//     data: payload,
//   });
// }

// async function getIesFilters() {
//   return api.post('/ies_filters');
// }

// async function getCollegeByYearsAndIes({rangeYears, iesFilters}) {
//   const payload = {
//     range: rangeYears,
//     iesFilters: iesFilters
//   };

//   return api.post('/college_names', {
//     data: payload,
//   });
// }

// async function getCollegeFilters() {
//   return api.post('/college_filters');
// }

// async function getStudentFilters() {
//   return api.post('/student_filters');
// }

// function standardizeKeyValue(arrayObject, code, name) {
//   const renamed = [];
//   arrayObject.map( item => {
//     renamed.push(
//       _.mapKeys( item, ( value, key ) => {
//           let newKey = key;
//           if( key === code ) {
//               newKey = 'value';
//           }

//           if( key === name ) {
//               newKey = 'label';
//           }
//           return newKey;
//       })
//     )
//   });
//   return renamed;
// };

// function* loadIes(values) {
//   try {
//     const responseNames = yield call(getIesByYears, values.payload);
//     const responseFilters = yield call(getIesFilters);
    
//     yield put({
//       type: Types.SET_IES_NAMES,
//       payload: {
//         iesNames: responseNames.data,
//         // iesNames: standardizeKeyValue(responseNames.data, 'co_ies', 'no_ies'),
//       },
//     });

//     yield put({
//       type: Types.SET_IES_OPTIONS,
//       payload: {
//         iesOptions: responseFilters.data,
//       },
//     });
//   } catch (err) {
//     yield put({ type: Types.LOAD_ERROR });
//   }
// }

// function* loadCollege({payload}) {
//   try {
//     const responseNames = yield call(getCollegeByYearsAndIes, payload);
//     const responseFilters = yield call(getCollegeFilters);
//     yield put({
//       type: Types.SET_COLLEGE_NAMES,
//       payload: {
//         collegeNames: responseNames.data,
//       },
//     });

//     yield put({
//       type: Types.SET_COLLEGE_OPTIONS,
//       payload: {
//         collegeOptions: responseFilters.data,
//       },
//     });
//   } catch (err) {
//     yield put({ type: Types.LOAD_ERROR });
//   }
// }

// function* loadStudent() {
//   try {
//     const responseFilters = yield call(getStudentFilters);
//     yield put({
//       type: Types.SET_STUDENT_OPTIONS,
//       payload: {
//         studentOptions: responseFilters.data,
//       },
//     });
//   } catch (err) {
//     yield put({ type: Types.LOAD_ERROR });
//   }
// }

// function* loadResearch(values) {
//   try {
//     const response = yield call(getResearchResult, values.payload);
//     const data = response.data.map((data) => {
//       return {
//         ano: data.year,
//         total: data.finalCount
//       }
//     });
//     yield put({
//       type: Types.SET_RESEARCH,
//       payload: {
//         researchData: data,
//       },
//     });
//   } catch (err) {
//     yield put({ type: Types.LOAD_ERROR });
//   }
// }

type User = {
  companyId: number;
  email: string;
  id: number;
  name: string;
  unitId: number;
};

async function getUsers() {
  return api.get('/users');
}

function* loadUsers() {
  try {
    const response = yield call(getUsers);
    yield put({
      type: Types.LOAD_USERS,
      payload: {
        users: response.data,
      },
    });
  } catch (err) {
    yield put({ type: Types.LOAD_ERROR });
  }
}

export function* managementPanelSagas() {
  yield takeLatest(Types.LOAD_USERS, loadUsers);
  // yield takeLatest(Types.LOAD_IES, loadIes);
  // yield takeLatest(Types.LOAD_COLLEGE, loadCollege);
  // yield takeLatest(Types.LOAD_STUDENT, loadStudent);
  // yield takeLatest(Types.LOAD_RESEARCH, loadResearch);
}
