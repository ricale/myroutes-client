import {createActions} from 'redux-actions';
import {normalize} from 'normalizr';
import requester from '../utils/requester';

const actions = createActions({
  USERS: {
    LOGIN: {
      REQUEST: () => ({}),
      SUCCESS: () => ({}),
      FAILURE: () => ({})
    },

    LOGOUT: {
      REQUEST: () => ({}),
      SUCCESS: () => ({}),
      FAILURE: () => ({})
    },
  }
});

export function login(data) {
  return requester.fetch(
    `/login`,
    actions.users.login,
    {method: 'POST', data}
  );
}

export function logout() {
  return requester.fetch(
    `/logout`,
    actions.users.logout
  );
}
