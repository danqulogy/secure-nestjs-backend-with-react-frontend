import axios from 'axios';
import { SIGN_IN, SIGN_OUT, BASE_API_URL } from '../utils/constants';
import { history } from '../router/AppRouter';
import { getErrors } from './errors';

export const signIn = (user) => ({
  type: SIGN_IN,
  user
});

export const initiateLogin = (email, password) => {
  return async (dispatch) => {
    try {
      const result = await axios.post(`${BASE_API_URL}/auth/login`, {
        email,
        password
      });

      console.log(result)

      const user = result.data;
      localStorage.setItem('user_token', user.accessToken);
      dispatch(signIn(user));
      history.push('/profile');
    } catch (error) {
      console.log('error', error.response);
      error.response && dispatch(getErrors(error.response.data.errorMessage.toString()));
    }
  };
};

export const registerNewUser = (data) => {
  return async (dispatch) => {
    try {
      await axios.post(`${BASE_API_URL}/auth/register`, data);
      return { success: true };
    } catch (error) {
      console.log('error', error);
      error.response && dispatch(getErrors(error.response.data.errorMessage.toString()));
      return { success: false };
    }
  };
};

export const signOut = () => ({
  type: SIGN_OUT
});

export const initiateLogout = () => {
  return async (dispatch) => {
      localStorage.removeItem('user_token');
      return dispatch(signOut());
  };
};
