export const Types = {
  LOAD_USERS: 'managementPanel/LOAD_USERS',
  LOAD_USERS_COMPLETED: 'managementPanel/LOAD_USERS_COMPLETED',

  LOAD_ERROR: 'managementPanel/LOAD_ERROR',
};

// Action Creators
export const Creators = {
  loadUsers: () => ({
    type: Types.LOAD_USERS
  }),

  // updateStep: (step: any) => ({
  //   type: Types.UPDATE_STEP,
  //   payload: step,
  // }),

};
