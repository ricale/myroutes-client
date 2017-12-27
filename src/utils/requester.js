import Cookie from 'js-cookie';

import {API_HOST} from 'utils/constants';

function checkStatus(response) {
  if(response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(response.statusText);
    error.response = response;
    error.status = response.status
    throw error;
  }
}

function parseJson(response) {
  return response.json();
}

function getSuccessCallback(dispatch, actions) {
  return (json) => {
    const {beforeSuccess, success, afterSuccess} = actions;

    if(beforeSuccess) {
      dispatch(beforeSuccess());
    }

    const dispatchResult = dispatch(success(json));

    if(afterSuccess) {
      dispatch(afterSuccess());
    }

    return dispatchResult;
  }
}

function getErrorHandler(dispatch, actions) {
  const dispatchActions = (result) => {
    const {beforeFailure, failure, afterFailure} = actions;

    if(beforeFailure) {
      dispatch(beforeFailure(result));
    }

    const dispatchResult = dispatch(failure(result));

    if(afterFailure) {
      dispatch(afterFailure(result));
    }

    return dispatchResult;
  };

  return (error) => {
    const {status, response} = error;
    if(response && response.json) {
      response.json().then(({message}) =>
        dispatchActions({status, message})
      );

    } else {
      dispatchActions({status});
    }
  }
}

function _fetch(url, actions, options = {}) {
  const {method, data, contentType} = options;
  const body = options.body ||
    (data ? JSON.stringify(data) : '');

  return dispatch => {
    dispatch(actions.request());

    const token = Cookie.get('token');

    const fetchOptions = {
      headers: {
        'Content-Type': contentType || 'application/json',
        'Accept-Language': 'ko-kr',
        'Authorization': `JWT ${token}`
      },
      credentials: 'include',
    };
    method && (fetchOptions.method = method);
    body   && (fetchOptions.body   = body);
    data   && (fetchOptions.data   = data);

    return fetch(`${API_HOST}${url}`, fetchOptions)
      .then(checkStatus)
      .then(parseJson)
      .catch(getErrorHandler(dispatch, actions))
      .then(getSuccessCallback(dispatch, actions));
  }
}

export default {
  fetch: _fetch
};
