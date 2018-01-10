const initialState = {
  loading: 0
};

function isRequestAction(actionType) {
  return !!actionType.match(/\/REQUEST$/);
}

function isSuccessAction(actionType) {
  return !!actionType.match(/\/SUCCESS$/);
}

function isFailureAction(actionType) {
  return !!actionType.match(/\/FAILURE$/);
}

// FIXME: unclear logic
function getMessage(data, message) {
  if(!data) {
    return message;
  }
  const firstKey = Object.keys(data)[0];
  const firstValue = data[firstKey];

  if(Array.isArray(firstValue)) {
    return `${firstKey}: ${firstValue[0]}`
  } else {
    return message || firstValue;
  }
}

export function common(state = initialState, action) {
  const type = action.type;
  const isRequest = isRequestAction(type);
  const isSuccess = isSuccessAction(type);
  const isFailure = isFailureAction(type);

  const loading = state.loading +
                  (isRequest ?  1 : 0) +
                  (isSuccess ? -1 : 0) +
                  (isFailure ? -1 : 0);

  const {data, message, messageType} = (action.payload || {});

  const newState = {loading};
  if(!!message) {
    newState.message = getMessage(data, message);
    newState.messageType = messageType;
    newState.messageTimestamp = Date.now();
  }

  return Object.assign({}, state, newState);
}
