const initState = {
  current: {}
};

export function users(state = initState, action) {
  switch(action.type) {
    case 'USERS/LOGIN/SUCCESS':
      return Object.assign({}, state, action.payload);

    case 'USERS/LOGOUT/SUCCESS':
      return Object.assign({}, state, {current: {}});

    default:
      return state;
  }
}
