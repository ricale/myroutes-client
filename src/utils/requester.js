function checkStatus(response) {
  if(response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

function parseJson(response) {
  return response.json();
}

function _fetch(url, actions, options = {}) {
  const {method, data, contentType} = options;
  const body = options.body ||
    (data ? JSON.stringify(data) : '');

  return dispatch => {
    dispatch(actions.request());

    const fetchOptions = {
      headers: {
        'Content-Type': contentType || 'application/json',
        'Accept-Language': 'ko-kr'
      }
    };
    method && (fetchOptions.method = method);
    body   && (fetchOptions.body   = body);
    data   && (fetchOptions.data   = data);

    return fetch(`http://localhost:5000${url}`, fetchOptions)
      .then(checkStatus)
      .then(parseJson)
      .then(json => dispatch(actions.success(json)))
      .catch(error => {
        if(error.response && error.response.json) {
          error.response.json().then(json => {
            console.error('error', json.message);
            return dispatch(actions.failure(json.message));
          });

        } else {
          console.error('error', error);
          dispatch(actions.failure(error));
        }
      });
  }
}

export default {
  fetch: _fetch
};
