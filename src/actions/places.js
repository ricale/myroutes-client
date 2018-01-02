import {normalize} from 'normalizr';
import requester from '../utils/requester';

import {createActions} from 'utils/createActions';

const actions = createActions({
  PLACES: {
    FETCH: {
      REQUEST: () => ({current: {}}),
      SUCCESS: (response) => ({current: response.data}),
    },
    UPDATE: {
      REQUEST: () => ({}),
      SUCCESS: (response) => ({current: response.data}),
    }
  },
  PLACE_IMAGES: {
    CREATE: {
      REQUEST: () => ({}),
      SUCCESS: () => ({}),
    },
    DELETE: {
      REQUEST: () => ({}),
      SUCCESS: () => ({}),
    }
  }
});

export function fetchPlace(id) {
  return requester.fetch(
    `/places/${id}/`,
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

export function addPlaceImage(id, {body, filename}) {
  return requester.fetch(
    `/places/${id}/images/`,
    actions.placeImages.create,
    {method: 'POST', body, filename}
  );
}

export function deletePlaceImage(imageId) {
  return requester.fetch(
    `/place_images/${imageId}/`,
    actions.placeImages.delete,
    {method: 'DELETE'}
  );
}
