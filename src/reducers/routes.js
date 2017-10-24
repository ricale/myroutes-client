const initState = {
  list: [],
  current: {}
};

export function routes(state = initState, action) {
  switch(action.type) {
    case 'ROUTES/FETCHALL/SUCCESS':
    case 'ROUTES/FETCH/SUCCESS':
      return Object.assign({}, state, action.payload);


    case 'ROUTES/FETCH/FAILURE':
      return state;

    default:
      return state;
  }
}
