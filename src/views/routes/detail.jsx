import React, {Component} from 'react';
import {connect} from 'react-redux';

import {fetchRoute} from '../../actions/routes';

class RouteDetail extends Component {
  componentDidMount() {
    const {fetchRoute, id} = this.props;
    fetchRoute(id);
  }

  render() {
    const {route} = this.props;

    return (
      <div>
        <h2>Route Detail</h2>
        <div>{route.id} {route.name}</div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    id: ownProps.match.params.id,
    route: state.routes.current
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchRoute: (...args) =>
      dispatch(fetchRoute(...args))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RouteDetail);
