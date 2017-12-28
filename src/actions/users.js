import {normalize} from 'normalizr';
import {push} from 'react-router-redux';

import {createActions} from 'utils/createActions';
import requester from 'utils/requester';
import pathHelper from 'utils/pathHelper';
import sessionHelper from 'utils/sessionHelper';

const actions = createActions({
  USERS: {
    LOGIN: {
      REQUEST: () => ({}),
      SUCCESS: (response) => {
        sessionHelper.setToken(response.data.token);
        return {
          message: 'you are successfully logged in.',
          messageType: 'success'
        }
      },
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
    `/login/`,
    actions.users.login,
    {method: 'POST', data}
  );
}

export function logout() {
  return dispatch => {
    dispatch(actions.users.logout.request());
    sessionHelper.removeToken();
    return dispatch(actions.users.logout.success());
  }
}
