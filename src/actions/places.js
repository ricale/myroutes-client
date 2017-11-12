import {createActions} from 'redux-actions';
import {normalize} from 'normalizr';
import requester from '../utils/requester';

const actions = createActions({
  PLACES: {
    FETCH: {
      REQUEST: () => ({current: {}}),
      SUCCESS: (response) => ({current: response.data}),
      FAILURE: () => ({})
    },
    UPDATE: {
      REQUEST: () => ({}),
      SUCCESS: (response) => ({current: response.data}),
      FAILURE: () => ({})
    },
    IMAGES: {
      CREATE: {
        REQUEST: () => ({}),
        SUCCESS: () => ({}),
        FAILURE: () => ({})
      },
      DELETE: {
        REQUEST: () => ({}),
        SUCCESS: () => ({}),
        FAILURE: () => ({})
      }
    }
  }
});

export function fetchPlace(id) {
  return requester.fetch(
    `/places/${id}`,
    actions.places.fetch
  );
}

// export function updatePlace(id, body) {
//   return requester.fetch(
//     `/places/${id}`,
//     actions.places.update,
//     {method: 'POST', body}
//   );
// }

export function addPlaceImage(id, body) {
  return requester.fetch(
    `/places/${id}/images`,
    actions.places.images.create,
    {method: 'POST', body}
  );
}

export function deletePlaceImage(imageId) {
  return requester.fetch(
    `/place_images/${imageId}`,
    actions.places.images.delete,
    {method: 'DELETE'}
  );
}
