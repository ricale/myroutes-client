export default {
  index: () => '/',
  login: () => '/login',

  routes: {
    list:   ()   => `/routes`,
    new:    ()   => `/routes/new`,
    detail: (id) => `/routes/${id}`,
    edit:   (id) => `/routes/${id}/edit`,
  },
  places: {
    detail: (routeId, id) => `/routes/${routeId}/places/${id}`,
  }
};
