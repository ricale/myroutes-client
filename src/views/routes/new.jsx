import React, {Component} from 'react';
import {connect} from 'react-redux';

import {createRoute} from 'actions/routes';

import DaumMap from 'components/map';
import RouteForm from './form';

class NewRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      places: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCreateMarker = this.handleCreateMarker.bind(this);
    this.handleMoveMarker = this.handleMoveMarker.bind(this);
  }

  handleCreateMarker(index, latitude, longitude) {
    const {places} = this.state;
    places[index] = {
      name: `place-${index}`,
      latitude,
      longitude
    };

    this.setState({places});
  }

  handleMoveMarker(index, latitude, longitude) {
    const {places} = this.state;
    places[index].latitude = latitude;
    places[index].longitude = longitude;

    this.setState({places});
  }

  handleSubmit(_data) {
    const {createRoute} = this.props;
    const {places} = this.state;
    const data = Object.assign({places}, _data);

    createRoute(data).then((...args) =>
      console.log('1', args)
    );
  }

  render() {
    return (
      <div>
        <h2>New Route</h2>
        <RouteForm onSubmit={this.handleSubmit} />
        <DaumMap
          onCreateMarker={this.handleCreateMarker}
          onMoveMarker={this.handleMoveMarker}
          />
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    createRoute: (...args) =>
      dispatch(createRoute(...args))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewRoute);
