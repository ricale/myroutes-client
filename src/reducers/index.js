import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';

import {common} from './common';
import {places} from './places';
import {routes} from './routes';
import {slider} from './slider';
import {users} from './users';

const rootReducer = combineReducers({
  common,
  places,
  routes,
  slider,
  users,
  routing
});

export default rootReducer;
