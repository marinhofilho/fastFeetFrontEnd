import produce from 'immer';

const INITIAL_STATE = {
  profile: null,
};

// reducer creates a state
export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@auth/SIGN_IN_SUCCESS':
      return produce(state, (draft) => {
        draft.profile = action.payload.user;
      });
    default:
      return state;
  }
}
