import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';

import {routes} from './routes';

const rootReducer = combineReducers({
  routes,
  routing
});

export default rootReducer;
