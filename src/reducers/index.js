import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';

import {common} from './common';
import {places} from './places';
import {routes} from './routes';
import {users} from './users';

const rootReducer = combineReducers({
  common,
  places,
  routes,
  users,
  routing
});

export default rootReducer;
