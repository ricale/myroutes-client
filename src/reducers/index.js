import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';

import {common} from './common';
import {places} from './places';
import {routes} from './routes';

const rootReducer = combineReducers({
  common,
  places,
  routes,
  routing
});

export default rootReducer;
