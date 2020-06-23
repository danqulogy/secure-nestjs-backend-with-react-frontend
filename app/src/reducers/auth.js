import { SIGN_IN, SIGN_OUT } from '../utils/constants';

const defaultState = {
  id: null,
  token: localStorage.getItem('user_token'),
  name: null,
  email: null
}
const authReducer = (state = {...defaultState}, action) => {
  switch (action.type) {
    case SIGN_IN:
      return action.user;
    case SIGN_OUT:
      return {};
    default:
      return state;
  }
};

export default authReducer;
