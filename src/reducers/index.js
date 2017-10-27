import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';

import {places} from './places';
import {routes} from './routes';

const rootReducer = combineReducers({
  places,
  routes,
  routing
});

export default rootReducer;
