import React, {Component} from 'react';
import {Router, Route} from 'react-router';
import {routerMiddleware} from 'react-router-redux';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createHashHistory';

import rootReducer from 'reducers';

import Header from 'views/Header';

import Login  from 'views/users/Login';
import RouteList   from 'views/routes/list';
import RouteDetail from 'views/routes/detail';
import NewRoute    from 'views/routes/new';
import EditRoute   from 'views/routes/edit';

import PlaceDetail from 'views/places/detail';

import './Root.less';

export default class Root extends Component {
  render() {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const history = createHistory();
    const store = createStore(
      rootReducer,
      {}, // preloadedState
      composeEnhancers(
        applyMiddleware(
          thunk,
          routerMiddleware(history)
        )
      )
    );

    return (
      <Provider store={store}>
        <Router history={history}>
          <div>
            <Route path='/' component={Header} />

            <div className='contents'>
              <Route path='/login' exact component={Login} />

              <Route path='/routes'               exact component={RouteList} />
              <Route path='/routes/new'           exact component={NewRoute} />
              <Route path='/routes/:id(\d+)'      exact component={RouteDetail} />
              <Route path='/routes/:id(\d+)/edit' exact component={EditRoute} />

              <Route path='/routes/:routeId/places/:id' exact component={PlaceDetail} />
            </div>
          </div>
        </Router>
      </Provider>
    )
  }
}
