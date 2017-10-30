const initialState = {

};

export function common(state = initialState, action) {
  const loading = !!action.type.match(/REQUEST/);
  return Object.assign({}, state, {loading});
}
