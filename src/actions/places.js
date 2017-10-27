import {createActions} from 'redux-actions';
import {normalize} from 'normalizr';
import requester from '../utils/requester';

const actions = createActions({
  PLACES: {
    FETCH: {
      REQUEST: () => ({}),
      SUCCESS: (response) => ({current: response.data}),
      FAILURE: () => ({})
    },
    UPDATE: {
      REQUEST: () => ({}),
      SUCCESS: (response) => ({current: response.data}),
      FAILURE: () => ({})
    }
  }
});

export function fetchPlace(id) {
  return requester.fetch(
    `/places/${id}`,
    actions.places.fetch
  );
}

export function updatePlace(id, body) {
  return requester.fetch(
    `/places/${id}`,
    actions.places.update,
    {method: 'POST', body}
  );
}
