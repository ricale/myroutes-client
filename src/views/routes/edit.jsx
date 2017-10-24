import React, {Component} from 'react';
import {connect} from 'react-redux';

import {fetchRoute, updateRoute} from 'actions/routes';

import RouteForm from './form';

class EditRoute extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const {fetchRoute, id} = this.props;

    fetchRoute(id);
  }

  handleSubmit(data) {
    const {updateRoute, id} = this.props;
    updateRoute(id, data).then(() => {

    });
  }

  hasRoute() {
    const {route} = this.props;

    return route && !!route.id
  }

  render() {
    const {route} = this.props;

    return (
      <div>
        <h2>Edit Route</h2>
        {this.hasRoute() &&
          <RouteForm
            route={route}
            onSubmit={this.handleSubmit} />
        }
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
      dispatch(fetchRoute(...args)),
    updateRoute: (...args) =>
      dispatch(updateRoute(...args))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditRoute);
