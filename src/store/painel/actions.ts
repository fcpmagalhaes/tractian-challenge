export const Types = {
  LOAD_WORK_ORDERS: 'painel/LOAD_WORK_ORDERS',
  SET_WORK_ORDERS: 'painel/SET_WORK_ORDERS',

  LOAD_ERROR: 'painel/LOAD_ERROR',

}

export const Creators = {
  loadWorkOrders: () => ({
    type: Types.LOAD_WORK_ORDERS
  }),

};