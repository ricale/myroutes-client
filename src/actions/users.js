import {normalize} from 'normalizr';
import {push} from 'react-router-redux';

import {createActions} from 'utils/createActions';
import requester from 'utils/requester';
import pathHelper from 'utils/pathHelper';

const actions = createActions({
  USERS: {
    LOGIN: {
      REQUEST: () => ({}),
      SUCCESS: (response) => ({
        current: response.data,
        message: 'you are successfully logged in.',
        messageType: 'success'
      }),
    },

    LOGOUT: {
      REQUEST: () => ({}),
      SUCCESS: () => ({
        message: 'you are successfully logged out.',
        messageType: 'error'
      }),
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
