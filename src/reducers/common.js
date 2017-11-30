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

export function common(state = initialState, action) {
  const type = action.type;
  const isRequest = isRequestAction(type);
  const isSuccess = isSuccessAction(type);
  const isFailure = isFailureAction(type);

  const loading = state.loading +
                  (isRequest ?  1 : 0) +
                  (isSuccess ? -1 : 0) +
                  (isFailure ? -1 : 0);

  const {message, messageType} = (action.payload || {});

  const newState = {loading};
  if(!!message) {
    newState.message     = message;
    newState.messageType = messageType;
  }

  return Object.assign({}, state, newState);
}
