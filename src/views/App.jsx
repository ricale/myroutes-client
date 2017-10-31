import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import LoadingIndicator from 'components/LoadingIndicator';
import pathHelper from 'utils/pathHelper'

class App extends Component {
  render() {
    const {loading} = this.props;

    return (
      <div>
        <h1>App</h1>
        <ul>
          <li><Link to={pathHelper.routes.new()}>New Route</Link></li>
          <li><Link to={pathHelper.routes.list()}>Route List</Link></li>
        </ul>

        <LoadingIndicator show={loading} />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    loading: state.common.loading
  };
}

export default connect(mapStateToProps)(App)
