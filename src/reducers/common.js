const initialState = {
  loading: 0
};

export function common(state = initialState, action) {
  const type = action.type;
  const loading = state.loading +
                  (!!type.match(/\/REQUEST$/) ?  1 : 0) +
                  (!!type.match(/\/SUCCESS$/) ? -1 : 0) +
                  (!!type.match(/\/FAILURE$/) ? -1 : 0);

  return Object.assign({}, state, {loading});
}
