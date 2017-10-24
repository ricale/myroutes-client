import {createActions} from 'redux-actions';
import {normalize} from 'normalizr';
import requester from '../utils/requester';

const actions = createActions({
  ROUTES: {
    FETCHALL: {
      REQUEST: () => ({}),
      SUCCESS: (response) => ({list: response.data}),
      FAILURE: () => ({})
    },
    FETCH: {
      REQUEST: () => ({}),
      SUCCESS: (response) => ({current: response.data}),
      FAILURE: () => ({})
    },
    CREATE: {
      REQUEST: () => ({}),
      SUCCESS: () => ({}),
      FAILURE: () => ({})
    },
    UPDATE: {
      REQUEST: () => ({}),
      SUCCESS: () => ({}),
      FAILURE: () => ({})
    }
  }
});

export function fetchRouteList() {
  return requester.fetch(
    '/routes',
    actions.routes.fetchall
  );
}

export function fetchRoute(id) {
  return requester.fetch(
    `/routes/${id}`,
    actions.routes.fetch
  );
}

export function createRoute(data) {
  console.log('data', data);
  return requester.fetch(
    `/routes`,
    actions.routes.create,
    {method: 'POST', data}
  );
}

export function updateRoute(id, data) {
  return requester.fetch(
    `/routes/${id}`,
    actions.routes.update,
    {method: 'PUT', data}
  )
}
