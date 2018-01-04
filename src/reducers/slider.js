const initState = {
  current: undefined,
  show: false
};

export function slider(state = initState, action) {
  switch(action.type) {
    case 'SHOW_SLIDER':
    case 'HIDE_SLIDER':
      return Object.assign({}, state, action.payload);

    default:
      return state;
  }
}
