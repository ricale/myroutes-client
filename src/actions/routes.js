import {normalize} from 'normalizr';

import requester from 'utils/requester';
import {createActions} from 'utils/createActions';

const actions = createActions({
  ROUTES: {
    FETCHALL: {
      REQUEST: () => ({}),
      SUCCESS: (response) => ({list: response.data}),
    },
    FETCH: {
      REQUEST: () => ({}),
      SUCCESS: (response) => ({current: response.data}),
    },
    CREATE: {
      REQUEST: () => ({}),
      SUCCESS: (response) => ({id: response.data.id}),
    },
    UPDATE: {
      REQUEST: () => ({}),
      SUCCESS: () => ({}),
    },
    DELETE: {
      REQUEST: () => ({}),
      SUCCESS: () => ({}),
    }
  }
});

export function fetchRouteList() {
  return requester.fetch(
    '/routes/',
    actions.routes.fetchall
  );
}

export function fetchRoute(id) {
  return requester.fetch(
    `/routes/${id}/`,
    actions.routes.fetch
  );
}

export function createRoute(data) {
  return requester.fetch(
    `/routes/`,
    actions.routes.create,
    {method: 'POST', data}
  );
}

export function updateRoute(id, data) {
  return requester.fetch(
    `/routes/${id}/`,
    actions.routes.update,
    {method: 'PUT', data}
  );
}

export function deleteRoute(id) {
  return requester.fetch(
    `/routes/${id}/`,
    actions.routes.delete,
    {method: 'DELETE'}
  );
}
