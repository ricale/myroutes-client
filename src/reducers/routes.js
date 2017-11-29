const initState = {
  list: [],
  current: {}
};

export function routes(state = initState, action) {
  switch(action.type) {
    case 'ROUTES/FETCHALL/SUCCESS':
    case 'ROUTES/FETCH/SUCCESS':
      return Object.assign({}, state, action.payload);

    default:
      return state;
  }
}
