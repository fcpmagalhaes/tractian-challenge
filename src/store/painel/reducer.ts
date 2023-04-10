import { Types } from './actions';

type Workorders = {
  assetId: number;
  id: number;
  priority: string;
  status: string;
  title: string;
}
const INITIAL_STATE = {
  workOrders: [] as Array<Workorders>,
  loading: false,
};


export default function painel(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case Types.LOAD_WORK_ORDERS:
      return {
        ...state,
        loading: true,
      };
    case Types.SET_WORK_ORDERS:
      return {
        ...state,
        workOrders: action.payload,
        loading: false,
      };
    case Types.LOAD_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
      };
    default:
      return state;
  }
}