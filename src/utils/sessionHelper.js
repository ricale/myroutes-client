import Cookie from 'js-cookie';

export default {
  setToken: (token) => {
    Cookie.set('token', token);
  },

  getToken: (token) => {
    return Cookie.get('token') || undefined;
  },

  hasToken: () => {
    return !!Cookie.get('token');
  }
};
