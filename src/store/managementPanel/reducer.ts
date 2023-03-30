import { Types } from './actions';

const INITIAL_STATE = {
  // loading: false,
  // success: false,
  // error: false,
  // activeStep: 0,
  // openModal: false,
  // rangeYears: [],
  // iesNames: [],
  // iesOptions: [],
  // iesFilters: [],
  // collegeNames: [],
  // collegeOptions: [],
  // collegeFilters: [],
  // studentOptions: [],
  // studentFilters: [],
  // researchData: [],
  // chartType: null,
  loading: false,
  success: false,
  error: false,
  users: [],
};

// Reducer
export default function managementPanel(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case Types.LOAD_USERS:
      return {
        ...state,
        users: action.payload,
        loading: true,
        error: false,
      };
    case Types.LOAD_USERS_COMPLETED:
      return {
        ...state,
        loading: false,
        error: false,
      };
    // case Types.UPDATE_STEP:
    //   return {
    //     ...state,
    //     activeStep: action.payload,
    //   };
    // case Types.SET_RANGE_YEARS:
    //   return {
    //     ...state,
    //     rangeYears: action.payload,
    //   };
    // case Types.LOAD_IES:
    //   return {
    //     ...state,
    //     loading: true,
    //     error: false,
    //   };
    // case Types.SET_IES_NAMES:
    //   return {
    //     ...state,
    //     loading: false,
    //     iesNames: action.payload.iesNames,
    //   };
    // case Types.SET_IES_OPTIONS:
    //   return {
    //     ...state,
    //     loading: false,
    //     iesOptions: action.payload.iesOptions,
    //   };
    // case Types.SET_IES_FILTERS:
    //   return {
    //     ...state,
    //     iesFilters: action.payload,
    //   };
    // case Types.LOAD_COLLEGE:
    //   return {
    //     ...state,
    //     loading: true,
    //     error: false,
    //   };
    // case Types.SET_COLLEGE_NAMES:
    //   return {
    //     ...state,
    //     loading: false,
    //     collegeNames: action.payload.collegeNames,
    //   };
    // case Types.SET_COLLEGE_OPTIONS:
    //   return {
    //     ...state,
    //     loading: false,
    //     collegeOptions: action.payload.collegeOptions,
    //   };
    // case Types.SET_COLLEGE_FILTERS:
    //   return {
    //     ...state,
    //     collegeFilters: action.payload,
    //   };
    // case Types.LOAD_STUDENT:
    //   return {
    //     ...state,
    //     loading: true,
    //     error: false,
    //   };
    // case Types.SET_STUDENT_OPTIONS:
    //   return {
    //     ...state,
    //     loading: false,
    //     studentOptions: action.payload.studentOptions,
    //   };
    // case Types.SET_STUDENT_FILTERS:
    //   return {
    //     ...state,
    //     studentFilters: action.payload,
    //   };
    // case Types.LOAD_RESEARCH:
    //   return {
    //     ...state,
    //     loading: true,
    //     error: false,
    //   };
    // case Types.SET_RESEARCH:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: false,
    //     researchData: action.payload.researchData,
    //   };

    case Types.LOAD_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
      };
    // case Types.SET_MODAL:
    //   return {
    //     ...state,
    //     openModal: action.payload.openModal,
    //   };
    // case Types.SET_CHART:
    //   return {
    //     ...state,
    //     chartType: action.payload,
    //   };

    default:
      return state;
  }
}
