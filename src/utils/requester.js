import {API_HOST} from 'utils/constants';
import sessionHelper from 'utils/sessionHelper';

function getHeaders({contentType, filename}) {
  const headers = {
    'Accept-Language': 'ko-kr',
  };

  const token = sessionHelper.getToken();
  if(token) {
    headers['Authorization'] = `JWT ${token}`;
  }

  if(filename) {
    headers['Content-Disposition'] = `attachment; filename=${filename}`;
  }

  headers['Content-Type'] = //!!filename ?
                            //'multipart/form-data' :
                            (contentType || 'application/json');

  return headers;
}

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
  const {method, data} = options;
  const body = options.body ||
    (data ? JSON.stringify(data) : '');

  return dispatch => {
    dispatch(actions.request());

    const fetchOptions = {
      headers: getHeaders(options),
      credentials: 'include',
    };
    method && (fetchOptions.method = method);
    body   && (fetchOptions.body   = body);
    data   && (fetchOptions.data   = data);

    return fetch(`${API_HOST}${url}`, fetchOptions)
      .then(checkStatus)
      .then(parseJson)
      .then(getSuccessCallback(dispatch, actions), getErrorHandler(dispatch, actions));
  }
}

export default {
  fetch: _fetch
};
