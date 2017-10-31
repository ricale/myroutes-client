import React, {Component} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

import {fetchRoute, updateRoute} from 'actions/routes';

import pathHelper from 'utils/pathHelper';
import RouteForm from './form';

class EditRoute extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    console.log('EditRoute componentDidMount');
    const {fetchRoute, id} = this.props;

    fetchRoute(id);
  }

  handleSubmit(data) {
    const {updateRoute, goToDetail, id} = this.props;
    updateRoute(id, data).then(() => {
      goToDetail(id)
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
            initialPlaces={route.places}
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
      dispatch(updateRoute(...args)),
    goToDetail: (...args) =>
      dispatch(push(pathHelper.routes.detail(
        ...args
      )))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditRoute);
