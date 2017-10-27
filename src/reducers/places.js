const initState = {
  list: [],
  current: {}
};

export function places(state = initState, action) {
  switch(action.type) {
    case 'PLACES/FETCH/SUCCESS':
    case 'PLACES/UPDATE/SUCCESS':
      return Object.assign({}, state, action.payload);

    default:
      return state;
  }
}
