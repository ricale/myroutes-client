import React, {Component} from 'react';
import {connect} from 'react-redux';

import {fetchRouteList} from '../../actions/routes'

class RouteList extends Component {
  componentDidMount() {
    this.props.fetchRouteList();
  }

  render() {
    const {routes} = this.props;

    return (
      <div>
        <h2>Route List</h2>
        {(routes || []).map(r =>
          <div key={`route-${r.id}`}>id: {r.id} name: {r.name}</div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    routes: (state.routes || {}).list
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchRouteList: (...args) =>
      dispatch(fetchRouteList(...args))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RouteList);
