import React, {Component} from 'react';
import {Router, Route} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createHashHistory';

import rootReducer from '../reducers';

import App from '../views/App';
import RouteList   from '../views/routes/list';
import RouteDetail from '../views/routes/detail';
import NewRoute    from '../views/routes/new';
import EditRoute   from '../views/routes/edit';

export default class Root extends Component {
  render() {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(
      rootReducer,
      {}, // preloadedState
      composeEnhancers(
        applyMiddleware(thunk)
      )
    );

    const history = createHistory();

    return (
      <Provider store={store}>
        <Router history={history}>
          <div>
            <Route path='/' component={App} />

            <div className='contents'>
              <Route path='/routes'               exact component={RouteList} />
              <Route path='/routes/new'           exact component={NewRoute} />
              <Route path='/routes/:id(\d+)'      exact component={RouteDetail} />
              <Route path='/routes/:id(\d+)/edit'       component={EditRoute} />
            </div>
          </div>
        </Router>
      </Provider>
    )
  }
}
