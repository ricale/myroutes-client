import React, {Component} from 'react';
import {connect} from 'react-redux';

import {createRoute} from 'actions/routes';

import DaumMap from 'components/map';
import PlaceList from 'components/PlaceList';
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

  componentDidMount() {
    console.log('NewRoute componentDidMount');
  }

  handleCreateMarker(index, latitude, longitude, options = {}) {
    const {places} = this.state;
    const name = options.name || `place-${index}`;

    places[index] = {
      name,
      latitude,
      longitude
    };

    this.setState({places});
  }

  handleMoveMarker(index, latitude, longitude) {
    const {places} = this.state;

    if(!places[index]) {
      return;
    }

    places[index].latitude = latitude;
    places[index].longitude = longitude;

    this.setState({places});
  }

  handleChangePlaceName(index, name) {
    const {places} = this.state;

    if(!places[index]) {
      return;
    }

    places[index].name = name;

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
    const {places} = this.state;

    return (
      <div>
        <h2>New Route</h2>
        <RouteForm onSubmit={this.handleSubmit} />
        <PlaceList
          style={{display: 'inline-block'}}
          places={places}
          editable={true}
          onChangePlaceName={(i, name) => this.handleChangePlaceName(i, name)}
          />
        <DaumMap
          style={{display: 'inline-block'}}
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
